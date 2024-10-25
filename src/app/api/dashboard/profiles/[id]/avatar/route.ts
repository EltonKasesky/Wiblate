import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const profileId = params.id;  

  try {
    const formData = await request.formData();
    const avatarFile = formData.get('avatar') as Blob;

    if (!avatarFile) {
      return NextResponse.json({ error: 'Nenhum arquivo de avatar fornecido' }, { status: 400 });
    }

    
    const buffer = Buffer.from(await avatarFile.arrayBuffer());
    const avatarBase64 = buffer.toString('base64');

    
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 403 });
    }
    const userId = session.user.id;

    const client = await pool.connect();

    
    await client.query('UPDATE profiles SET profile_picture = $1 WHERE id = $2 AND user_id = $3', [avatarBase64, profileId, userId]);

    client.release();

    return NextResponse.json({ message: 'Imagem do perfil atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a imagem do perfil:', error);
    return NextResponse.json({ error: 'Erro no banco de dados' }, { status: 500 });
  }
}
