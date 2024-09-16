import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItemSkeleton from '../skeleton/MovieItemSkeleton';
import GenderItem from './GenderItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';

// Definindo os tipos para os dados do evento
interface VideoData {
  id: string;
  company_name: string;
  catalog: string;
  logo: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  description: string;
  id_youtube: string;
  uniqueKey: string;
}

interface GenderSectionProps {
  sectionId: string;
  endpoint: string;
}

const GenderSection: React.FC<GenderSectionProps> = ({ sectionId, endpoint }) => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchYouTubeData = async (videoId: string): Promise<{ id: string } | null> => {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`);
      const videoData = response.data.items[0];

      if (!videoData) {
        throw new Error(`No data found for video ID: ${videoId}`);
      }

      return {
        id: videoId
      };
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      return null;
    }
  };

  const loadVideos = async () => {
    try {
      const response = await axios.get(endpoint);
      const videosData = response.data;

      const fetchPromises = videosData.map((video: any, index: number) =>
        fetchYouTubeData(video.id_youtube).then(youtubeData => {
          if (youtubeData) {
            return {
              ...youtubeData,
              company_name: video.company_name,
              catalog: video.catalog,
              logo: video.logo,
              address: video.address,
              phone: video.phone,
              city: video.city,
              state: video.state,
              description: video.description,
              uniqueKey: `${video.id_youtube}-${index}`
            };
          }
          return null;
        })
      );

      const videoDataList = await Promise.all(fetchPromises);

      setVideos(videoDataList.filter(video => video !== null) as VideoData[]);
      setLoading(false);
    } catch (error) {
      console.error('Error loading videos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, [endpoint]);

  return (
    <div className="videos-carousel" id={sectionId}>
      <Swiper
        modules={[Navigation]}
        loop={true}
        navigation={true}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          800: { slidesPerView: 3 },
          1080: { slidesPerView: 4 },
          1450: { slidesPerView: 5}
        }}
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index}>
              <MovieItemSkeleton />
            </SwiperSlide>
          ))
        ) : (
          videos.map(video => (
            <SwiperSlide key={video.uniqueKey}>
              <GenderItem videoData={video} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default GenderSection;