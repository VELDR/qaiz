import MCQ from '@/components/quiz/MCQ';
import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/nextauth';
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    quizId: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const quiz = await fetchQuiz(params.quizId);
  return {
    title: `${quiz?.topic} - Qaiz`,
  };
}

const fetchQuiz = async (quizId: string) => {
  return await prisma.quiz.findUnique({
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
};

const QuizPage = async ({ params: { quizId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  const quiz = await fetchQuiz(quizId);
  if (!quiz) {
    return redirect('/quiz');
  }
  return <MCQ quiz={quiz} />;
};

export default QuizPage;
