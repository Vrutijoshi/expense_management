import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { LoginForm } from "@/components/auth/login-form";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* <Header /> */}
      <div className="flex-1 container max-w-screen-2xl mx-auto py-12">
        <LoginForm />
      </div>
      {/* <Footer /> */}
    </div>
  );
}