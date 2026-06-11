import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/utils/auth";
import { findUserByEmail } from "@/lib/repository";

export const authOptions = {
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) throw new Error("INVALID_INPUT");

        const user = await findUserByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");

        const isValid = verifyPassword(password, user.password);
        if (!isValid) throw new Error("WRONG_PASSWORD");

        return { email, role: user.role };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
