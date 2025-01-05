import { defineMiddleware } from "astro:middleware";
import { getApi } from "bknd/adapter/astro";

export const onRequest = defineMiddleware(async (context, next) => {
  const api = getApi(context, { mode: "dynamic" });
  const user = await api.getUser();

  if (user) {
    context.locals.user = user;
  } else {
    context.locals.user = null;
  }

  return next();
});
