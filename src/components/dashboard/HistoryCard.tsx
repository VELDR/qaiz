import { History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const HistoryCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <History />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Go back in time to review 📜 your quiz achievements and challenges!
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
