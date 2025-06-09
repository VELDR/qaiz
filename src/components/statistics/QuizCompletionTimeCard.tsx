import { Hourglass, Timer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatTime } from '@/lib/utils';
import { differenceInSeconds } from 'date-fns';

type Props = {
  timeEnded: Date;
  timeStarted: Date;
  totalQuestions: number;
};

const QuizCompletionTimeCard = ({
  timeEnded,
  timeStarted,
  totalQuestions,
}: Props) => {
  const totalTimeInSeconds = differenceInSeconds(timeEnded, timeStarted);
  const averageTimePerQuestion = totalQuestions
    ? totalTimeInSeconds / totalQuestions
    : 0;

  const fastAverageTimePerQuestionThreshold = 15; // 15 secs per question is fast ⚡
  const averageTimePerQuestionThreshold = 30; //30 secs per question is average

  let completionMessage = '';

  if (averageTimePerQuestion < fastAverageTimePerQuestionThreshold) {
    completionMessage = 'Wow, that was fast! ⚡';
  } else if (averageTimePerQuestion < averageTimePerQuestionThreshold) {
    completionMessage = 'Good job! Keep up the pace! ⏰';
  } else {
    completionMessage = "No need to rush, you're in control.";
  }

  return (
    <Card className="md:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Completion Time</CardTitle>
        <Hourglass />
      </CardHeader>
      <CardContent className="flex flex-col items-start">
        <div className="flex items-center px-4 py-2 bg-green-500 rounded-md mt-2 space-x-2">
          <Timer />
          <p className="font-semibold text-sm text-white whitespace-nowrap">
            {formatTime(totalTimeInSeconds)}
          </p>
        </div>
        <p className="font-semibold mt-2">{completionMessage}</p>
        <p className="text-sm text-muted-foreground mt-2">
          You averaged in{' '}
          <span className="font-bold">
            {formatTime(averageTimePerQuestion)}
          </span>{' '}
          per question.
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizCompletionTimeCard;
