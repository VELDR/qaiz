import { cn } from '@/lib/utils';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import Providers from '@/components/Providers';
import NextNProgressClient from '@/components/NextNProgressClient';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Qaiz - Quiz Your Curiosity!',
  description:
    'Unleash your inner explorer with AI-generated quizzes on Qaiz. Test your knowledge, learn something new, and fuel your curiosity!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased min-h-screen')}>
        <Providers>
          <Navbar />
          <NextNProgressClient />
          {children}
          <SpeedInsights />
          <Analytics />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
