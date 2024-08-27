'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowBigRightDash } from 'lucide-react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function Reproduction() {
  const [isYouTubeAPIReady, setYouTubeAPIReady] = useState(false);
  const playerRef = useRef<any>(null);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [adElapsedTime, setAdElapsedTime] = useState<number>(0);
  const [mainVideoCurrentTime, setMainVideoCurrentTime] = useState<number>(0);
  const [showSkipButton, setShowSkipButton] = useState<boolean>(false);
  const [adTimes, setAdTimes] = useState<number[]>([]);
  const router = useRouter();

  const location = "Petrópolis";

  useEffect(() => {
    const queryId = new URLSearchParams(window.location.search).get('id');
    setVideoId(queryId || undefined);
    console.log("Video ID set:", queryId);
  }, []);

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
      console.log("Initializing YouTube player with video ID:", videoId);
      playerRef.current = new window.YT.Player('player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: handleStateChange,
          onReady: (event: any) => {
            const videoDuration = event.target.getDuration();
            console.log("Video duration:", videoDuration);
            generateAdTimes(videoDuration);
            event.target.playVideo();
          },
        },
      });
    }
  }, [isYouTubeAPIReady, videoId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isAdPlaying) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
        checkForAd(elapsedTime);
      }, 1000);
    } else {
      timer = setInterval(() => {
        setAdElapsedTime((prevTime) => prevTime + 1);
        console.log("Ad elapsed time:", adElapsedTime);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [elapsedTime, isAdPlaying]);

  const handleStateChange = (event: any) => {
    console.log("Player state changed:", event.data);
    if (isAdPlaying && event.data === window.YT.PlayerState.ENDED) {
      console.log("Ad ended, continuing main video");
      continueMainVideo();
    }
  };

  const generateAdTimes = (duration: number) => {
    const minAds = 2; // Mínimo de anúncios que devem ser exibidos
    const numAds = Math.max(minAds, Math.floor(duration / 120)); // Ajuste conforme necessário
    const minInterval = 30;
    const times: number[] = [];

    for (let i = 0; i < numAds; i++) {
      let adTime: number;
      do {
        adTime = Math.floor(Math.random() * (duration - minInterval));
      } while (times.some(time => Math.abs(time - adTime) < minInterval));
      times.push(adTime);
    }

    times.sort((a, b) => a - b);
    setAdTimes(times);
    console.log("Generated ad times:", times);
  };

  const checkForAd = (currentTime: number) => {
    if (adTimes.includes(currentTime) && playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
      console.log("Playing ad at time:", currentTime);
      playAd(currentTime);
    }
  };

  const playAd = (adTime: number) => {
    if (playerRef.current && location) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log("Current main video time:", currentTime);
      setMainVideoCurrentTime(currentTime);
      setIsAdPlaying(true);
      setShowSkipButton(false);

      const adVideos: {
        [key: string]: string[];
        Petrópolis: string[];
        'Rio de Janeiro': string[];
        Haarlem: string[];
      } = {
        Petrópolis: ['VKcgPMt392s', 'wswJmXNiDFo'],
        'Rio de Janeiro': ['JCAC_pWfUys', 'wUEFbwTNHsA'],
        Haarlem: ['uuO3zpK17KM'],
      };

      const cityAds = adVideos["Petrópolis"] || ['defaultAdId'];
      const selectedAdId = cityAds[Math.floor(Math.random() * cityAds.length)];

      console.log("Location:", location);
      console.log("Available ads:", cityAds);
      console.log("Selected ad ID:", selectedAdId);

      playerRef.current.loadVideoById(selectedAdId);

      // Remover o tempo do anúncio da lista após ser exibido
      setAdTimes((prevAdTimes) => prevAdTimes.filter((time) => time !== adTime));
    } else {
      console.error("Location or player not available.");
    }
  };

  const continueMainVideo = () => {
    if (playerRef.current) {
      setIsAdPlaying(false);
      console.log("Continuing main video from time:", mainVideoCurrentTime);
      playerRef.current.loadVideoById(videoId);

      setTimeout(() => {
        if (mainVideoCurrentTime > 0) {
          playerRef.current.seekTo(Math.floor(mainVideoCurrentTime));
          playerRef.current.playVideo();
          console.log("Resuming main video playback");
        }
      }, 500);

      setElapsedTime(0);
      setAdElapsedTime(0);
    }
  };

  const skipAd = () => {
    console.log("Skipping ad");
    continueMainVideo();
    setElapsedTime(0);
    setAdElapsedTime(0);
  };

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setTimeout(() => setShowSkipButton(true), 300);
      return null;
    }

    return <div className="text-white text-sm">{remainingTime}s</div>;
  };

  return (
    <div className='relative w-full h-screen'>
      <div id="player" className='w-full h-full fixed top-0 left-0'></div>
      {isAdPlaying && (
        <div className="absolute bottom-4 right-4 p-2 mb-8">
          {!showSkipButton && (
            <CountdownCircleTimer
              isPlaying
              duration={10}
              isGrowing={true}
              strokeWidth={4}
              colors={'#ffffff'}
              size={40}
              onComplete={() => {}}
            >
              {renderTime}
            </CountdownCircleTimer>
          )}
          {showSkipButton && (
            <button
              className="flex items-center space-x-2 bg-white text-black rounded-full p-2 transition-opacity duration-300 ease-in-out opacity-100 hover:bg-gray-200"
              onClick={skipAd}
            >
              <span>Pular</span>
              <ArrowBigRightDash />
            </button>
          )}
        </div>
      )}
      <div className="absolute top-2 left-2 z-10">
      <Link href={`/intermediate?id=${videoId}`}>
          <ul className='absolute top-4 left-4 m-0 p-0'>
            <li className="prev list-none flex items-center justify-center w-12 h-12 bg-box-bg rounded-full transition duration-500 hover:bg-main-color">
              <ArrowLeft className='text-white w-6 h-6' />
            </li>
          </ul>
        </Link>
      </div>
    </div>
  );
}
