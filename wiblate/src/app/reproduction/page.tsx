'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function Reproduction() {
  const [isYouTubeAPIReady, setYouTubeAPIReady] = useState(false);
  const router = useRouter();
  const [videoId, setVideoId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Extrair o ID da query string do URL
    const queryId = new URLSearchParams(window.location.search).get('id');
    setVideoId(queryId || undefined);
  }, []);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];

      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    };

    window.onYouTubeIframeAPIReady = () => {
      setYouTubeAPIReady(true);
    };

    if (window.YT && window.YT.Player) {
      setYouTubeAPIReady(true);
    } else {
      loadYouTubeAPI();
    }
  }, []);

  useEffect(() => {
    if (isYouTubeAPIReady && videoId) {
      new window.YT.Player('player', {
        videoId: videoId, // ID do vídeo do YouTube
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
      });
    }
  }, [isYouTubeAPIReady, videoId]);

  return (
    <>
      <div className='relative w-full h-screen'>
        <div id="player" className='w-full h-full fixed top-0 left-0'></div>
        <Link href={`/intermediate?id=${videoId}`}>
          <ul className='absolute top-4 left-4 m-0 p-0'>
            <li className="prev list-none flex items-center justify-center w-12 h-12 bg-box-bg rounded-full transition duration-500 hover:bg-main-color">
              <ArrowLeft className='text-white w-6 h-6' />
            </li>
          </ul>
        </Link>
      </div>
    </>
  );
}
