'use client';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

type Prop = {
  text: string;
  className?: string;
  showArrow: boolean;
};

const LoginButton = ({ text, className, showArrow }: Prop) => {
  return (
    <Button
      onClick={() => signIn('google').catch(console.error)}
      className={`${className ? className : ''}`}
    >
      {text}
      {showArrow && <ArrowRight size={20} className="ml-1" />}
    </Button>
  );
};

export default LoginButton;
