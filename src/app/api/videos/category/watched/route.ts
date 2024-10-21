import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Usuário não está autenticado.' }, { status: 403 });
    }

    const user_id = session.user.id;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      
      const res = await client.query(
        'SELECT * FROM watched_categories WHERE user_id = $1 AND category = $2',
        [user_id, category]
      );

      if (res.rows.length > 0) {
        
        await client.query(
          'UPDATE watched_categories SET views_count = views_count + 1 WHERE user_id = $1 AND category = $2',
          [user_id, category]
        );
      } else {
        
        await client.query(
          'INSERT INTO watched_categories (user_id, category, views_count) VALUES ($1, $2, 1)',
          [user_id, category]
        );
      }

      await client.query('COMMIT');
      client.release();
      return NextResponse.json({ message: 'Categoria atualizada com sucesso' });
    } catch (error) {
      await client.query('ROLLBACK');
      client.release();
      console.error('Erro ao atualizar categorias:', error);
      return NextResponse.json({ error: 'Erro ao atualizar categorias' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ error: 'Erro ao processar a requisição' }, { status: 500 });
  }
}
