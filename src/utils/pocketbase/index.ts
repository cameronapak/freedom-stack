import type PocketBase from "pocketbase";

export async function signIn(pocketbaseInstance: PocketBase, email: string, password: string) {
  return pocketbaseInstance.collection('users').authWithPassword(email, password);
};

export function signOut(pocketbaseInstance: PocketBase) {
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

export async function getUserByEmail(pocketbaseInstance: PocketBase, email: string) {
  return pocketbaseInstance.collection('users').getFullList(1, {
    filter: `email = "${email}"`
  });
}

export async function getUserById(pocketbaseInstance: PocketBase, id: string) {
  return pocketbaseInstance.collection('users').getOne(id);
}

export async function createUser(pocketbaseInstance: PocketBase, email: string, password: string, name: string) {
  return pocketbaseInstance.collection('users').create({
    email,
    password,
    passwordConfirm: password,
    name,
  });
}
