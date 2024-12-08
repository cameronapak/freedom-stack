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
    handler: async (input, _context) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      };

      const response = await fetch("/api/auth/password/register", options);

      return response.json();
    }
  }),

  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string()
    }),
    handler: async (input, _context) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      };

      const response = await fetch("/api/auth/password/login", options);

      return response.json();
    }
  })
};
