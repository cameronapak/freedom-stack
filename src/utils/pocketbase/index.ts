// Must pass in the locals object from `Astro.locals`.

export async function signIn(locals: App.Locals, email: string, password: string) {
  const { token, record } = await locals.pb.collection('users').authWithPassword(email, password);
  return { token, record };
};

export async function signOut(locals: App.Locals) {
  locals.pb.authStore.clear();
}

export async function getUser(locals: App.Locals, email: string) {
  return locals.pb.collection('users').getFullList(1, {
    filter: `email = "${email}"`
  });
}

export async function createUser(locals: App.Locals, email: string, password: string, name: string) {
  return locals.pb.collection('users').create({
    email,
    password,
    passwordConfirm: password,
    name,
  });
}
