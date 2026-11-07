import { z } from "zod";

import { MAX_PARTY_SIZE, slotsForDate } from "@/lib/reservation-options";

/**
 * Server-side reservation schema. The browser form provides native
 * constraints, but this is the authoritative validation — never trust the
 * client.
 */
export const reservationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Please enter your name." })
      .max(80, { message: "Please use 80 characters or fewer." }),

    email: z
      .string()
      .trim()
      .min(1, { message: "Please enter your email address." })
      .max(160, { message: "Please use 160 characters or fewer." })
      .email({ message: "Please enter a valid email address." }),

    phone: z.string().trim().max(40, { message: "Please use 40 characters or fewer." }).optional(),

    date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Please choose a date." })
      .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00`)), {
        message: "Please choose a valid date.",
      })
      .refine(
        (value) => {
          const requested = new Date(`${value}T00:00:00`);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return requested >= today;
        },
        { message: "Please choose today or a future date." },
      ),

    time: z.string().trim().min(1, { message: "Please choose a time slot." }),

    partySize: z.coerce
      .number()
      .int({ message: "Please choose a party size." })
      .min(1, { message: "Please choose a party size." })
      .max(MAX_PARTY_SIZE, { message: `We can seat up to ${MAX_PARTY_SIZE} online.` }),

    notes: z
      .string()
      .trim()
      .max(600, { message: "Please use 600 characters or fewer." })
      .optional(),

    consent: z.boolean().refine((value) => value === true, {
      message: "Please accept the privacy policy to continue.",
    }),

    /** Honeypot: real users never fill this in. */
    website: z.string().max(0).optional(),
  })
  .superRefine((value, ctx) => {
    const slots = slotsForDate(value.date);

    if (slots.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["time"],
        message: "We are closed on that date. Please pick another day.",
      });
      return;
    }

    if (!slots.some((slot) => slot.value === value.time)) {
      ctx.addIssue({
        code: "custom",
        path: ["time"],
        message: "That time is outside our opening hours. Please choose another slot.",
      });
    }
  });

export type ReservationInput = z.infer<typeof reservationSchema>;
