import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { Question, Quiz } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';
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
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Recent Activity</Link>
        </CardTitle>
        <CardDescription>
          You have played a total of{' '}
          <span className="font-bold">{quizCount}</span>{' '}
          {'quiz' + (quizCount !== 1 ? 'zes' : '')}.
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-scroll max-h-[550px]">
        <QuizHistory limit={10} userId={session.user.id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;