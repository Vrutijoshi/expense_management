"use server";

import { db } from "@/lib/prisma";
import { AuthFormData } from "@/types";
import bcrypt from "bcryptjs";

export async function registerUser(data: AuthFormData) {
  console.log('data',data)
  const { name, email, password } = data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User_already_exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}