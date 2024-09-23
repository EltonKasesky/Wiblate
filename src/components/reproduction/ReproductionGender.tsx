'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shortDescription, setShortDescription] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [adInfo, setAdInfo] = useState<any>({
    logo: sessionStorage.getItem('videoLogo'),
    company_name: sessionStorage.getItem('videoCompany'),
    address: sessionStorage.getItem('videoAddress'),
    phone: sessionStorage.getItem('videoPhone'),
    city: sessionStorage.getItem('videoCity'),
    state: sessionStorage.getItem('videoState'),
    description: sessionStorage.getItem('videoDescription'),
    instagram: sessionStorage.getItem('videoInstagram'),
    ifood: sessionStorage.getItem('videoIfood'),
  });

  useEffect(() => {
    const desc = adInfo?.description || '';
    setDescription(desc);
    setShortDescription(desc.length > 200 ? `${desc.slice(0, 200)}... ` : desc);
  }, [adInfo]);

  const router = useRouter();

  useEffect(() => {
    const queryId = new URLSearchParams(window.location.search).get('id');
    setVideoId(queryId || undefined);
    console.log('Video ID set:', queryId);
  }, []);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        console.log('YouTube API script loaded');
      }
    };

    window.onYouTubeIframeAPIReady = () => {
      console.log('YouTube API is ready');
      setYouTubeAPIReady(true);
    };

    if (window.YT && window.YT.Player) {
      console.log('YouTube API already available');
      setYouTubeAPIReady(true);
    } else {
      loadYouTubeAPI();
    }
  }, []);

  useEffect(() => {
    if (isYouTubeAPIReady && videoId) {
      console.log('Initializing YouTube player with video ID:', videoId);
      playerRef.current = new window.YT.Player('player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: (event: any) => { },
          onReady: (event: any) => {
            event.target.playVideo();
          },
        },
      });
    }
  }, [isYouTubeAPIReady, videoId]);

  // Lógica para pausar e despausar o vídeo
  useEffect(() => {
    if (isPanelExpanded && playerRef.current) {
      playerRef.current.pauseVideo();
    } else if (!isPanelExpanded && playerRef.current) {
      playerRef.current.playVideo();
    }
  }, [isPanelExpanded]);

  useEffect(() => {
    console.log('adInfo:', adInfo);
  }, [adInfo]);


  return (
    <div className="relative w-full h-screen">
      <div id="player" className="w-full h-full fixed top-0 left-0"></div>

      {/* Painel lateral com as informações do anúncio */}
      <div>
        {!isPanelExpanded && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-50 transition-all duration-[1500ms] ease-in-out">
            <div
              className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full cursor-pointer"
              onClick={() => {
                setIsPanelExpanded(true);
                console.log('Expandir painel');
              }}
            >
              <ChevronRight className="text-white w-6 h-6" />
            </div>
          </div>
        )}

        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 bg-opacity-70 backdrop-blur-md p-6 transition-transform duration-[1500ms] ease-in-out ${isPanelExpanded ? 'translate-x-0 w-[30%]' : '-translate-x-full w-0'
            }`}
        >
          {isPanelExpanded && (
            <div className="text-white text-lg space-y-8 mt-[30%]">
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
              <div className="flex space-x-4 text-center justify-center">
                {/* Verificar se o valor é válido e não é a string "undefined" */}
                {adInfo?.instagram && adInfo.instagram !== 'undefined' ? (
                  <Link href={adInfo.instagram} target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/images/reproduction/insta.png"
                      alt="Instagram"
                      width={64}
                      height={64}
                      className="cursor-pointer"
                    />
                  </Link>
                ) : null}

                {adInfo?.ifood && adInfo.ifood !== 'undefined' ? (
                  <Link href={adInfo.ifood} target="_blank" rel="noopener noreferrer">
                    <Image
                      src="/images/reproduction/ifood.png"
                      alt="iFood"
                      width={64}
                      height={64}
                      className="cursor-pointer"
                    />
                  </Link>
                ) : null}
              </div>
              <p>{adInfo?.address}</p>
              <p>{adInfo?.phone}</p>

              {/* Descrição */}
              <div className="mt-4 lg:mt-8 text-white text-lg lg:text-xl leading-6 item-content-description">
                {/* Exibir a descrição completa em telas grandes */}
                <div className="text-xl hidden lg:block">{description}</div>

                {/* Exibir a descrição curta em telas pequenas */}
                <div className="block lg:hidden">
                  {shortDescription}
                  {description.length > 300 && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="text-blue-500">...ler mais</button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Descrição Completa</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>{description}</DialogDescription>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seta para recolher o painel */}
        {isPanelExpanded && (
          <div
            className={`absolute top-1/2 transition-transform duration-[1500ms] ease-in-out transform -translate-y-1/2 z-50 ${isPanelExpanded ? 'left-[30%]' : 'left-0'
              }`}
          >
            <div
              className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full cursor-pointer"
              onClick={() => {
                setIsPanelExpanded(false);
                console.log('Recolher painel');
              }}
            >
              <ChevronLeft className="text-white w-6 h-6" />
            </div>
          </div>
        )}
      </div>

      {/* Botão para voltar */}
      <div className="absolute top-2 left-2 z-10">
        <div onClick={() => router.back()}>
          <ul className="absolute top-4 left-4 m-0 p-0 cursor-pointer">
            <li className="w-12 h-12 flex justify-center items-center bg-black bg-opacity-60 rounded-full">
              <ArrowLeft className="w-6 h-6 text-white" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
