import { User } from "@prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "../libs/prismadb";

export function getSession() {
  return getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) return null;
    return currentUser;
  } catch (error: any) {
    return null;
  }
}
