import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import QuizHistory from './QuizHistory';

const RecentActivityCard = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  const quizCount = await prisma.quiz.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activity</CardTitle>
        <CardDescription>
          You&apos;ve completed <span className="font-bold">{quizCount}</span>{' '}
          {'quiz' + (quizCount !== 1 ? 'zes' : '')} so far.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[550px] overflow-x-hidden overflow-y-auto">
        <QuizHistory limit={10} userId={session.user.id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
