"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import {
  PARTY_SIZES,
  slotsForDate,
  todayIso,
  type ReservationFieldErrors,
  type ReservationResponse,
} from "@/lib/reservation-options";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASS =
  "w-full rounded-lg border border-line bg-white/80 px-4 py-3 text-sm text-espresso shadow-sm transition-colors placeholder:text-clay/50 focus:border-caramel focus:outline-none focus:ring-2 focus:ring-caramel/25";

const LABEL_CLASS = "text-[10px] font-semibold uppercase tracking-[0.16em] text-clay";

function Field({
  id,
  label,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-clay/70 text-xs">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function ReservationForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ReservationFieldErrors>({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // Set the minimum date through the DOM so it matches the visitor's timezone
  // without a server/client hydration mismatch or an extra render.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayIso();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const fieldId = (name: string) => `${uid}-${name}`;

  // Times follow the configured opening hours for the chosen weekday.
  const slots = useMemo(() => slotsForDate(date), [date]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      partySize: Number(formData.get("partySize") ?? 0),
      notes: String(formData.get("notes") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    setStatus("submitting");
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ReservationResponse;

      if (!response.ok || !result.ok) {
        setStatus("error");
        setMessage(result.ok ? "Something went wrong. Please try again." : result.message);
        if (!result.ok && result.fieldErrors) setErrors(result.fieldErrors);
        return;
      }

      form.reset();
      setDate("");
      setTime("");
      setStatus("success");
      setMessage(result.message);
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-4 py-6">
        <span className="bg-caramel/10 text-caramel flex size-12 items-center justify-center rounded-full">
          <CheckIcon className="size-6" strokeWidth={2} />
        </span>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="font-display text-espresso text-2xl font-semibold focus:outline-none"
        >
          {site.visit.form.successTitle}
        </h3>
        <p className="text-clay text-sm leading-relaxed">{site.visit.form.successBody}</p>
        <p className="text-clay/70 text-xs" role="status" aria-live="polite">
          {message}
        </p>
        <Button
          type="button"
          variant="dark"
          className="mt-2"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
        >
          Book another table
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
      <div>
        <h3 className="font-display text-espresso text-2xl font-semibold">
          {site.visit.form.title}
        </h3>
        <p className="text-clay mt-2 text-xs leading-relaxed">{site.visit.form.note}</p>
      </div>

      {status === "error" && message ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={fieldId("name")} label="Your name" error={errors.name}>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Maya Rahman"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
            className={cn(FIELD_CLASS, errors.name && "border-red-400")}
          />
        </Field>

        <Field id={fieldId("email")} label="Email" error={errors.email}>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
            className={cn(FIELD_CLASS, errors.email && "border-red-400")}
          />
        </Field>

        <Field
          id={fieldId("phone")}
          label="Phone (optional)"
          error={errors.phone}
          hint="Only if you would like a call back."
        >
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+218 91 000 0000"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={
              errors.phone ? `${fieldId("phone")}-error` : `${fieldId("phone")}-hint`
            }
            className={cn(FIELD_CLASS, errors.phone && "border-red-400")}
          />
        </Field>

        <Field id={fieldId("partySize")} label="Guests" error={errors.partySize}>
          <select
            id={fieldId("partySize")}
            name="partySize"
            defaultValue="2"
            aria-invalid={errors.partySize ? true : undefined}
            aria-describedby={errors.partySize ? `${fieldId("partySize")}-error` : undefined}
            className={cn(FIELD_CLASS, "appearance-none", errors.partySize && "border-red-400")}
          >
            {PARTY_SIZES.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={fieldId("date")} label="Date" error={errors.date}>
          <input
            ref={dateRef}
            id={fieldId("date")}
            name="date"
            type="date"
            required
            onChange={(event) => {
              const nextDate = event.currentTarget.value;
              setDate(nextDate);
              if (time && !slotsForDate(nextDate).some((slot) => slot.value === time)) {
                setTime("");
              }
            }}
            aria-invalid={errors.date ? true : undefined}
            aria-describedby={errors.date ? `${fieldId("date")}-error` : undefined}
            className={cn(FIELD_CLASS, errors.date && "border-red-400")}
          />
        </Field>

        <Field id={fieldId("time")} label="Time" error={errors.time}>
          <select
            id={fieldId("time")}
            name="time"
            required
            value={time}
            disabled={slots.length === 0}
            onChange={(event) => setTime(event.currentTarget.value)}
            aria-invalid={errors.time ? true : undefined}
            aria-describedby={errors.time ? `${fieldId("time")}-error` : undefined}
            className={cn(
              FIELD_CLASS,
              "appearance-none disabled:cursor-not-allowed disabled:opacity-60",
              errors.time && "border-red-400",
            )}
          >
            <option value="" disabled>
              {date
                ? slots.length === 0
                  ? "Closed on this day"
                  : "Choose a time"
                : "Choose a date first"}
            </option>
            {slots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id={fieldId("notes")}
        label="Anything we should know? (optional)"
        error={errors.notes}
        hint="Allergies, a high chair, a quiet corner — just ask."
      >
        <textarea
          id={fieldId("notes")}
          name="notes"
          rows={3}
          maxLength={600}
          placeholder="We are celebrating a birthday…"
          aria-invalid={errors.notes ? true : undefined}
          aria-describedby={errors.notes ? `${fieldId("notes")}-error` : `${fieldId("notes")}-hint`}
          className={cn(FIELD_CLASS, "resize-y", errors.notes && "border-red-400")}
        />
      </Field>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div
        className="absolute top-auto left-[-9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id={fieldId("consent")}
          name="consent"
          type="checkbox"
          required
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
          className="accent-caramel mt-0.5 size-4 shrink-0"
        />
        <div className="flex flex-col gap-1">
          <label htmlFor={fieldId("consent")} className="text-clay text-xs leading-relaxed">
            I agree to the{" "}
            <Link
              href="/legal/privacy"
              className="text-espresso decoration-caramel/50 hover:text-caramel font-medium underline underline-offset-2"
            >
              privacy policy
            </Link>{" "}
            and consent to being contacted about this reservation.
          </label>
          {errors.consent ? (
            <p id={`${fieldId("consent")}-error`} className="text-xs font-medium text-red-700">
              {errors.consent}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" variant="secondary" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : site.visit.form.submit}
        <ArrowRightIcon className="size-4" />
      </Button>

      <p className="text-clay/70 text-[11px] leading-relaxed">{site.visit.policy}</p>
    </form>
  );
}
