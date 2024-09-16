'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowBigRightDash, ChevronRight, ChevronLeft, Facebook, Instagram, Twitter, Image } from 'lucide-react';
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
  const [adVideos, setAdVideos] = useState<string[]>([]);
  const [originalAd, setOriginalAd] = useState<string[]>([]);
  const [isPanelExpanded, setIsPanelExpanded] = useState<boolean>(false);
  const [adInfo, setAdInfo] = useState<any>(null);
  const [selectedAdId, setSelectedAdId] = useState<string | null>(null);
  const router = useRouter();

  const location = "Petrópolis"; // Ajuste se necessário

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
          iv_load_policy: 3,
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

  useEffect(() => {
    const fetchAdVideos = async () => {
      try {
        const response = await fetch(`/api/ads?city=${location}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const adIds = data.map((ad: { id_youtube: string }) => ad.id_youtube);
        setAdVideos(adIds);
        setOriginalAd(adIds)
        setAdInfo(data);
        console.log("Ad videos fetched:", data);
      } catch (error) {
        console.error('Error fetching ad videos:', error);
        setAdVideos([]);
      }
    };

    fetchAdVideos();
  }, [location]);

  const handleStateChange = (event: any) => {
    console.log("Player state changed:", event.data);
    if (isAdPlaying && event.data === window.YT.PlayerState.ENDED) {
      console.log("Ad ended, continuing main video");
      continueMainVideo();
    }
  };

  const generateAdTimes = (duration: number) => {
    const interval = 10;
    const times: number[] = [];

    for (let time = interval; time < duration; time += interval) {
      times.push(time);
    }

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
    if (playerRef.current && adVideos.length > 0) {
      const currentTime = playerRef.current.getCurrentTime();
      console.log("Current main video time:", currentTime);
      setMainVideoCurrentTime(currentTime);
      setIsAdPlaying(true);
      setShowSkipButton(false);

      const selectedAdId = adVideos[Math.floor(Math.random() * adVideos.length)];

      setSelectedAdId(selectedAdId);  // Armazenar o ID do anúncio selecionado

      console.log("Location:", location);
      console.log("Available ads:", adVideos);
      console.log("Selected ad ID:", selectedAdId);

      playerRef.current.loadVideoById(selectedAdId);

      setAdTimes((prevAdTimes) => prevAdTimes.filter((time) => time !== adTime));
      setAdVideos((prevAdVideos) => prevAdVideos.filter((adId) => adId !== selectedAdId));

      if (adVideos.length === 1) {
        setAdVideos(originalAd);
        console.log("Restoring original ads:", originalAd);
      }
    } else {
      console.error("Player not available or no ads loaded.");
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
    <div className="relative w-full h-screen">
      <div id="player" className="w-full h-full fixed top-0 left-0"></div>

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
              onComplete={() => { }}
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

      {isAdPlaying && (
        <div>
          {/* Botão para expandir o painel */}
          {!isPanelExpanded && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50 transition-all duration-[1500ms] ease-in-out">
              <div
                className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full cursor-pointer"
                onClick={() => {
                  setIsPanelExpanded(true);
                  console.log("Expandir painel");
                }}
              >
                <ChevronRight className="text-white w-6 h-6" /> {/* Seta para expandir */}
              </div>
            </div>
          )}

          {/* Painel que cobre 30% da tela quando expandido */}
          <div
            className={`fixed top-0 left-0 h-full bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 transition-transform duration-[1500ms] ease-in-out ${isPanelExpanded ? 'translate-x-0 w-[30%]' : '-translate-x-full w-0'
              }`}
          >
            {/* Conteúdo do painel */}
            {isPanelExpanded && adInfo && (
              <div className="text-white text-lg space-y-8 mt-[30%]">
                {/* Selecionar o anúncio com base no id_youtube */}
                {adInfo.length > 0 && selectedAdId && (
                  (() => {
                    const currentAd = adInfo.find((ad: { id_youtube: string }) => ad.id_youtube === selectedAdId);
                    return currentAd ? (
                      <>
                        <div className="w-full text-center mb-4">
                          {/* Exibir logo se disponível */}
                          {currentAd.logo && (
                            <div className="flex justify-center pb-4">
                              <img
                                src={`data:image/jpeg;base64,${currentAd.logo}`}
                                alt={currentAd.company_name}
                                width={240}
                                height={240}
                              />
                            </div>
                          )}
                          <h1 className="text-2xl font-bold">{currentAd.company_name}</h1>
                        </div>
                        <p>{currentAd.address}</p>
                        <p>{currentAd.phone}</p>

                        {/* Texto de descrição */}
                        <p className="text-2xl">
                          {currentAd.description}
                        </p>
                      </>
                    ) : (
                      <p>Nenhuma informação disponível para o anúncio.</p>
                    );
                  })()
                )}
              </div>
            )}
          </div>

          {/* Seta para recolher no fim do painel, agora fora do painel e sincronizada */}
          {isPanelExpanded && (
            <div
              className={`absolute top-1/2 transition-transform duration-[1500ms] ease-in-out transform -translate-y-1/2 z-50 ${isPanelExpanded ? 'left-[30%]' : 'left-0'
                }`}
            >
              <div
                className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full cursor-pointer"
                onClick={() => {
                  setIsPanelExpanded(false);
                  console.log("Recolher painel");
                }}
              >
                <ChevronLeft className="text-white w-6 h-6" /> {/* Seta para recolher */}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botão para voltar */}
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