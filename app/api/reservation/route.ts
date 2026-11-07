import { NextResponse } from "next/server";

import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { ReservationFieldErrors, ReservationResponse } from "@/lib/reservation-options";
import { reservationSchema } from "@/lib/reservation-schema";

export const dynamic = "force-dynamic";

function respond(body: ReservationResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

/**
 * Accepts a reservation request.
 *
 * Everything is validated server-side. If RESERVATION_WEBHOOK_URL is set the
 * request is forwarded there (Slack, Discord, Zapier, a CRM, an email API…),
 * otherwise it is logged and the visitor still gets a success response.
 */
export async function POST(request: Request) {
  // Reject cross-site form posts. Browsers omit Origin on same-site GETs, so
  // only compare when the header is present and parsable.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (origin && host) {
    try {
      if (new URL(origin).host !== host.split(",")[0]?.trim()) {
        return respond({ ok: false, message: "This request was blocked." }, 403);
      }
    } catch {
      // "null" origin (sandboxed iframe, some privacy modes) — fall through.
    }
  }

  const limit = rateLimit(`reservation:${clientIp(request)}`, { limit: 5, windowMs: 10 * 60_000 });

  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many requests. Please wait a few minutes and try again.",
      } satisfies ReservationResponse,
      {
        status: 429,
        headers: { "Cache-Control": "no-store", "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return respond({ ok: false, message: "We could not read that request." }, 400);
  }

  const parsed = reservationSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors: ReservationFieldErrors = {};

    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key !== "string" || key in fieldErrors) continue;
      fieldErrors[key as keyof ReservationFieldErrors] = issue.message;
    }

    return respond(
      { ok: false, message: "Please check the highlighted fields.", fieldErrors },
      422,
    );
  }

  const reservation = parsed.data;
  const webhookUrl = process.env.RESERVATION_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "reservation",
          submittedAt: new Date().toISOString(),
          ...reservation,
        }),
        signal: AbortSignal.timeout(5_000),
      });

      if (!response.ok) {
        console.error("[reservation] webhook responded with", response.status);
      }
    } catch (error) {
      // Never fail the visitor because a downstream service is down.
      console.error("[reservation] webhook delivery failed", error);
    }
  } else {
    console.info("[reservation]", JSON.stringify(reservation));
  }

  return respond({ ok: true, message: "Your request is on its way." }, 200);
}
