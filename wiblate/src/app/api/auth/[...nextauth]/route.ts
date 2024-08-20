import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        
        try {
          // Fetch the user from the database by email
          const result = await query('SELECT * FROM users WHERE email = $1', [credentials.email]);
          console.log('[QUERY_RESULT]:', result);
          
          const user = result[0];
          
          // If the user is not found, return null
          if (!user) {
            console.log('[USER_NOT_FOUND]');
            return null;
          }
          
          // Check the password using bcrypt
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          console.log('[PASSWORD_VALIDATION]:', isValidPassword);
          
          if (!isValidPassword) {
            console.log('[INVALID_PASSWORD]');
            return null;
          }
          
          // Return the found user
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            cargo: user.cargo // Ensure cargo is included
          };
        } catch (error) {
          console.error('Error authorizing user:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          cargo: user.cargo
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id,
          email: token.email,
          name: token.name,
          cargo: token.cargo
        }
      };
    }
  },
  pages: {
    signIn: '/portal/login'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
