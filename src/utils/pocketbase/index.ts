import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.PB_URL);

// This optimization ensures that you only re-authenticate when necessary, reducing the load on your PocketBase server.
export const authorizePB = async () => {
  if (!pb.authStore.isValid) {
    await pb.admins.authWithPassword(import.meta.env.PB_USERNAME, import.meta.env.PB_PASSWORD);
  }

  return pb;
};
