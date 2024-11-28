import { defineAction, ActionError, type ActionErrorCode } from "astro:actions";
import { z } from "astro:schema";
import type { AstroCookies } from "astro";
import { APIError } from "better-auth/api";
import { getAuth } from "./core";

function parseCookiesFromResponse(cookiesArray: string[]) {
  return cookiesArray.map((cookieString) => {
    const [nameValue, ...options] = cookieString.split(";").map((s) => s.trim());
    const [name, value] = nameValue.split("=");

    const cookieOptions = Object.fromEntries(
      options.map((opt) => {
        const [key, val] = opt.split("=");
        return [key.toLowerCase(), val ?? true];
      })
    );

    return { name, value: decodeURIComponent(value), options: cookieOptions };
  });
}

export function setAuthCookiesFromResponse(cookiesArray: string[], cookies: AstroCookies) {
  const cookiesToSet = parseCookiesFromResponse(cookiesArray);
  for (const cookie of cookiesToSet) {
    cookies.set(cookie.name, cookie.value, cookie.options);
  }
}

async function handleAuthResponse(apiCall: () => Promise<Response>, context: any, errorCode: ActionErrorCode) {
  try {
    const response = await apiCall();
    if (!response.ok) {
      throw new Error(`Failed to ${errorCode.toLowerCase()}`);
    }

    return { success: true, cookiesToSet: response.headers.getSetCookie() };
  } catch (error) {
    console.error(error);
    throw new ActionError({
      code: errorCode,
      message: error instanceof APIError ? `${error.body.message}.` : "Something went wrong, please try again later."
    });
  }
}

export const createAuthActions = () => {
  const auth = getAuth();

  return {
    signUp: defineAction({
      accept: "form",
      input: z.object({
        email: z.string().email(),
        password: z.string(),
        name: z.string(),
        imageUrl: z.string().optional()
      }),
      handler: async (input, context) =>
        await handleAuthResponse(
          () =>
            auth.api.signUpEmail({
              body: { ...input, image: input.imageUrl || "" },
              headers: context.request.headers,
              asResponse: true
            }),
          context,
          "BAD_REQUEST"
        )
    }),

    signIn: defineAction({
      accept: "form",
      input: z.object({
        email: z.string().email(),
        password: z.string()
      }),
      handler: async (input, context) =>
        await handleAuthResponse(
          () =>
            auth.api.signInEmail({
              body: input,
              headers: context.request.headers,
              asResponse: true
            }),
          context,
          "UNAUTHORIZED"
        )
    }),

    signOut: defineAction({
      accept: "form",
      handler: async (_, context) =>
        await handleAuthResponse(
          () =>
            auth.api.signOut({
              headers: context.request.headers,
              asResponse: true
            }),
          context,
          "BAD_REQUEST"
        )
    })
  };
};
