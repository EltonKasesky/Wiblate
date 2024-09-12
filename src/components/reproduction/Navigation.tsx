'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  videoId: string | undefined;
}

export default function BackButton({ videoId }: BackButtonProps) {
  return (
    <div className="absolute top-2 left-2 z-10">
      <Link href={`/intermediate?id=${videoId}`}>
        <ul className='absolute top-4 left-4 m-0 p-0'>
          <li className="prev list-none flex items-center justify-center w-12 h-12 bg-box-bg rounded-full transition duration-500 hover:bg-main-color">
            <ArrowLeft className='text-white w-6 h-6' />
          </li>
        </ul>
      </Link>
    </div>
  );
}
