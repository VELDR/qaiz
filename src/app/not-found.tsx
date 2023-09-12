import { Home } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-7xl xl:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 drop-shadow-glow">
          404
        </h1>
        <p className="text-xl font-medium m-6">
          We couldn&apos;t find the page that you&apos;re looking for
        </p>
        <Link
          href="/"
          className="py-2 px-4 rounded-md text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-75"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
