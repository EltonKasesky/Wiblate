import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, message: 'A senha deve ter pelo menos 8 caracteres.' }, { status: 400 });
    }

    const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.length > 0) {
      return NextResponse.json({ success: false, message: 'E-mail já cadastrado.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4(); 

    await query(
      'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)',
      [id, name, email, hashedPassword]
    );

    const profileId = uuidv4(); 
    await query(
      'INSERT INTO profiles (id, user_id, profile_name, profile_picture) VALUES ($1, $2, $3, $4)',
      [profileId, id, name, ''] 
    );

    return NextResponse.json({ success: true, message: 'Conta criada com sucesso!', redirect: '/portal/login' }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar conta:', error);

    return NextResponse.json({ success: false, message: 'Erro ao criar conta, tente novamente.' }, { status: 500 });
  }
}
