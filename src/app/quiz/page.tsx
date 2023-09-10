import CreateQuizForm from '@/components/quiz/CreateQuizForm';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    topic?: string;
  };
};

export const metadata = {
  title: 'Quiz - Qaiz',
};

const CreateQuizPage = async ({ searchParams }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect('/');
  }

  return <CreateQuizForm topicParam={searchParams.topic ?? ''} />;
};

export default CreateQuizPage;
