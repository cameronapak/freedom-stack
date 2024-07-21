import { lucia } from '../../lib/auth';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db, User } from 'astro:db';

import type { APIContext } from 'astro';

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const email = (formData.get('email') as string).trim();

  if (
    typeof email !== 'string' ||
    email.length < 3 ||
    email.length > 255 ||
    !/.+@.+\..+/.test(email)
  ) {
    return new Response('Invalid email', {
      status: 400,
    });
  }
  const password = formData.get('password');

  if (
    typeof password !== 'string' ||
    password.length < 6 ||
    password.length > 255
  ) {
    return new Response('Invalid password', {
      status: 400,
    });
  }

  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);

  // TODO: check if username is already used
  await db.insert(User).values({
    id: userId,
    email: email.toLowerCase(),
    hashed_password: hashedPassword,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return context.redirect("/dashboard");
}