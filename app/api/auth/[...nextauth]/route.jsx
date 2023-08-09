import NextAuth from "next-auth";
import prisma from "../../../libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { labe: "Email", type: "text", placeholder: "asilo" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text", placeholder: "Prince" },
      },

      async authorize(credentials) {
        // check if there is no missing fields email and pw
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }
        // check if user exist
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // if user doesn't exist
        if (!user || !user?.password) {
          throw new Error("No User Found");
        }

        // check if valid user
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // if password doesn't match
        if (!passwordMatch) {
          throw new Error("Incorrect Password");
        }

        return user;
      },
    }),
  ],

  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
