import { Difficulty } from '@prisma/client';
import { Sparkle } from 'lucide-react';

type Props = {
  difficulty: Difficulty;
  textStyle?: string;
  divStyle?: string;
  size?: number;
  showText?: boolean;
};

const DifficultyLevel = ({
  difficulty,
  textStyle,
  divStyle,
  size,
  showText = true,
}: Props) => {
  const starColors = {
    beginner: 'green-500',
    intermediate: 'yellow-500',
    expert: 'red-600',
  };

  const starCount = {
    beginner: 1,
    intermediate: 2,
    expert: 3,
  };

  const stars = Array.from({ length: starCount[difficulty] }, (_, index) => (
    <Sparkle key={index} size={size || 14} />
  ));

  return (
    <div
      className={`flex flex-row items-center text-${starColors[difficulty]}`}
    >
      <div className={`${divStyle} mr-2 flex flex-row`}>{stars}</div>
      {showText && (
        <p className={textStyle}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </p>
      )}
    </div>
  );
};

export default DifficultyLevel;
