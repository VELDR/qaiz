import MCQCounter from '@/components/quiz/MCQCounter';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BarChart } from 'lucide-react';
import Link from 'next/link';

export const QuizEndedScreen = ({
  quiz,
  correctAnswers,
  wrongAnswers,
  completionTime,
}: any) => (
  <div className="min-h-[90vh] flex items-center justify-center p-4">
    <Card className="max-w-md flex flex-col gap-6 w-full text-center p-8 shadow-2xl border-0 dark:bg-secondary">
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-2xl font-bold">Quiz Completed!</h2>
        <p className="text-sm">Completed in {completionTime}</p>
      </div>
      <MCQCounter correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
      <Link
        href={`/statistics/${quiz.id}`}
        className={cn(buttonVariants({ size: 'lg' }), 'w-full')}
      >
        <BarChart className="w-4 h-4 mr-2" />
        View Detailed Statistics
      </Link>
    </Card>
  </div>
);
