import MCQ from '@/components/quiz/MCQ';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    quizId: string;
  };
};

const QuizPage = async ({ params: { quizId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        },
      },
    },
  });
  if (!quiz) {
    return redirect('/quiz');
  }
  return <MCQ quiz={quiz} />;
};

export default QuizPage;
