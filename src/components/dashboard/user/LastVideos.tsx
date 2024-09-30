import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Video {
  catalog: string;
  title: string;
  type: string;
  id: string;
}

export default function UserWatchedVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchedVideos = async () => {
      try {
        const { data } = await axios.get('/api/videos/historic');
        setVideos(data);
      } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchedVideos();
  }, []);

  return (
<section className="box-border p-6 bg-white shadow-lg rounded-lg h-auto  flex flex-col justify-between">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Últimos Vídeos Assistidos
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Link href={`/reproduction?id=${video.id}`}>
                <img
                  src={`data:image/jpeg;base64,${video.catalog}`}
                  alt={`Vídeo ${index + 1}`}
                  className="w-16 h-16 rounded-full shadow-md cursor-pointer"
                />
              </Link>
              <p className="mt-2 text-gray-900">{video.title}</p>
              <p className="text-sm text-gray-500">{video.type}</p>
            </div>
          ))
        ) : (
          <p>Nenhum vídeo assistido.</p>
        )}
      </div>
    </section>
  );
}
