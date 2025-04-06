"use server";

import { db } from "@/lib/prisma";
import { IncomeFormData } from "@/types";
import { getCurrentUser } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getIncomes() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const incomes = await db.income.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  return incomes;
}

export async function getIncomeById(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const income = await db.income.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!income) {
    throw new Error("Income not found");
  }

  return income;
}

export async function createIncome(data: IncomeFormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const income = await db.income.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  revalidatePath("/incomes");
  revalidatePath("/dashboard");
  return income;
}

export async function updateIncome(id: string, data: IncomeFormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const income = await db.income.findUnique({
    where: {
      id,
    },
  });

  if (!income || income.userId !== user.id) {
    throw new Error("Unauthorized or income not found");
  }

  const updatedIncome = await db.income.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath("/incomes");
  revalidatePath("/dashboard");
  revalidatePath(`/incomes/${id}`);
  return updatedIncome;
}

export async function deleteIncome(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const income = await db.income.findUnique({
    where: {
      id,
    },
  });

  if (!income || income.userId !== user.id) {
    throw new Error("Unauthorized or income not found");
  }

  await db.income.delete({
    where: {
      id,
    },
  });

  revalidatePath("/incomes");
  revalidatePath("/dashboard");
}