import LoginButton from '@/components/LoginButton';
import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect('/dashboard');
  }

  return (
    <div>
      <h1>Landing page</h1>
      <LoginButton text="Login with Google" />
    </div>
  );
}
