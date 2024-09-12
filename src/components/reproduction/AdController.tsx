import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ArrowBigRightDash } from 'lucide-react';

interface AdControlProps {
  isAdPlaying: boolean;
  showSkipButton: boolean;
  onSkip: () => void;
}

export default function AdControl({ isAdPlaying, showSkipButton, onSkip }: AdControlProps) {
  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      return null;
    }
    return <div className="text-white text-sm">{remainingTime}s</div>;
  };

  return isAdPlaying ? (
    <div className="absolute bottom-4 right-4 p-2 mb-8">
      {!showSkipButton ? (
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
      ) : (
        <button
          className="flex items-center space-x-2 bg-white text-black rounded-full p-2 transition-opacity duration-300 ease-in-out opacity-100 hover:bg-gray-200"
          onClick={onSkip}
        >
          <span>Pular</span>
          <ArrowBigRightDash />
        </button>
      )}
    </div>
  ) : null;
}
