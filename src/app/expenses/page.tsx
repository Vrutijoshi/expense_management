import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db as prisma } from "@/lib/prisma";
import { ExpenseList } from "@/components/expenses/expense-list";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { Expense } from "@/components/expenses/expense-form";

export default async function ExpensesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = session?.user?.id as string ;
  const expenses:any[] = await prisma.expense.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <div className="flex-1 container max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <ExpenseList expenses={expenses} />
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}