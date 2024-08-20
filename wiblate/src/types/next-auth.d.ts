// types/next-auth.d.ts
import NextAuth from 'next-auth';
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    cargo?: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    cargo?: string;
  }
}
