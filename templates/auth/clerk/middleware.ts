import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export const onRequest = clerkMiddleware((auth, context) => {
  const userId = auth().userId;
  const sessionId = auth().sessionId;

  if (userId && sessionId) {
    (async () => {
      // Set the user and session in the locals
      context.locals.user = await clerkClient(context).users.getUser(userId);
      context.locals.session = await clerkClient(context).sessions.getSession(sessionId);
    })();
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  // Redirect to sign in if the user is not authenticated and the route is protected
  if (!auth().userId && isProtectedRoute(context.request)) {
    return auth().redirectToSignIn();
  }
});
