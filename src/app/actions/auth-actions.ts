import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { query } from '@/lib/db';

async function createAccount(formData: FormData) {
  'use server';

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const hashPassword = await bcrypt.hash(password, 10);
  const id = uuidv4(); // Gerar um UUID para o id

  await query(
    'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)',
    [id, name, email, hashPassword]
  );

  redirect('/portal/login');
}

const AuthAction = {
  createAccount
};

export default AuthAction;
