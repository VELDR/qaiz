import { Check, X } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Card } from '../ui/card';

type Props = {
  correctAnswers: number;
  wrongAnswers: number;
};

const MCQCounter = ({ correctAnswers, wrongAnswers }: Props) => {
  const total = correctAnswers + wrongAnswers;
  const scorePercentage =
    total > 0 ? Math.round((correctAnswers / total) * 100) : 0;
  const circumference = 2 * Math.PI * 18; // Circle radius is 18
  const strokeDashoffset =
    circumference - (scorePercentage / 100) * circumference;

  return (
    <Card className="flex items-center justify-center gap-4 px-4 py-3 border-0 bg-secondary">
      {/* Correct Answers */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-lime-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-semibold text-lime-600 dark:text-lime-400 min-w-[1.5rem] text-center">
          {correctAnswers}
        </span>
      </div>

      {/* Circular Progress */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 44 44">
          {/* Background circle */}
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-accent"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-primary">
            {scorePercentage}%
          </span>
        </div>
      </div>

      {/* Wrong Answers */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-red-600 dark:text-red-400 min-w-[1.5rem] text-center">
          {wrongAnswers}
        </span>
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
          <X className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
      </div>
    </Card>
  );
};
export default MCQCounter;
