import QuizHistory from '@/components/dashboard/QuizHistory';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuthSession } from '@/lib/nextauth';
import { LayoutDashboard } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const session = await getAuthSession();
  return {
    title: `${session?.user.name}'s History - Qaiz`,
  };
}

const HistoryPage = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect('/');
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full md:w-1/2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <Link className={buttonVariants()} href="/dashboard">
              <LayoutDashboard className="mr-2" />
              Dashboard
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-y-scroll">
          <QuizHistory limit={50} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryPage;
