import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Brain, Hammer } from 'lucide-react';
import Link from 'next/link';

const CraftQuizCard = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold">Craft Your Quiz!</CardTitle>
        <Brain />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Explore what you&apos;re curious about. Create a custom quiz on any
          topic!
        </p>
      </CardContent>
      <Link
        href={'/quiz'}
        className={cn(buttonVariants({ size: 'default' }), 'ml-6 mb-6')}
      >
        <Hammer size={18} className="mr-1" /> Start Crafting
      </Link>
    </Card>
  );
};

export default CraftQuizCard;
