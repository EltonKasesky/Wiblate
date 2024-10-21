import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios'; 

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Usuário não autenticado.' }, { status: 403 });
    }

    const user_id = session.user.id;
    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM user_watched_videos WHERE user_id = $1', [user_id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Nenhum vídeo assistido encontrado.' });
    }

    let videoData = [];

    for (let i = 1; i <= 5; i++) {
      const videoId = rows[0][`video_${i}_id`];
      const videoTable = rows[0][`video_${i}_table`];

      if (videoId && videoTable) {
        const videoResult = await client.query(`SELECT catalog, idYoutube FROM ${videoTable} WHERE idYoutube = $1`, [videoId]);

        if (videoResult.rows.length > 0) {
          const { catalog, idyoutube } = videoResult.rows[0];

          const youtubeResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${idyoutube}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
          );

          const videoTitle = youtubeResponse.data.items[0].snippet.title;

          videoData.push({
            catalog,
            title: videoTitle,
            type: `Vídeo ${i}`,
            id: idyoutube,
            tableName: videoTable,
          });
        }
      }
    }

    const uniqueVideos = videoData.filter(
      (video, index, self) =>
        index === self.findIndex((v) => v.id === video.id && v.tableName === video.tableName)
    );

    client.release();

    return NextResponse.json(uniqueVideos);
  } catch (error) {
    console.error('Erro ao buscar vídeos assistidos:', error);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}
