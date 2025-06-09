import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Progress } from '../ui/progress';
import { useTheme } from 'next-themes';

type Props = { finishedLoading: boolean };

const loadingTexts = [
  '⚙️ Generating questions',
  '📝 Creating your quiz',
  '🔍 Finding good questions',
  '⏳ Almost ready',
  '🎯 Putting together your quiz',
  '📚 Preparing questions',
];

const LoadingQuiz = ({ finishedLoading }: Props) => {
  const [progress, setProgress] = useState(10);
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const loadingImageGif = isDarkMode
    ? '/loading-dark.gif'
    : '/loading-light.gif';

  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finishedLoading) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [finishedLoading]);

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
      <Image src={loadingImageGif} width={400} height={400} alt="loading" />
      <Progress value={progress} className="w-full mt-4" />
      <h1 className="mt-2 text-xl">
        {loadingText}
        <span className="tracking-widest animate-pulse">...</span>
      </h1>
    </div>
  );
};

export default LoadingQuiz;
