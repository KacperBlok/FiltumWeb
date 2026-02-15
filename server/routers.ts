import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createBooking, getBookings, createContactSubmission, getContactSubmissions, getApprovedReviews } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Booking procedures
  bookings: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().min(1, "Phone is required"),
        serviceType: z.string().min(1, "Service type is required"),
        description: z.string().optional(),
        appointmentDate: z.date(),
        appointmentTime: z.string().min(1, "Time is required"),
      }))
      .mutation(async ({ input }) => {
        await createBooking({
          name: input.name,
          email: input.email,
          phone: input.phone,
          serviceType: input.serviceType,
          description: input.description,
          appointmentDate: input.appointmentDate,
          appointmentTime: input.appointmentTime,
          status: "pending",
        });

        // Send notification to owner
        try {
          await notifyOwner({
            title: "Nowa rezerwacja wizyty",
            content: `Nowa rezerwacja od ${input.name}\n\nEmail: ${input.email}\nTelefon: ${input.phone}\nUsługa: ${input.serviceType}\nData: ${input.appointmentDate.toLocaleDateString()}\nGodzina: ${input.appointmentTime}\n\nOpis: ${input.description || "Brak"}`,
          });
        } catch (error) {
          console.error("Failed to send booking notification:", error);
        }

        return { success: true };
      }),

    list: publicProcedure.query(async () => {
      return await getBookings();
    }),
  }),

  // Contact submission procedures
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      }))
      .mutation(async ({ input }) => {
        await createContactSubmission({
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
          status: "new",
        });

        // Send notification to owner
        try {
          await notifyOwner({
            title: "Nowa wiadomość kontaktowa",
            content: `Nowa wiadomość od ${input.name}\n\nEmail: ${input.email}\nTelefon: ${input.phone || "Nie podano"}\n\nWiadomość:\n${input.message}`,
          });
        } catch (error) {
          console.error("Failed to send contact notification:", error);
        }

        return { success: true };
      }),

    list: publicProcedure.query(async () => {
      return await getContactSubmissions();
    }),
  }),

  // Reviews procedures
  reviews: router({
    getApproved: publicProcedure.query(async () => {
      return await getApprovedReviews();
    }),
  }),
});

export type AppRouter = typeof appRouter;
