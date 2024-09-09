import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

interface VideoData {
  id: string;
  background: string;
  creators: string;
  catalog: string;
  title: string;
}

interface MovieItemProps {
  videoData: VideoData;
}

const MovieItem: React.FC<MovieItemProps> = ({ videoData }) => {
  const router = useRouter();

  const handleClick = () => {
    if (videoData && videoData.id && videoData.background) {
      sessionStorage.setItem('videoBackground', videoData.background);
      sessionStorage.setItem('videoCreators', videoData.creators);
      const href = `/intermediate?id=${encodeURIComponent(videoData.id)}`;
      router.push(href);
    } else {
      console.error('Invalid videoData:', videoData);
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
