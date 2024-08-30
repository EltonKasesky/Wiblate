import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import MovieItemSkeleton from '../skeleton/MovieItemSkeleton';
import MovieItem from './MovieItem';

// Definindo os tipos para os dados do vídeo
interface VideoData {
  id: string;
  title: string;
  catalog: string;
  background: string;
  creators: string;
  uniqueKey: string;
}

interface VideoSectionTopProps {
  sectionId: string;
  endpoint: string;
}

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const VideoSectionTop: React.FC<VideoSectionTopProps> = ({ sectionId, endpoint }) => {
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

  const loadVideos = async (endpoint: string) => {
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
    loadVideos(endpoint);
  }, [endpoint]);

  return (
    <div className="videos-carousel" id={sectionId}>
      <OwlCarousel
        className="owl-carousel owl-theme"
        loop
        nav
        navText={["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]}
        autoplay
        autoplayHoverPause
        responsive={{
          0: { items: 1 },
          600: { items: 3 },
          1000: { items: 5 }
        }}
      >
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <MovieItemSkeleton key={index} />
          ))
        ) : (
          videos.map(video => (
            <MovieItem key={video.uniqueKey} videoData={video} />
          ))
        )}
      </OwlCarousel>
    </div>
  );
};

export default VideoSectionTop;
