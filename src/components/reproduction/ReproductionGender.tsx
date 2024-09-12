'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function ReproductionGender() {
  const playerRef = useRef<any>(null);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);
  const [isYouTubeAPIReady, setYouTubeAPIReady] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState<boolean>(false);
  
  // Obtendo informações do sessionStorage
  const [adInfo, setAdInfo] = useState<any>({
    logo: sessionStorage.getItem('videoLogo'),
    company_name: sessionStorage.getItem('videoCompany'),
    address: sessionStorage.getItem('videoAddress'),
    phone: sessionStorage.getItem('videoPhone'),
    city: sessionStorage.getItem('videoCity'),
    state: sessionStorage.getItem('videoState'),
    description: sessionStorage.getItem('videoDescription'),
  });

  const router = useRouter();

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
          onStateChange: (event: any) => {
            // Pode adicionar lógica de manipulação de estado aqui
          },
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    }
  }, [isYouTubeAPIReady, videoId]);

  return (
    <div className="relative w-full h-screen">
      <div id="player" className="w-full h-full fixed top-0 left-0"></div>
      
      {/* Painel lateral com as informações do anúncio */}
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
          className={`fixed top-0 left-0 h-full bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 transition-transform duration-[1500ms] ease-in-out ${
            isPanelExpanded ? 'translate-x-0 w-[30%]' : '-translate-x-full w-0'
          }`}
        >
          {/* Conteúdo do painel */}
          {isPanelExpanded && (
            <div className="text-white text-lg space-y-8 mt-[30%]">
              {/* Título "Logo" centralizado */}
              <div className="w-full text-center mb-4">
                {adInfo?.logo && (
                  <div className="flex justify-center pb-4">
                    <img 
                      src={`data:image/jpeg;base64,${adInfo?.logo}`} 
                      alt={adInfo?.company_name} 
                      width={240}
                      height={240}
                    />
                  </div>
                )}
                <h1 className="text-2xl font-bold">{adInfo?.company_name}</h1>
              </div>
              <p>{adInfo?.address}</p>
              <p>{adInfo?.phone}</p>

              {/* Descrição */}
              <p className="text-2xl">{adInfo?.description}</p>
            </div>
          )}
        </div>

        {/* Seta para recolher o painel */}
        {isPanelExpanded && (
          <div
            className={`absolute top-1/2 transition-transform duration-[1500ms] ease-in-out transform -translate-y-1/2 z-50 ${
              isPanelExpanded ? 'left-[30%]' : 'left-0'
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

      {/* Botão para voltar */}
      <div className="absolute top-2 left-2 z-10">
        <Link href={`/events`}>
          <ul className="absolute top-4 left-4 m-0 p-0">
            <li className="prev list-none flex items-center justify-center w-12 h-12 bg-box-bg rounded-full transition duration-500 hover:bg-main-color">
              <ArrowLeft className="text-white w-6 h-6" />
            </li>
          </ul>
        </Link>
      </div>
    </div>
  );
}
