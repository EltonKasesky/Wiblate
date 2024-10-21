import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const convertISO8601ToReadable = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  if (!match) return '0m 0s';

  const hours = match[1] ? match[1].replace('H', '') : '0';
  const minutes = match[2] ? match[2].replace('M', '') : '0';
  const seconds = match[3] ? match[3].replace('S', '') : '0';

  return `${hours !== '0' ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
};

const fetchYouTubeDescription = async (
  videoId: string,
  creators: string,
  setVideoTitle: (title: string) => void,
  setVideoCreators: (creators: string) => void,
  setDescription: (description: string) => void,
  setShortDescription: (shortDescription: string) => void,
  setDuration: (duration: string) => void 
) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet,contentDetails`
    );
    const videoData = response.data.items[0];

    if (!videoData) {
      throw new Error(`No data found for video ID: ${videoId}`);
    }

    const title = videoData.snippet.title;
    setVideoTitle(title);
    setVideoCreators(creators);

    const description = videoData.snippet.description;
    setDescription(description);
    setShortDescription(description.length > 300 ? description.slice(0, 300) + '... ' : description);

    const duration = convertISO8601ToReadable(videoData.contentDetails.duration);
    console.log(`Duração do vídeo (ID: ${videoId}): ${duration}`); 
    setDuration(duration); 

  } catch (error) {
    console.error('Error fetching YouTube description:', error);
  }
};

const IntermediateContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const tableName = searchParams.get('tableName') || '';
  const background = typeof window !== 'undefined' ? sessionStorage.getItem('videoBackground') || '' : '';
  const creators = typeof window !== 'undefined' ? sessionStorage.getItem('videoCreators') || '' : '';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCreators, setVideoCreators] = useState('');
  const [duration, setDuration] = useState(''); 

  useEffect(() => {
    if (id && background) {
      fetchYouTubeDescription(id, creators, setVideoTitle, setVideoCreators, setDescription, setShortDescription, setDuration);
    } else {
      console.error('Video ID or background is not set.');
    }
  }, [id, background, creators]);

  return (
    <div className="section min-h-screen flex flex-col justify-center bg-body-bg-light dark:bg-body-bg-dark" id="primary">
      <div className="relative pt-[50%] lg:pt-[50%] lg:h-auto overflow-hidden flex-grow -mt-4">
        <div className="absolute top-0 left-0 w-full h-full">
          {background && (
            <Image
              src={`data:image/jpeg;base64,${background}`}
              alt="Lógica de Nuvem"
              layout="fill"
              objectFit="cover"
              className="absolute top-0 left-0 w-full h-full lg:h-auto"
            />
          )}
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex">
          <div className="relative flex flex-col justify-center w-full lg:w-2/5 lg:pl-20 bg-black bg-opacity-80 lg:bg-opacity-60 p-4 lg:p-0 min-h-full lg:min-h-0">
            <div className="text-white text-3xl lg:text-5xl font-bold leading-none">
              {videoTitle}
            </div>
            <div className="mt-4 lg:mt-8 text-white text-lg lg:text-xl leading-6 item-content-description">
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
            <span className="text-white text-lg lg:text-xl leading-6 item-content-description flex items-center">
              <i className="bx bx-group text-white text-lg lg:text-xl mr-2" /> 
              {videoCreators} 
            </span>
            <span className="text-white text-lg lg:text-xl leading-6 item-content-description flex items-center">
              <i className="bx bx-time text-white text-lg lg:text-xl mr-2" /> 
              {duration} 
            </span>

            <div className="mt-4 lg:mt-8">
              <Link href={`/reproduction?id=${id}&tableName=${tableName}`} className="btn btn-hover uppercase font-bold py-2 px-6 cursor-pointer">
                <i className="bx bx-play bx-flip-vertical text-white text-4xl"></i>
                <span className="relative z-10 text-lg lg:text-xl">Assistir Agora</span>
              </Link>
            </div>
          </div>
          <Link href="/" className="absolute top-4 left-4">
            <button className="flex items-center justify-center w-12 h-12 bg-box-bg rounded-full transition duration-500 hover:bg-main-color">
              <ArrowLeft className='text-white w-6 h-6' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Intermediate = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IntermediateContent />
    </Suspense>
  );
};

export default Intermediate;
