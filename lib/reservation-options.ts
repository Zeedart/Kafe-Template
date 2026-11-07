import { site } from "@/lib/site";

/**
 * Client-safe reservation constants and types.
 *
 * This module must NOT import zod or any server-only code — it is used by the
 * browser form as well as the API route.
 */

export const MAX_PARTY_SIZE = 6;
export const SLOT_MINUTES = 30;

/** JS `getDay()` index -> Schema.org day code used in the site config. */
const DAY_CODES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export type ReservationSlot = { value: string; label: string };

function toMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return (hours ?? 0) * 60 + (minutes ?? 0);
}

/**
 * Bookable time slots for a specific date, derived from `site.hours` so opening
 * hours stay a single source of truth. Returns an empty array when the café is
 * closed that weekday or the date is unreadable.
 */
export function slotsForDate(isoDate: string): ReservationSlot[] {
  if (!isoDate) return [];

  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return [];

  const dayCode = DAY_CODES[date.getDay()] ?? "";
  const hours = site.hours.find((entry) => entry.schemaDays.includes(dayCode));
  if (!hours) return [];

  const opens = toMinutes(hours.opens);
  const closes = toMinutes(hours.closes);
  const slots: ReservationSlot[] = [];

  // The last seating starts one slot before closing.
  for (let minutes = opens; minutes + SLOT_MINUTES <= closes; minutes += SLOT_MINUTES) {
    const hours24 = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const value = `${String(hours24).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    const label = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(2024, 0, 1, hours24, mins));

    slots.push({ value, label });
  }

  return slots;
}

export const PARTY_SIZES: { value: string; label: string }[] = Array.from(
  { length: MAX_PARTY_SIZE },
  (_, index) => {
    const size = index + 1;
    return {
      value: String(size),
      label: size === 1 ? "1 guest" : `${size} guests`,
    };
  },
);

export type ReservationPayload = {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  partySize: number;
  notes?: string;
  consent: boolean;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type ReservationFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "date" | "time" | "partySize" | "notes" | "consent", string>
>;

export type ReservationResponse =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: ReservationFieldErrors };

/** Today's date as YYYY-MM-DD in the visitor's local timezone. */
export function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
