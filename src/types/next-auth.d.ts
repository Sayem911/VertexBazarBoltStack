import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    id: string;
    googleId?: string;
    provider: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    provider: string;
    accessToken?: string;
  }
}