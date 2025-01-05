// https://docs.astro.build/en/guides/actions/
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const bknd = {
  createUser: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(3).optional()
    }),
    handler: async ({ email, password, name }) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: name || undefined
        })
      };

      const response = await fetch("/api/auth/password/register", options);
      const data = await response.json();

      return {
        success: true,
        data
      };
    }
  })
};
