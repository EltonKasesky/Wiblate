import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    const client = await pool.connect();
    const res = await client.query('SELECT name, email, avatar, created_at FROM users WHERE id = $1', [userId]);
    client.release();

    if (res.rows.length > 0) {
      const user = res.rows[0];

      const formattedDate = new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      return NextResponse.json({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        createdAt: formattedDate,
      });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
