import { User, Expense, Income } from "@prisma/client";

export type UserWithoutPassword = Omit<User, "password">;

export type ExpenseWithUser = Expense & {
  user: UserWithoutPassword;
};

export type IncomeWithUser = Income & {
  user: UserWithoutPassword;
};

export type ExpenseFormData = {
  title: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
};

export type IncomeFormData = {
  title: string;
  amount: number;
  source: string;
  date: Date;
  description?: string;
};

export type AuthFormData = {
  name?: string;
  email: string;
  password: string;
};