import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';

interface VideoData {
  id: string;
  creators: string;
  catalog: string;
  title: string;
  tableName: string; 
}

interface MovieItemProps {
  videoData: VideoData;
}

const MovieItem: React.FC<MovieItemProps> = ({ videoData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await axios.post('/api/videos/watched', { video_id: videoData.id, tableName: videoData.tableName });
      await axios.post('/api/videos/views', { video_id: videoData.id });


      const response = await axios.get(`/api/videos/background?idYoutube=${encodeURIComponent(videoData.id)}&tableName=${encodeURIComponent(videoData.tableName)}`);
      const { background } = response.data;
      const { creators } = response.data;

      if (background && creators) {
        sessionStorage.setItem('videoBackground', background);
        sessionStorage.setItem('videoCreators', creators);

        const href = `/intermediate?id=${encodeURIComponent(videoData.id)}`;
        router.push(href);
      } else {
        console.error('Background não encontrado para o vídeo:', videoData.id);
      }
    } catch (error) {
      console.error('Erro ao buscar o background:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item" onClick={handleClick}>
      <div className="relative w-full h-100 overflow-hidden shadow-md cursor-pointer rounded-lg">
        <Image
          src={`data:image/jpeg;base64,${videoData.catalog}`}
          alt={videoData.title}
          fill
          priority
          className="brightness-100 object-cover"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2">
          <div className="text-xl font-bold">{videoData.title}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
