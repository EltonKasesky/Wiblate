// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { name, email, tel, message, subject } = await req.json();

    const sql = `
      INSERT INTO contact (name, email, tel, message, subject)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const params = [name, email, tel, message, subject];
    await query(sql, params);

    return NextResponse.json({ success: true, message: 'Contato enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao inserir dados no banco de dados:', error);
    return NextResponse.json({ success: false, message: 'Erro ao enviar contato.' });
  }
}
