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
    // <div className="flex flex-col min-h-screen">
    //   <header className="border-b">
    //     <div className="container flex h-16 items-center justify-between">
    //       <h1 className="text-xl font-bold">Budget Tracker</h1>
    //       <div className="flex items-center gap-4">
    //         <Button variant="outline" asChild>
    //           <Link href="/login">Login</Link>
    //         </Button>
    //         <Button asChild>
    //           <Link href="/register">Register</Link>
    //         </Button>
    //       </div>
    //     </div>
    //   </header>
    //   <main className="flex-1">
    //     <section className="py-24">
    //       <div className="container flex flex-col items-center gap-6 text-center">
    //         <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
    //           Take Control of Your Finances
    //         </h1>
    //         <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
    //           Track your income and expenses, set budgets, and achieve your financial goals with our simple budget tracker.
    //         </p>
    //         <div className="flex flex-col sm:flex-row gap-4">
    //           <Button size="lg" asChild>
    //             <Link href="/register">Get Started</Link>
    //           </Button>
 <h1>test</h1>
  )
}