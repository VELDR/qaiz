import FeaturesSection from '@/components/landing-page/FeaturesSection';
import Footer from '@/components/landing-page/Footer';
import HeroBanner from '@/components/landing-page/HeroBanner';
import TechnologiesSection from '@/components/landing-page/TechnologiesSection';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect('/dashboard');
  }

  return (
    <div>
      <HeroBanner />
      <FeaturesSection />
      <TechnologiesSection />
      <Footer />
    </div>
  );
}
