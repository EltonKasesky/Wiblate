import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getServerSession } from 'next-auth'; 
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Usuário não autenticado.' }, { status: 403 });
  }

  const user_id = session.user.id;

  try {
    
    const profiles = await query('SELECT * FROM profiles WHERE user_id = $1', [user_id]);

    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Erro ao carregar perfis' }, { status: 500 });
  }
}
