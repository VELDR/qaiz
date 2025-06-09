import { cn } from '@/lib/utils';
import { History } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const HistoryCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <History />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Review your past quizzes to see what you&apos;ve learned and where you
          can improve.
        </p>
      </CardContent>
      <Link
        href={'/history'}
        className={cn(buttonVariants({ size: 'default' }), 'ml-6 mb-6')}
      >
        View History
      </Link>
    </Card>
  );
};

export default HistoryCard;
