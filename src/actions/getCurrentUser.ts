"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types";

export const getSession = async () => {
  return await getServerSession(authOptions);
};

/**
 * This function retrieves the current user's information from the database and returns it in a
 * standardized format, or null if the user is not authenticated or does not exist.
 * @returns The function `getCurrentUser` returns a Promise that resolves to a `SafeUser` object or
 * `null`. The `SafeUser` object is created by spreading the properties of the `currentUser` object
 * returned from the database query and converting some of the date properties to ISO strings. If there
 * is no `session` or `session.user.email` is falsy, the function returns `null`. If
 */
const getCurrentUser = async (): Promise<SafeUser | null> => {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!currentUser) return null;
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getCurrentUser;
