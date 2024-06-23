import PocketBase from "pocketbase";

type PBLocals = {
  pb: PocketBase;
};

export async function signIn(locals: PBLocals, email: string, password: string) {
  const { token, record } = await locals.pb.collection('users').authWithPassword(email, password);
  return { token, record };
};

export async function signOut(locals: PBLocals) {
  locals.pb.authStore.clear();
}

export async function getUser(locals: PBLocals, email: string) {
  return locals.pb.collection('users').getFullList(1, {
    filter: `email = "${email}"`
  });
}
