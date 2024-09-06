import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const fetchYouTubeDescription = async (videoId: string, creators: string, setVideoTitle: (title: string) => void, setVideoCreators: (creators: string) => void, setDescription: (description: string) => void, setShortDescription: (shortDescription: string) => void) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`
    );
    const videoData = response.data.items[0];

    if (!videoData) {
      throw new Error(`No data found for video ID: ${videoId}`);
    }

    const title = videoData.snippet.title;
    setVideoTitle(title);
    setVideoCreators(`Criadores: ${creators}`);

    const description = videoData.snippet.description;
    setDescription(description);
    setShortDescription(description.length > 300 ? description.slice(0, 300) + '... ' : description);

  } catch (error) {
    console.error('Error fetching YouTube description:', error);
  }
};

const IntermediateContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const background = typeof window !== 'undefined' ? sessionStorage.getItem('videoBackground') || '' : '';
  const creators = typeof window !== 'undefined' ? sessionStorage.getItem('videoCreators') || '' : '';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCreators, setVideoCreators] = useState('');

  useEffect(() => {
    if (id && background) {
      fetchYouTubeDescription(id, creators, setVideoTitle, setVideoCreators, setDescription, setShortDescription);
    } else {
      console.error('Video ID or background is not set.');
    }
  }, [id, background, creators]);

  return (
    <div className="section min-h-screen flex flex-col justify-center" id="primary">
      <div className="relative pt-[50%] lg:pt-[50%] lg:h-auto overflow-hidden flex-grow">
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
            <span className="text-white text-lg lg:text-xl leading-6 item-content-description">
              {videoCreators}
            </span>

            <div className="mt-4 lg:mt-8">
              <Link href={`/reproduction?id=${id}`} className="btn btn-hover uppercase font-bold py-2 px-6 cursor-pointer">
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
