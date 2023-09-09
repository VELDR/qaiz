import ResultsCard from '@/components/statistics/ResultsCard';
import QuizCompletionTimeCard from '@/components/statistics/QuizCompletionTimeCard';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { BarChart } from 'lucide-react';
import { redirect } from 'next/navigation';
import QuestionsList from '@/components/statistics/QuestionList';

type Props = {
  params: {
    quizId: string;
  };
};

const StatisticsPage = async ({ params: { quizId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true },
  });
  if (!quiz) {
    return redirect('/quiz');
  }

  let score: number = 0;
  let totalCorrect = quiz.questions.reduce((acc, question) => {
    if (question.isCorrect) {
      return acc + 1;
    }
    return acc;
  }, 0);
  score = (totalCorrect / quiz.questions.length) * 100;

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold flex items-center">
          <BarChart size={30} strokeWidth={3.2} className="mr-1" /> Statistics
        </h1>
      </div>
      <div className="grid gap-4 my-4 md:grid-cols-3">
        <ResultsCard
          score={Math.floor(score)}
          totalCorrect={totalCorrect}
          totalQuestions={quiz.questions.length}
        />
        <QuizCompletionTimeCard
          timeStarted={new Date(quiz.timeStarted ?? 0)}
          timeEnded={new Date(quiz.timeEnded ?? 0)}
          totalQuestions={quiz.questions.length}
        />
      </div>

      <QuestionsList questions={quiz.questions} />
    </main>
  );
};

export default StatisticsPage;
