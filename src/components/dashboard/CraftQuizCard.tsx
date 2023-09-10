'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Hammer } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CraftQuizCard = () => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">Craft Your Quiz!</CardTitle>

        <Brain />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Dive into your interests! 🚀✨ Craft a topic-based multiple-choice
          quiz! 📚🧠
        </p>
      </CardContent>
      <Button className="ml-6 mb-6" onClick={() => router.push('/quiz')}>
        <Hammer size={18} className="mr-1" /> Start Crafting
      </Button>
    </Card>
  );
};

export default CraftQuizCard;
