"use server";

import { db } from "@/lib/prisma";
import { AuthFormData } from "@/types";
import bcrypt from "bcryptjs";

export async function registerUser(data: AuthFormData) {
  try {
    const { name, email, password } = data;

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "User_already_exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: "Unexpected_error",
    };
  }
}