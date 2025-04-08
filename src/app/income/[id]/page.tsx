import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db as prisma } from "@/lib/prisma";
import { IncomeForm } from "@/components/income/income-form";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";



export default async function IncomePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = session?.user?.id as string;
  const income:any = await prisma.income.findUnique({
    where: {
      id: id,
      userId: userId,
    },
  });

  if (!income) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
     cr {/* <Header /> */}
      <div className="flex-1 container max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Edit Income</h1>
                <p className="text-muted-foreground">
                  Update your income details
                </p>
              </div>
              <div className="max-w-2xl">
                <IncomeForm income={income} />
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}