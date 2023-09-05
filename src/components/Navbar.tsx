import { getAuthSession } from '@/lib/nextauth';

import LoginButton from './LoginButton';
import UserAccountNav from './UserAccountNav';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();

  return (
    <div className="sticky inset-x-0 top-0 z-10 bg-white dark:bg-gray-950 border-b border-slate-400 py-2">
      <div className="flex items-center justify-between px-8 mx-auto max-w-7xl">
        <Logo />
        <div className="flex items-center">
          <ThemeToggle className="mr-3" />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <LoginButton text="Login" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
