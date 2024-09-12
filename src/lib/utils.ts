import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const playAd = (playerRef, location, setMainVideoCurrentTime, setIsAdPlaying, setShowSkipButton, setAdTimes) => (adTime: number) => {
  if (playerRef.current && location) {
    const currentTime = playerRef.current.getCurrentTime();
    console.log("Current main video time:", currentTime);
    setMainVideoCurrentTime(currentTime);
    setIsAdPlaying(true);
    setShowSkipButton(false);

    const adVideos: Record<string, string[]> = {
      Petrópolis: ['VKcgPMt392s', 'wswJmXNiDFo'],
      'Rio de Janeiro': ['JCAC_pWfUys', 'wUEFbwTNHsA'],
      Haarlem: ['uuO3zpK17KM'],
    };

    const cityAds = adVideos[location.city] || ['defaultAdId'];
    const selectedAdId = cityAds[Math.floor(Math.random() * cityAds.length)];

    console.log("Location:", location.city);
    console.log("Available ads:", cityAds);
    console.log("Selected ad ID:", selectedAdId);

    playerRef.current.loadVideoById(selectedAdId);

    setAdTimes((prevAdTimes: number[]) =>
      prevAdTimes.filter((time: number) => time !== adTime)
    );
  } else {
    console.error("Location or player not available.");
  }
};
