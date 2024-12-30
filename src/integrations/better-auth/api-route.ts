import type { APIRoute } from "astro";
import { getAuth } from "./core";

export const ALL: APIRoute = async (context) => {
  const auth = getAuth();
  return auth.handler(context.request);
};
