import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { IncomeForm } from "@/components/income/income-form";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";

export default async function AddIncomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
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
                <h1 className="text-3xl font-bold">Add Income</h1>
                <p className="text-muted-foreground">
                  Create a new income record
                </p>
              </div>
              <div className="max-w-2xl">
                <IncomeForm />
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}