export interface CommonUser {
  id: string;
  email: string;
  name?: string;
  imageUrl?: string;
}

export function normalizeUser(user: any): CommonUser | null {
  if (!user) {
    return null;
  }

  // Clerk user
  if (user.primaryEmailAddress) {
    return {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName || user.firstName,
      imageUrl: user.imageUrl
    };
  }

  // Better Auth user
  return {
    id: user.id || user.email, // Better Auth might not have an id, so fallback to email
    email: user.email,
    name: user.name,
    imageUrl: user.imageUrl
  };
}

// Type guard to check if user is authenticated
export function isAuthenticated(user: any): user is CommonUser {
  return user && typeof user.email === "string";
}

// Helper to get user from Astro.locals
export function getUser(locals: App.Locals): CommonUser | null {
  const user = locals.user;
  return user ? normalizeUser(user) : null;
}
