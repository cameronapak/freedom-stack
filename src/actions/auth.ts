import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { client } from "@/lib/auth-client";

export const auth = {
  signUp: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string(),
      name: z.string(),
      imageUrl: z.string().optional()
    }),
    handler: async ({ email, password, name, imageUrl }) => {
      const { data, error } = await client.signUp.email({
        email,
        password,
        name,
        image: imageUrl
      });

      if (error) {
        console.error(error);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Error signing up"
        });
      }

      return data;
    }
  }),

  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string()
    }),
    handler: async ({ email, password }) => {
      const { data, error } = await client.signIn.email({ email, password });

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error signing in"
        });
      }

      return data;
    }
  }),

  signOut: defineAction({
    handler: async () => {
      await client.signOut();
    }
  })
};
