import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

interface VideoData {
  id: string;
  catalog: string;
  logo: string;
  company_name: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  description: string;
}

interface GenderItemProps {
  videoData: VideoData;
}

const GenderItem: React.FC<GenderItemProps> = ({ videoData }) => {
  const router = useRouter();

  const handleClick = () => {
    if (videoData && videoData.id) {
      sessionStorage.setItem('videoLogo', videoData.logo);
      sessionStorage.setItem('videoAddress', videoData.address);
      sessionStorage.setItem('videoPhone', videoData.phone);
      sessionStorage.setItem('videoCity', videoData.city);
      sessionStorage.setItem('videoState', videoData.state);
      sessionStorage.setItem('videoDescription', videoData.description);
      const href = `/reproductionGender?id=${encodeURIComponent(videoData.id)}`;
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
          alt={videoData.company_name} 
          layout="fill" 
          objectFit="cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white p-2">
          <div className="text-xl font-bold">{videoData.company_name}</div>
        </div>
      </div>
    </div>
  );
};

export default GenderItem;
