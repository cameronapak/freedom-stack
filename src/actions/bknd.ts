import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const bknd = {
  signUp: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string(),
      name: z.string()
    }),
    handler: async (input, context) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      };

      const response = await fetch(context.url.origin + "/api/auth/password/register", options);
      const data = await response.json();

      if (data.user) {
        context.locals.user = data.user;
      } else {
        return { success: false, error: data.error || "Failed to create user" };
      }

      return { success: true, data };
    }
  }),

  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string()
    }),
    handler: async (input, context) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      };

      const response = await fetch(context.url.origin + "/api/auth/password/login", options);
      const data = await response.json();

      context.cookies.set("auth", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      if (data.user) {
        context.locals.user = data.user;
      } else {
        return { success: false, error: data.error || "Failed to sign in user" };
      }

      return { success: true, data };
    }
  })
};
