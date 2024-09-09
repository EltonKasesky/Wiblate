import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MovieItemSkeleton from '../skeleton/MovieItemSkeleton';
import MovieItem from './MovieItem';
import { Navigation, Pagination } from 'swiper/modules';

interface VideoData {
  id: string;
  title: string;
  catalog: string;
  background: string;
  creators: string;
  uniqueKey: string;
}

interface VideoSectionProps {
  sectionId: string;
  endpoint: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ sectionId, endpoint }) => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchYouTubeData = async (videoId: string): Promise<{ id: string; title: string } | null> => {
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`);
      const videoData = response.data.items[0];

      if (!videoData) {
        throw new Error(`No data found for video ID: ${videoId}`);
      }

      return {
        id: videoId,
        title: videoData.snippet.title
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
        fetchYouTubeData(video.idyoutube).then(youtubeData => {
          if (youtubeData) {
            return { ...youtubeData, catalog: video.catalog, background: video.background, creators: video.creators, uniqueKey: `${video.idyoutube}-${index}` };
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
        modules={[Navigation, Pagination]}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
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
              <MovieItem videoData={video} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default VideoSection;