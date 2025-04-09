import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "./prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await db?.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return null;
  }

  return {
    ...user,
    password: undefined,
  };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}