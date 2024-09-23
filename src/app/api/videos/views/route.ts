import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const { video_id } = await request.json();

  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    return NextResponse.json({ error: 'Usuário não está autenticado.' }, { status: 403 });
  }

  const user_id = session.user.id;

  try {
    await query(
      'INSERT INTO video_views (user_id, video_id) VALUES ($1, $2)',
      [user_id, video_id]
    );

    return NextResponse.json({ message: 'Visualização registrada com sucesso.' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao registrar visualização:', error);
    return NextResponse.json({ error: 'Erro ao registrar visualização.' }, { status: 500 });
  }
}
