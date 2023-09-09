import { Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type Props = {
  score: number;
  totalCorrect: number;
  totalQuestions: number;
};

const ResultsCard = ({ score, totalCorrect, totalQuestions }: Props) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-2xl font-bold">Results ✨</CardTitle>
        <Medal />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center">
        <p
          className={`text-7xl font-bold ${
            score >= 80
              ? 'text-green-500'
              : score >= 50
              ? 'text-yellow-500'
              : 'text-red-500'
          }`}
        >
          {score}
        </p>
        <p
          className={`text-2xl font-semibold ${
            score >= 80
              ? 'text-green-500'
              : score >= 50
              ? 'text-yellow-500'
              : 'text-red-500'
          }`}
        >
          {score == 100
            ? '🏆Ace!🏆'
            : score >= 80
            ? '🌟Brilliant!🌟'
            : score >= 50
            ? 'Not Bad!👍'
            : 'Practice Makes Perfect!💪'}
        </p>
        <p className="text-sm text-muted-foreground">
          You answered <span className="font-bold">{totalCorrect}</span> out of{' '}
          <span className="font-bold">{totalQuestions}</span> correctly!
        </p>
      </CardContent>
    </Card>
  );
};

export default ResultsCard;
