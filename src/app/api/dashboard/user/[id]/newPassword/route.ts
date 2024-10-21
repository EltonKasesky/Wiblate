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
   
   
   
const historyResult = await query(
  'SELECT * FROM password_history WHERE user_id = $1',
  [cleanedUserId]
);




const oldPasswords = historyResult[0] || {};




const oldPasswordsList = [
  oldPasswords.old_password_1,
  oldPasswords.old_password_2,
  oldPasswords.old_password_3,
  oldPasswords.old_password_4,
  oldPasswords.old_password_5,
  oldPasswords.old_password_6,
  oldPasswords.old_password_7
];




const isOldPassword = await Promise.all(
  oldPasswordsList.map(async (oldPassword) => {
    if (oldPassword) {
      const match = await bcrypt.compare(newPassword, oldPassword);
      console.log(`Comparando nova senha com ${oldPassword}: ${match ? 'Match' : 'No match'}`);
      return match;
    }
    return false;
  })
).then(results => results.includes(true));




if (isOldPassword) {
  console.log('A nova senha é igual a uma das senhas antigas.');
  return NextResponse.json(
    { error: 'Erro: A nova senha não pode ser igual a nenhuma das 7 senhas anteriores.' },
    { status: 400 }
  );
}




console.log('Resultado da consulta de histórico:', historyResult);






const hashedNewPassword = await bcrypt.hash(newPassword, 10);




await query(
  `INSERT INTO password_history (user_id, old_password_1, old_password_2, old_password_3, old_password_4, old_password_5, old_password_6, old_password_7)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
ON CONFLICT (user_id) DO UPDATE
SET old_password_7 = password_history.old_password_6,
    old_password_6 = password_history.old_password_5,
    old_password_5 = password_history.old_password_4,
    old_password_4 = password_history.old_password_3,
    old_password_3 = password_history.old_password_2,
    old_password_2 = password_history.old_password_1,
    old_password_1 = EXCLUDED.old_password_1;
`,
  [
    cleanedUserId,              
    hashedNewPassword,            
    oldPasswords.old_password_1,  
    oldPasswords.old_password_2,  
    oldPasswords.old_password_3,  
    oldPasswords.old_password_4,  
    oldPasswords.old_password_5,  
    oldPasswords.old_password_6  
  ]
);

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
