import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust path accordingly

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // <-- required for app directory (Next.js 13+ with /app)
