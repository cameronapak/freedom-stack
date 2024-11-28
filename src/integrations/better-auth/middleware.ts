import { getAuth } from "./core";
import type { MiddlewareHandler } from "astro";

export const createAuthMiddleware = async (options?: {
  onAuthSuccess?: (user: any, session: any) => void | Promise<void>;
  onAuthFailure?: () => void | Promise<void>;
  protectedRoutes?: string[];
}): Promise<MiddlewareHandler> => {
  const { defineMiddleware } = await import("astro:middleware");

  const middleware = defineMiddleware(async (context, next) => {
    const auth = getAuth();
    const isAuthed = await auth.api.getSession({
      headers: context.request.headers
    });

    if (isAuthed) {
      context.locals.user = isAuthed.user;
      context.locals.session = isAuthed.session;
      await options?.onAuthSuccess?.(isAuthed.user, isAuthed.session);
    } else {
      context.locals.user = null;
      context.locals.session = null;
      await options?.onAuthFailure?.();

      // Handle protected routes
      if (
        options?.protectedRoutes?.some(
          (route) => context.url.pathname.startsWith(route) || context.url.pathname === route
        )
      ) {
        return context.redirect("/sign-in");
      }
    }

    return next();
  });

  // Ensure we return a proper middleware function
  return middleware;
};
