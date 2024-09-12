import { useRef, useEffect, useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  onAdStart: (currentTime: number) => void;
  onAdEnd: () => void;
}

export default function YouTubePlayer({ videoId, onAdStart, onAdEnd }: YouTubePlayerProps) {
  const playerRef = useRef<any>(null);
  const [isYouTubeAPIReady, setYouTubeAPIReady] = useState(false);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        console.log("YouTube API script loaded");
      }
    };

    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API is ready");
      setYouTubeAPIReady(true);
    };

    if (window.YT && window.YT.Player) {
      console.log("YouTube API already available");
      setYouTubeAPIReady(true);
    } else {
      loadYouTubeAPI();
    }
  }, []);

  useEffect(() => {
    if (isYouTubeAPIReady && videoId) {
      playerRef.current = new window.YT.Player('player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              onAdStart(playerRef.current.getCurrentTime());
            } else if (event.data === window.YT.PlayerState.ENDED) {
              onAdEnd();
            }
          },
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    }
  }, [isYouTubeAPIReady, videoId]);

  return <div id="player" className='w-full h-full fixed top-0 left-0'></div>;
}
