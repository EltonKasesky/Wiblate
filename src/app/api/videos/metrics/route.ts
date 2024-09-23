import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    return NextResponse.json({ error: 'Usuário não autenticado.' }, { status: 403 });
  }

  const userId = session.user.id;

  try {
    const result = await query(`
      SELECT DATE_TRUNC('day', viewed_at) AS day, COUNT(*) AS count
      FROM video_views
      WHERE user_id = $1 AND viewed_at >= DATE_TRUNC('month', NOW())
      GROUP BY day
      ORDER BY day
    `, [userId]);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao buscar métricas de vídeos:', error);
    return NextResponse.json({ error: 'Erro ao buscar métricas de vídeos.' }, { status: 500 });
  }
}
