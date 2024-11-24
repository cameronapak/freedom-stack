// Inspired by https://github.com/HiDeoo/starlight-better-auth-example/blob/main/src/actions/index.ts
import { defineAction, ActionError, type ActionErrorCode } from "astro:actions";
import { z } from "astro:schema";
import { APIError } from "better-auth/api";
import { auth as betterAuth } from "@/lib/auth";

export const auth = {
  signUp: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string(),
      name: z.string(),
      imageUrl: z.string().optional()
    }),
    handler: async ({ email, password, name, imageUrl = "" }, ctx) => {
      try {
        const response = await betterAuth.api.signUpEmail({
          body: {
            email,
            password,
            name,
            image: imageUrl
          },
          headers: ctx.request.headers,
          asResponse: true
        });

        response.headers.getSetCookie().forEach((cookie) => {
          ctx.request.headers.append("Set-Cookie", cookie);
        });

        return { cookies: response.headers.getSetCookie() };
      } catch (error) {
        throwActionAuthError("BAD_REQUEST", error);
      }
    }
  }),

  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      password: z.string()
    }),
    handler: async ({ email, password }, ctx) => {
      try {
        const response = await betterAuth.api.signInEmail({
          body: {
            email,
            password
          },
          headers: ctx.request.headers,
          asResponse: true
        });

        response.headers.getSetCookie().forEach((cookie) => {
          ctx.request.headers.append("Set-Cookie", cookie);
        });

        return { cookies: response.headers.getSetCookie() };
      } catch (error) {
        throwActionAuthError("UNAUTHORIZED", error);
      }
    }
  }),

  signOut: defineAction({
    accept: "form",
    handler: async (_, ctx) => {
      try {
        const response = await betterAuth.api.signOut({
          headers: ctx.request.headers,
          asResponse: true
        });

        response.headers.getSetCookie().forEach((cookie) => {
          ctx.request.headers.append("Set-Cookie", cookie);
        });

        return { cookies: response.headers.getSetCookie() };
      } catch (error) {
        throwActionAuthError("BAD_REQUEST", error);
      }
    }
  })
};

function throwActionAuthError(code: ActionErrorCode, error: unknown): never {
  console.error(error);
  throw new ActionError({
    code,
    message: error instanceof APIError ? `${error.body.message}.` : "Something went wrong, please try again later."
  });
}
