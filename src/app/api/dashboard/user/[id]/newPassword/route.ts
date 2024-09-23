import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { currentPassword, newPassword } = await request.json();
    const userId = params.id;
    const cleanedUserId = userId.replace(/[\[\]]/g, '');
    const result = await query(
      'SELECT password FROM users WHERE id = $1',
      [cleanedUserId]
    );
    if (result.length === 0) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
    }
    const user = result[0]; 
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Senha atual incorreta.' }, { status: 401 });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedNewPassword, cleanedUserId]
    );
    return NextResponse.json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar a senha:', error);
    return NextResponse.json({ error: 'Erro ao atualizar a senha.' }, { status: 500 });
  }
}
