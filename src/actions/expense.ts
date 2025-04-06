"use server";

import { db } from "@/lib/prisma";
import { ExpenseFormData } from "@/types";
import { getCurrentUser } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function getExpenses() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const expenses = await db.expense.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  return expenses;
}

export async function getExpenseById(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const expense = await db.expense.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
}

export async function createExpense(data: ExpenseFormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const expense = await db.expense.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
  return expense;
}

export async function updateExpense(id: string, data: ExpenseFormData) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const expense = await db.expense.findUnique({
    where: {
      id,
    },
  });

  if (!expense || expense.userId !== user.id) {
    throw new Error("Unauthorized or expense not found");
  }

  const updatedExpense = await db.expense.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
  revalidatePath(`/expenses/${id}`);
  return updatedExpense;
}

export async function deleteExpense(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const expense = await db.expense.findUnique({
    where: {
      id,
    },
  });

  if (!expense || expense.userId !== user.id) {
    throw new Error("Unauthorized or expense not found");
  }

  await db.expense.delete({
    where: {
      id,
    },
  });

  revalidatePath("/expenses");
  revalidatePath("/dashboard");
}