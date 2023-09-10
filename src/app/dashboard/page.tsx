import CommunityInterestCard from '@/components/dashboard/CommunityInterestCard';
import CraftQuizCard from '@/components/dashboard/CraftQuizCard';
import HistoryCard from '@/components/dashboard/HistoryCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import { getAuthSession } from '@/lib/nextauth';
import { LayoutDashboard } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect('/');
  }
  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold flex items-center">
        <LayoutDashboard size={30} className="mr-1" /> Dashboard
      </h1>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <CraftQuizCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <CommunityInterestCard />
        <RecentActivityCard />
      </div>
    </main>
  );
};

export default Dashboard;
