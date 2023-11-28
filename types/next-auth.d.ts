import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    name: string;
    image: string
  }

  interface User {
    id: string;
    name: string;
    image: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string
    image: string;
  }
}