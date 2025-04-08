import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db as prisma } from "@/lib/prisma";
import { ExpenseForm } from "@/components/expenses/expense-form";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

// interface ExpensePageProps {
//   params: {
//     id: string;
//   };
// }

export default async function ExpensePage({ params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = session?.user?.id as string;
  const expense: any = await prisma.expense.findUnique({
    where: {
      id: id,
      userId: userId,
    },
  });

  if (!expense) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <div className="flex-1 container max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Edit Expense</h1>
                <p className="text-muted-foreground">
                  Update your expense details
                </p>
              </div>
              <div className="max-w-2xl">
                <ExpenseForm expense={expense} />
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}