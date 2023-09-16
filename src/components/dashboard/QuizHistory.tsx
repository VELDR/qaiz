import { prisma } from '@/lib/db';
import { formatTime } from '@/lib/utils';
import { Question, Quiz } from '@prisma/client';
import { differenceInSeconds } from 'date-fns';
import { CalendarDays, HelpCircle, Timer } from 'lucide-react';
import Link from 'next/link';
import DifficultyLevel from '../DifficultyLevel';

type Props = {
  limit: number;
  userId: string;
};

type joinedQuiz = Quiz & {
  questions: Pick<Question, 'question' | 'isCorrect'>[];
};

const QuizHistory = async ({ limit, userId }: Props) => {
  const quizzes = await prisma.quiz.findMany({
    where: { userId },
    include: { questions: true },
    take: limit,
    orderBy: { timeStarted: 'desc' },
  });

  const getScore = (quiz: joinedQuiz) => {
    let totalCorrect = quiz.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return (totalCorrect / quiz.questions.length) * 100;
  };

  return (
    <div className="space-y-8">
      {quizzes.map((quiz) => {
        const score = getScore(quiz);
        return (
          <div key={quiz.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <p
                className={`text-2xl font-bold w-11 ${
                  score >= 80
                    ? 'text-green-500'
                    : score >= 50
                    ? 'text-yellow-500'
                    : 'text-red-500'
                }`}
              >
                {Math.floor(score)}
              </p>

              <div className="ml-4 space-y-1">
                <div className="flex space-x-2">
                  <Link
                    className="text-base font-medium text-center leading-none px-2 py-1 text-white rounded-lg w-fit bg-slate-800 hover:underline hover:opacity-75"
                    href={`/statistics/${quiz.id}`}
                  >
                    {quiz.topic}
                  </Link>
                  <DifficultyLevel
                    difficulty={quiz.difficulty}
                    textStyle="text-xs"
                    size={10}
                    showText={false}
                  />
                </div>
                <p className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {new Date(quiz.timeEnded ?? 0).toLocaleDateString()} -{'  '}
                  <Timer className="w-4 h-4 mx-1" />
                  {formatTime(
                    differenceInSeconds(quiz.timeEnded!, quiz.timeStarted)
                  )}
                </p>

                <p className="flex items-center text-xs text-muted-foreground">
                  <HelpCircle className="w-4 h-4 mr-1" />
                  {quiz.questions.length}{' '}
                  {quiz.questions.length === 1 ? 'question' : 'questions'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizHistory;
