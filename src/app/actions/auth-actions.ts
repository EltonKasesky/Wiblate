import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

async function createAccount(formData: FormData) {
  'use server';

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();

  
  const setCookieError = (message: string) => {
    cookieStore.set('signup_error', message, { path: '/' });
  };

  try {
    
    setCookieError('');

    
    try {
      const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.length > 0) {
        setCookieError('E-mail já cadastrado.');
        return { success: false, message: 'E-mail já cadastrado.' };
      }
    } catch (dbCheckError) {
      console.error('Erro ao verificar usuário existente:', dbCheckError);
      setCookieError('Erro ao verificar usuário.');
      return { success: false, message: 'Erro ao verificar usuário.' };
    }

    
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error('Erro ao criar hash da senha:', hashError);
      setCookieError('Erro ao criar conta, tente novamente.');
      return { success: false, message: 'Erro ao criar conta, tente novamente.' };
    }

    
    try {
      const id = uuidv4();
      await query(
        'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)',
        [id, name, email, hashPassword]
      );
    } catch (insertError) {
      console.error('Erro ao inserir usuário no banco de dados:', insertError);
      setCookieError('Erro ao criar conta, tente novamente.');
      return { success: false, message: 'Erro ao criar conta, tente novamente.' };
    }

    
    return { success: true, redirect: '/portal/login' };
  } catch (error) {
    console.error('Erro inesperado:', error);
    setCookieError('Erro ao criar conta, tente novamente.');
    return { success: false, message: 'Erro ao criar conta, tente novamente.' };
  }
}

const AuthActions = {
  createAccount,
};

export default AuthActions;