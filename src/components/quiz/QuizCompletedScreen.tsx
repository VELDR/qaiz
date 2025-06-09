import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BarChart, Trophy } from 'lucide-react';
import Link from 'next/link';

export const QuizCompletedScreen = ({ quiz }: any) => (
  <div className="min-h-[90vh] flex items-center justify-center p-4">
    <Card className="max-w-md w-full text-center p-8 shadow-2xl border-0 dark:bg-secondary">
      <div className="mb-6">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Quiz Already Completed</h2>
        <p className="text-muted-foreground">
          You have already completed this quiz. You can view your results or
          return to the dashboard.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Link
          href={`/statistics/${quiz.id}`}
          className={cn(buttonVariants({ size: 'lg' }), 'w-full')}
        >
          <BarChart className="w-4 h-4 mr-2" />
          View Results
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'w-full'
          )}
        >
          Return to Dashboard
        </Link>
      </div>
    </Card>
  </div>
);
