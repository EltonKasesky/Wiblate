import NextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

const authOptions: NextAuthOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Provider de credenciais existente
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
          // Busca o usuário no banco de dados pelo email
          const result = await query('SELECT * FROM users WHERE email = $1', [credentials.email]);
          console.log('[QUERY_RESULT]:', result);
          
          const user = result[0];
          
          // Se o usuário não for encontrado, retorne null
          if (!user) {
            console.log('[USER_NOT_FOUND]');
            return null;
          }
          
          // Verifica a senha usando bcrypt
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          console.log('[PASSWORD_VALIDATION]:', isValidPassword);
          
          if (!isValidPassword) {
            console.log('[INVALID_PASSWORD]');
            return null;
          }
          
          // Retorne o usuário encontrado
          return {
            id: user.id.toString(),
            email: user.email as string,
            name: user.name as string,
            cargo: user.cargo // Inclua cargo aqui
          };
        } catch (error) {
          console.error('Error authorizing user:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Verificar se o usuário já existe no banco de dados
          const result = await query('SELECT * FROM users WHERE email = $1', [user?.email ?? '']);
          let dbUser = result[0];

          // Se o usuário não existir, crie um novo usuário com o cargo padrão 'Membro'
          if (!dbUser && user) {
            const newUser = await query(
              `INSERT INTO users (id, email, name, cargo) VALUES ($1, $2, $3, $4) RETURNING *`,
              [user.id ?? '', user.email ?? '', user.name ?? '', 'Membro']
            );
            dbUser = newUser[0];
          }

          // Adicionar o cargo ao objeto user
          if (user && dbUser) {
            user.cargo = dbUser.cargo;
          }
          return true;
        } catch (error) {
          console.error('Error during Google sign in:', error);
          return false;
        }
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.name = user.name as string;
        token.cargo = user.cargo as string;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        cargo: token.cargo as string
      };
      return session;
    }
  },
  pages: {
    signIn: '/portal/login'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
