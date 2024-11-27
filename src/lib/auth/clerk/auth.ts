import { clerkClient } from "@clerk/clerk-sdk-node";
import { createClerkClient } from "@clerk/clerk-sdk-node/esm/instance";

// Initialize the Clerk client
export const auth = createClerkClient({
  secretKey: import.meta.env.CLERK_SECRET_KEY
});
