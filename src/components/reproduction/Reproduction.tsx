'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowBigRightDash, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';
import axios from 'axios';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function Reproduction() {
  const [isYouTubeAPIReady, setYouTubeAPIReady] = useState(false);
  const playerRef = useRef<any>(null);
  const mainPlayerRef = useRef<any>(null); 
  const adPlayerRef = useRef<any>(null); 
  const [videoId, setVideoId] = useState<string | undefined>(undefined);
  const [tableName, setTableName] = useState<string | undefined>(undefined);
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shortDescription, setShortDescription] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [adCounter, setAdCounter] = useState<number>(0);
  const router = useRouter();
  const hasSentPostsRef = useRef(false); 
  const [isAdPlayerReady, setIsAdPlayerReady] = useState(false);
  


  const location = 'Petrópolis';
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

  const sendPosts = async (queryId: string, tableName: string) => {
    try {
      await axios.post('/api/videos/watched', { video_id: queryId, tableName: tableName });
      await axios.post('/api/videos/views', { video_id: queryId });
      await axios.post('/api/videos/category/watched/', { category: tableName });
      console.log('Post das tabelas views e watched enviados');
    } catch (error) {
      console.error('Erro ao enviar os posts:', error);
    }
  };

  useEffect(() => {
    const queryId = new URLSearchParams(window.location.search).get('id');
    const tableName = new URLSearchParams(window.location.search).get('tableName');
    setVideoId(queryId || undefined);
    setTableName(tableName || undefined);
    console.log("Video ID set:", queryId);

    if (!hasSentPostsRef.current && queryId) {
      sendPosts(queryId, tableName || '');
      hasSentPostsRef.current = true;
    }
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
      mainPlayerRef.current = new window.YT.Player('mainPlayer', {
        videoId: videoId,
        playerVars: { autoplay: 1, modestbranding: 1, rel: 0 },
        events: {
          onStateChange: handleMainPlayerStateChange,
          onReady: (event: any) => {
            const videoDuration = event.target.getDuration();
            generateAdTimes(videoDuration);
            event.target.playVideo();
          },
        },
      });
  
      adPlayerRef.current = new window.YT.Player('adPlayer', {
        playerVars: { autoplay: 1, modestbranding: 1, rel: 0 },
        events: {
          onStateChange: handleAdPlayerStateChange,
          onReady: (event: any) => {
            console.log("Ad player is ready:", event.target);
            adPlayerRef.current = event.target; 
            setIsAdPlayerReady(true);  
          },
        },
      });
  
      console.log("adPlayerRef initialized:", adPlayerRef.current);
    }
  }, [isYouTubeAPIReady, videoId]);
  
  
  

  const handleMainPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      console.log("Main video ended");
    }
  };

  const handleAdPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      console.log("Ad ended, switching back to main video");
      setIsAdPlaying(false);
      continueMainVideo();
    }
  };

  

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
    console.log("adPlayerRef current state:", adPlayerRef.current);
  }, [location]);

  const handleStateChange = (event: any) => {
    console.log("Player state changed:", event.data);
    if (isAdPlaying && event.data === window.YT.PlayerState.ENDED) {
      console.log("Ad ended, continuing main video");
    }
  };

  const generateAdTimes = (duration: number) => {
    const adInterval = 60; 
    const times: number[] = [];
    for (let time = adInterval; time < duration; time += adInterval) {
      times.push(time);
    }
    setAdTimes(times);
    console.log("Generated ad times:", times);
  };

  const checkForAd = (currentTime: number) => {
    console.log('checando anuncios')
    if (adTimes.includes(currentTime) && mainPlayerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING) {
      const remainingTime = mainPlayerRef.current.getDuration() - currentTime;
  
      if (remainingTime >= 120) {
        if (isAdPlayerReady && adPlayerRef.current?.loadVideoById) {
          console.log("Playing ads at time:", currentTime);
          playAds(currentTime, mainPlayerRef, adPlayerRef, adVideos);
        } else {
          console.log("Ad player ainda não está pronto. Tentando novamente em 1 segundo.");
          setTimeout(() => {
            checkForAd(currentTime);
          }, 1000);
        }
      } else {
        console.log("Not enough time left for ads.");
      }
    }
  };
  
  

const searchOnYouTube = async (location: string) => {
  try {
    const searchQuery = `${location} noticias recentes`;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchQuery}&key=${API_KEY}`
    );
    const videoId = response.data.items[0]?.id?.videoId;
    if (videoId) {
      console.log("Playing YouTube search result video:", videoId);
      adPlayerRef.current.loadVideoById(videoId);
    }
  } catch (error) {
    console.error("Error fetching YouTube search results:", error);
  }
};


const playAds = (
  startAdTime: number,
  mainPlayerRef: React.RefObject<any>,
  adPlayerRef: React.RefObject<any>,
  adVideos: string[]
) => {
  console.log("Iniciando playAds... isAdPlayerReady:", isAdPlayerReady);

  if (mainPlayerRef?.current && adPlayerRef?.current && isAdPlayerReady) {
    if (typeof adPlayerRef.current.loadVideoById !== 'function') {
      console.error("O método loadVideoById não está disponível no adPlayerRef.current.");
      return;
    }

    const adDuration = 10;
    const adsPlayed: string[] = [];
    let videosPlayedCount = 0;
    const maxAds = 5;
    const totalDbVideos = 3;

    const playNextAd = async () => {
      console.log("Reproduzindo próximo anúncio, vídeos reproduzidos até agora:", videosPlayedCount);

      // Se já foram reproduzidos 5 anúncios, retomar o vídeo principal
      if (videosPlayedCount >= maxAds) {
        console.log("Todos os anúncios foram reproduzidos, voltando ao vídeo principal.");
        setTimeout(() => {
          continueMainVideo(startAdTime);
        }, adDuration * 1000); // Voltar para o vídeo principal após o último anúncio
        return;
      }

      // Primeiros 3 anúncios são dos vídeos do banco de dados
      if (videosPlayedCount < totalDbVideos) {
        const selectedAdId = adVideos[videosPlayedCount]; // Seleciona vídeo do banco de dados
        adsPlayed.push(selectedAdId);
        setSelectedAdId(selectedAdId);
        setIsAdPlaying(true);
        console.log("Reproduzindo anúncio do banco de dados com ID:", selectedAdId);

        adPlayerRef.current.loadVideoById(selectedAdId);

        setTimeout(() => {
          console.log("Concluído anúncio com ID:", selectedAdId);
          videosPlayedCount++;
          playNextAd();
        }, adDuration * 1000);
      }

      // O 4º anúncio é um vídeo do YouTube
      else if (videosPlayedCount === totalDbVideos) {
        console.log("Realizando busca no YouTube para o vídeo de pesquisa.");
        await searchOnYouTube(location);
        setTimeout(() => {
          console.log("Concluído vídeo de pesquisa do YouTube.");
          videosPlayedCount++;
          playNextAd();
        }, adDuration * 1000);
      }

      // O 5º anúncio é novamente um dos vídeos do banco de dados
      else if (videosPlayedCount === totalDbVideos + 1) {
        const randomAdId = adsPlayed[Math.floor(Math.random() * adsPlayed.length)];
        console.log("Reproduzindo um dos vídeos já reproduzidos do banco de dados:", randomAdId);

        adPlayerRef.current.loadVideoById(randomAdId);

        setTimeout(() => {
          console.log("Concluído anúncio final com ID:", randomAdId);
          videosPlayedCount++;

          // Aqui já é o último anúncio, então não chamamos `playNextAd`, vamos diretamente para o vídeo principal
          setTimeout(() => {
            console.log("Voltando ao vídeo principal.");
            continueMainVideo(startAdTime);
          }, adDuration * 1000);
        }, adDuration * 1000);
      }
    };

    if (mainPlayerRef?.current) {
      console.log("Pausando o vídeo principal.");
      mainPlayerRef.current.pauseVideo();
    } else {
      console.error("Referência do player principal não está pronta.");
    }

    playNextAd();
  } else {
    console.error("Player principal ou player de anúncios não está pronto. isAdPlayerReady:", isAdPlayerReady);
  }
};







const continueMainVideo = (startAdTime?: number) => {
  if (mainPlayerRef.current) {
    setIsAdPlaying(false);
    mainPlayerRef.current.playVideo();
  }
};

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setTimeout(() => setShowSkipButton(true), 300);
      return null;
    }

    return <div className="text-white text-sm">{remainingTime}s</div>;
  };

  useEffect(() => {
    const desc = adInfo?.description || '';
    setDescription(desc);
    setShortDescription(desc.length > 200 ? `${desc.slice(0, 200)}... ` : desc);
  }, [adInfo]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        setIsPanelExpanded(true);  
      }
      if (event.key === 'ArrowLeft') {
        setIsPanelExpanded(false); 
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Main Video Player */}
      <div id="mainPlayer" className="w-full h-full fixed top-0 left-0"></div>
      
      {/* Ad Video Player */}
      <div id="adPlayerContainer" className={`w-full h-full fixed top-0 left-0 ${isAdPlaying ? 'block' : 'hidden'}`}>
        <div id="adPlayer" className="w-full h-full"></div> {/* Player de Anúncios */}
        
        {/* Painel para os anúncios e informações */}
        <div>
          {!isPanelExpanded && (
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50 transition-all duration-[1500ms] ease-in-out">
              <div
                className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full cursor-pointer"
                onClick={() => {
                  setIsPanelExpanded(true);
                  console.log("Expandir painel");
                }}
              >
                <ChevronRight className="text-white w-6 h-6" />
              </div>
            </div>
          )}
  
          {/* Painel que cobre 30% da tela quando expandido */}
          <div
            className={`fixed top-0 left-0 h-full bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 transition-transform duration-[1500ms] ease-in-out ${isPanelExpanded ? 'translate-x-0 w-[30%]' : '-translate-x-full w-0'}`}
          >
            {isPanelExpanded && adInfo && (
              <div className="text-white text-lg space-y-8 mt-[30%]">
                {adInfo.length > 0 && selectedAdId && (
                  (() => {
                    const currentAd = adInfo.find((ad: { id_youtube: string }) => ad.id_youtube === selectedAdId);
                    return currentAd ? (
                      <>
                        <div className="w-full text-center mb-4">
                          {currentAd.logo && (
                            <div className="flex justify-center pb-4">
                              <img
                                src={`data:image/jpeg;base64,${currentAd?.logo}`}
                                alt={currentAd?.company_name}
                                width={240}
                                height={240}
                              />
                            </div>
                          )}
                          <h1 className="text-2xl font-bold">{currentAd?.company_name}</h1>
                        </div>
  
                        <div className="flex space-x-4 text-center justify-center">
                          {adInfo?.instagram && adInfo.instagram !== 'undefined' && (
                            <Link href={adInfo.instagram} target="_blank" rel="noopener noreferrer">
                              <div className="bg-white rounded-full p-1 -mt-5">
                                <Image
                                  src="/images/reproduction/insta.png"
                                  alt="Instagram"
                                  width={64}
                                  height={64}
                                  className="cursor-pointer"
                                />
                              </div>
                            </Link>
                          )}
                          {adInfo?.ifood && adInfo.ifood !== 'undefined' && (
                            <Link href={adInfo.ifood} target="_blank" rel="noopener noreferrer">
                              <div className="bg-white rounded-full p-1 -mt-5">
                                <Image
                                  src="/images/reproduction/ifood.png"
                                  alt="iFood"
                                  width={64}
                                  height={64}
                                  className="cursor-pointer"
                                />
                              </div>
                            </Link>
                          )}
                        </div>
  
                        <p>{currentAd.address}</p>
                        <p>{currentAd.phone}</p>
  
                        <div className="mt-4 lg:mt-8 text-white text-lg lg:text-xl leading-6 item-content-description">
                          <div className="text-xl hidden lg:block">{currentAd.description}</div>
                          <div className="block lg:hidden">
                            {shortDescription}
                            {currentAd.description.length > 300 && (
                              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                  <button className="text-blue-500">...ler mais</button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Descrição Completa</DialogTitle>
                                  </DialogHeader>
                                  <DialogDescription>{currentAd.description}</DialogDescription>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <p>Nenhuma informação disponível para o anúncio.</p>
                    );
                  })()
                )}
              </div>
            )}
          </div>
  
          {/* Seta para recolher no fim do painel */}
          {isPanelExpanded && (
            <div className={`absolute top-1/2 transition-transform duration-[1500ms] ease-in-out transform -translate-y-1/2 z-50 ${isPanelExpanded ? 'left-[30%]' : 'left-0'}`}>
              <div
                className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full cursor-pointer"
                onClick={() => {
                  setIsPanelExpanded(false);
                  console.log("Recolher painel");
                }}
              >
                <ChevronLeft className="text-white w-6 h-6" />
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Botão para voltar */}
      <div className="absolute top-2 left-2 z-10">
        <div onClick={() => router.back()}>
          <ul className='absolute top-4 left-4 m-0 p-0'>
            <li className="prev list-none flex items-center justify-center w-12 h-12 bg-box-bg rounded-full transition duration-500 hover:bg-main-color">
              <ArrowLeft className='text-white w-6 h-6' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );  
  

}