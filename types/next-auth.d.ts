import { type DefaultSession } from "next-auth";

// nextauth.d.ts
declare module "next-auth" {
  interface User {
    name?: any;
    image?: any;
    role?: any;
    storeId?: any;
    cpf?: any;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: any;
    image?: any;
    role?: any;
    storeId?: any;
    cpf?: any;
  }
}
