import type PocketBase from "pocketbase";

export async function signIn(pocketbaseInstance: PocketBase, email: string, password: string) {
  const { token, record } = await pocketbaseInstance.collection('users').authWithPassword(email, password);
  return { token, record };
};

export async function signOut(pocketbaseInstance: PocketBase) {
  pocketbaseInstance.authStore.clear();
}

export async function authWithOAuth2(pocketbaseInstance: PocketBase, provider: 'google' | 'github' | 'facebook' | 'twitter' | 'linkedin' | 'microsoft' | 'apple' | 'discord' | 'github') {
  return pocketbaseInstance.collection('users').authWithOAuth2({
    provider,
  });
}

export async function sendVerificationEmail(pocketbaseInstance: PocketBase, email: string) {
  return pocketbaseInstance.collection('users').requestVerification(email);
}

export async function sendPasswordResetEmail(pocketbaseInstance: PocketBase, email: string) {
  return pocketbaseInstance.collection('users').requestPasswordReset(email);
}

export async function getUser(pocketbaseInstance: PocketBase, email: string) {
  return pocketbaseInstance.collection('users').getFullList(1, {
    filter: `email = "${email}"`
  });
}

export async function createUser(pocketbaseInstance: PocketBase, email: string, password: string, name: string) {
  return pocketbaseInstance.collection('users').create({
    email,
    password,
    passwordConfirm: password,
    name,
  });
}
