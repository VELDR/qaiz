import CraftQuizCard from '@/components/dashboard/CraftQuizCard';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

type Props = {};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect('/');
  }
  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid mt-4 md:grid-cols-2 gap-4">
        <CraftQuizCard />
        <CraftQuizCard />
        <CraftQuizCard />
      </div>
    </main>
  );
};

export default Dashboard;
