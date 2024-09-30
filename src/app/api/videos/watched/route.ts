import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {

  try {
    const { video_id, tableName } = await request.json();
    console.log('Recebido:', { video_id, tableName });
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      console.log('Usuário não autenticado.');
      return NextResponse.json({ error: 'Usuário não está autenticado.' }, { status: 403 });
    }

    const user_id = session.user.id;
    console.log('ID do usuário:', user_id);
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const res = await client.query('SELECT * FROM user_watched_videos WHERE user_id = $1', [user_id]);
      console.log('Histórico do usuário:', res.rows);

      if (res.rows.length > 0) {
        console.log('Atualizando histórico existente...');
        await client.query(`
          UPDATE user_watched_videos
          SET
            video_5_id = video_4_id,
            video_5_table = video_4_table,
            video_4_id = video_3_id,
            video_4_table = video_3_table,
            video_3_id = video_2_id,
            video_3_table = video_2_table,
            video_2_id = video_1_id,
            video_2_table = video_1_table,
            video_1_id = $2,
            video_1_table = $3
          WHERE user_id = $1
        `, [user_id, video_id, tableName]);
      } else {
        console.log('Inserindo novo histórico...');
        await client.query(`
          INSERT INTO user_watched_videos (user_id, video_1_id, video_1_table)
          VALUES ($1, $2, $3)
        `, [user_id, video_id, tableName]);
      }
      
      await client.query('COMMIT');
      client.release();
      console.log('Histórico atualizado com sucesso.');
      return NextResponse.json({ message: 'Histórico atualizado com sucesso' });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erro ao atualizar histórico dentro da transação:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao atualizar histórico:', error);
    return NextResponse.json({ error: 'Erro no banco de dados' }, { status: 500 });
  }
}
