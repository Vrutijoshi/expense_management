import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { RegisterForm } from "@/components/auth/register-form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 container max-w-screen-2xl mx-auto py-12">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}