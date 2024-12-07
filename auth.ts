import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { getUserAuth } from "@/lib/actions";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    credentials: {
      user: { label: "CPF", name: "user" },
      password: { label: "Senha", type: "password", name: "password" },
    },

    authorize: async (credentials) => {
      const c = {
        cpf: credentials?.user,
        password: credentials?.password,
      };

      if (c) {
        let user = await getUserAuth(c.cpf, c.password);
        return user;
      } else {
        return null;
      }
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
  },
  providers,
  adapter: PrismaAdapter(Prisma),
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      /* TODO adicionar refresh token ao session object  */
      if (user) {
        token.name = user.name;
        token.cpf = user.cpf;
        token.image = user.image;
        token.role = user.role;
        token.storeId = user.storeId;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name;
        session.user.cpf = token.cpf;
        session.user.image = token.picture;
        session.user.role = token.role;
        session.user.storeId = token.storeId;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
});
