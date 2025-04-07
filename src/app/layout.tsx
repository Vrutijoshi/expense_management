import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth/authProvider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget Tracker",
  description: "Track your personal finances",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);


  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider  session={session}> 
          <Header/>         
          <main>{children}</main>
          <Footer/>
          <Toaster />
        </AuthProvider>

      </body>
    </html>
  );
}