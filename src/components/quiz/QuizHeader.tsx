import DifficultyLevel from '@/components/DifficultyLevel';
import MCQCounter from '@/components/quiz/MCQCounter';
import { Badge } from '@/components/ui/badge';
import { Timer } from 'lucide-react';

export const QuizHeader = ({
  quiz,
  timeElapsed,
  correctAnswers,
  wrongAnswers,
}: any) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="space-y-2">
      <div className="flex items-center gap-3 flex-wrap">
        <Badge variant="default" className="px-3 py-1">
          {quiz.topic}
        </Badge>
        <DifficultyLevel difficulty={quiz.difficulty} />
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Timer className="w-4 h-4" />
        <span className="text-sm font-medium">Time elapsed:</span>
        <span className="font-mono text-sm" suppressHydrationWarning>
          {timeElapsed}
        </span>
      </div>
    </div>
    <MCQCounter correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
  </div>
);
