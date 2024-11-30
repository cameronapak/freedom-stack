import type { APIRoute } from "astro";
import { db } from "astro:db";
import config from "../../../../../db/config";

export const POST: APIRoute = async ({ params, request }) => {
  const { table } = params;
  const tableConfig = config.tables[table];

  if (!tableConfig) {
    return new Response("Table not found", { status: 404 });
  }

  const data = await request.json();

  try {
    const result = await db.insert(tableConfig).values(data);
    return new Response(JSON.stringify(result), {
      status: 201
    });
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { table, action: id } = params;
  const tableConfig = config.tables[table];

  if (!tableConfig) {
    return new Response("Table not found", { status: 404 });
  }

  const data = await request.json();
  const primaryKey = Object.entries(tableConfig.columns).find(([_, config]) => config.primaryKey)?.[0];

  try {
    const result = await db.update(tableConfig).set(data).where(eq(tableConfig[primaryKey], id));
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  const { table, action: id } = params;
  const tableConfig = config.tables[table];

  if (!tableConfig) {
    return new Response("Table not found", { status: 404 });
  }

  const primaryKey = Object.entries(tableConfig.columns).find(([_, config]) => config.primaryKey)?.[0];

  try {
    await db.delete(tableConfig).where(eq(tableConfig[primaryKey], id));
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
};
