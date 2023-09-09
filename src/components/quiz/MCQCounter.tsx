import { Check, X } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Card } from '../ui/card';

type Props = {
  correctAnswers: number;
  wrongAnswers: number;
};

const MCQCounter = ({ correctAnswers, wrongAnswers }: Props) => {
  return (
    <Card className="flex items-center justify-center p-2 border-4">
      <Check color="lime" />
      <span className="mx-2 text-[lime]">{correctAnswers}</span>
      <Separator orientation="vertical" className="border-2" />
      <span className="mx-2 text-[red]">{wrongAnswers}</span>
      <X color="red" />
    </Card>
  );
};

export default MCQCounter;
