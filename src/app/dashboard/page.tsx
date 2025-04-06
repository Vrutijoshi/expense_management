'use server'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
 import { db as prisma} from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { ExpenseChart } from "@/components/dashboard/expense-chart";
import { IncomeChart } from "@/components/dashboard/income-chart";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CreditCard, DollarSign, PiggyBank, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId:any = session?.user?.id


  // Get user's data
  const [expenses, incomes, totalExpense, totalIncome] = await Promise.all([
    prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 5,
    }),
    prisma.income.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 5,
    }),
    prisma.expense.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
    prisma.income.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
  ]);

  // Calculate dashboard stats
  const expenseSum = totalExpense._sum.amount || 0;
  const incomeSum = totalIncome._sum.amount || 0;
  const balance = incomeSum - expenseSum;
  const savingsRate = incomeSum > 0 ? ((incomeSum - expenseSum) / incomeSum) * 100 : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 container max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <PiggyBank className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
                  <p className="text-xs text-muted-foreground">
                    {balance >= 0 ? "You're on track" : "Spending exceeds income"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Income</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(incomeSum)}</div>
                  <p className="text-xs text-muted-foreground">Total earnings tracked</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(expenseSum)}</div>
                  <p className="text-xs text-muted-foreground">Total spending tracked</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{savingsRate.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    {savingsRate >= 20 
                      ? "Excellent savings rate" 
                      : savingsRate >= 10 
                      ? "Good savings rate" 
                      : "Consider saving more"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ExpenseChart userId={userId} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Income Sources</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <IncomeChart userId={userId} />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Expenses</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/expenses">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {expenses.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">
                      No expenses found. Add your first expense to start tracking.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {expenses.map((expense: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; category: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; amount: number; }) => (
                        <div key={expense.id} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium leading-none">{expense.title}</p>
                            <p className="text-sm text-muted-foreground">{expense.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{formatCurrency(expense.amount)}</span>
                            <Link href={`/expenses/${expense.id}`}>
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Income</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/income">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {incomes.length === 0 ? (
                    <p className="text-center py-4 text-muted-foreground">
                      No income found. Add your first income to start tracking.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {incomes.map((income: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; source: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; amount: number; }) => (
                        <div key={income.id} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-medium leading-none">{income.title}</p>
                            <p className="text-sm text-muted-foreground">{income.source}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{formatCurrency(income.amount)}</span>
                            <Link href={`/income/${income.id}`}>
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}