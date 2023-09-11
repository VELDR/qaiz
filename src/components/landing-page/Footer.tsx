import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <Link
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-opacity-75"
            >
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-opacity-75"
            >
              Blog
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="#"
              className="text-base leading-6 text-gray-500 hover:opacity-75"
            >
              Team
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="#"
              className="text-base leading-6 text-gray-500 hover:opacity-75"
            >
              Pricing
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="#"
              className="text-base leading-6 text-gray-500 hover:opacity-75"
            >
              Contact
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="#"
              className="text-base leading-6 text-gray-500 hover:text-opacity-75"
            >
              Terms
            </Link>
          </div>
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          <Link
            href="https://www.linkedin.com/in/melvern-ardell/"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Linked In</span>
            <Linkedin />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <Instagram />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <Twitter />
          </Link>
          <Link
            href="https://github.com/VELDR"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">GitHub</span>
            <Github />
          </Link>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2023 Melvern Ardell. All rights reserved.
        </p>
        <div className="flex justify-center">
          <Link
            href="https://storyset.com/people"
            className="text-base leading-6 text-gray-400 underline hover:opacity-75"
          >
            People illustrations by Storyset
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
