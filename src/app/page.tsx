import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
     
      {/* Main Content */}
      <main className="flex-1">
        <section className="py-24">
          <div className="container flex flex-col items-center gap-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Take Control of Your Finances
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Track your income and expenses, set budgets, and achieve your financial goals with our simple budget tracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              {/* <Button size="lg" variant="outline" asChild>
                <Link href="/demo">View Demo</Link>
              </Button> */}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="container grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
              <p className="text-gray-600 dark:text-gray-400">Easily log daily spending and categorize expenses.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Monitor Income</h3>
              <p className="text-gray-600 dark:text-gray-400">Record different income sources and analyze monthly trends.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Set Budgets</h3>
              <p className="text-gray-600 dark:text-gray-400">Create budgets for categories and get alerts when overspending.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
     
    </div>
  )
}