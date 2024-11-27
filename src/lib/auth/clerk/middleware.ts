import { defineMiddleware } from "astro:middleware";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { getAuth } from "@clerk/backend";

export const onRequest = defineMiddleware(async (context, next) => {
  const auth = await getAuth(context.request);

  if (auth.userId) {
    const user = await clerkClient.users.getUser(auth.userId);
    const session = await clerkClient.sessions.getSession(auth.sessionId);

    context.locals.user = user;
    context.locals.session = session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
    if (context.url.pathname === "/sign-out") {
      return context.redirect("/");
    }
  }

  return next();
});
