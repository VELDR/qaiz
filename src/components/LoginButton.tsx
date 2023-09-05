'use client';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

type Prop = {
  text: string;
};

const LoginButton = ({ text }: Prop) => {
  return (
    <Button onClick={() => signIn('google').catch(console.error)}>
      {text}
    </Button>
  );
};

export default LoginButton;
