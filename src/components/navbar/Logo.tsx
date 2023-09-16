import Link from 'next/link';

const Logo = () => {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-200 group-hover:duration-200"></div>
      <div className="relative px-2 py-1 bg-white dark:bg-slate-900 ring-1 ring-gray-900/5 rounded-xl flex border-2 border-black dark:border-white active:translate-y-1 shadow-[4.0px_4.0px_4.0px_rgba(0,0,0,0.38)] ">
        <Link
          href="/"
          className="block text-black dark:text-white transition duration-200 "
        >
          <div className="font-bold text-xl">
            <span>Q</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              AI
            </span>
            <span>Z</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Logo;
