import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Usuário não autenticado.' }, { status: 403 });
    }

    const user_id = session.user.id;
    const client = await pool.connect();

    try {
      const res = await client.query(
        `SELECT category, views_count FROM watched_categories WHERE user_id = $1`,
        [user_id]
      );

      client.release();
      return NextResponse.json(res.rows); // Envia as categorias e contagens ao frontend
    } catch (error) {
      client.release();
      console.error('Erro ao buscar categorias:', error);
      return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ error: 'Erro ao processar a requisição' }, { status: 500 });
  }
}
