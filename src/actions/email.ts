/**
 * Adapted from: https://developers.netlify.com/guides/send-emails-with-astro-and-resend/
 */
import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { sendEmail } from "../lib/email";

export const email = defineAction({
  accept: "form",
  input: z.object({
    recipient: z.string().email(),
    subject: z.string(),
    message: z.string()
  }),
  handler: async ({ recipient, subject, message }) => {
    try {
      const html = `<div>${message}</div>`;

      await sendEmail({
        to: recipient,
        subject,
        html
      });

      return {
        success: true as const,
        message: "Email sent successfully"
      };
    } catch (error) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to send email"
      });
    }
  }
});
