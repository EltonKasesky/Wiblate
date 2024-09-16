import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    const client = await pool.connect();
    const res = await client.query('SELECT name, avatar FROM users WHERE id = $1', [userId]);
    client.release();

    if (res.rows.length > 0) {
      const user = res.rows[0];
      return NextResponse.json({
        name: user.name,
        avatar: user.avatar
      });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
