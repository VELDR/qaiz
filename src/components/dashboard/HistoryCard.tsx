'use client';
import { History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

const HistoryCard = () => {
  const router = useRouter();
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
      <Button className="ml-6 mb-6" onClick={() => router.push('/history')}>
        View History
      </Button>
    </Card>
  );
};

export default HistoryCard;
