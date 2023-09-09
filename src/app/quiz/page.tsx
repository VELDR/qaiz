import CreateQuizForm from '@/components/quiz/CreateQuizForm';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

type Props = {};

export const metadata = {
  title: 'Quiz - Qaiz',
};

const CreateQuizPage = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect('/');
  }

  return (
    <div>
      <CreateQuizForm />
    </div>
  );
};

export default CreateQuizPage;
