import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export const QuestionCard = ({
  questionIndex,
  totalQuestions,
  question,
}: any) => (
  <Card className="border-0 bg-secondary">
    <CardHeader className="p-4">
      <CardTitle className="flex items-center gap-4 text-lg leading-relaxed">
        <div className="border-4 border-muted-foreground text-muted-foreground rounded-md px-2 py-1 text-3xl diagonal-fractions mr-2">
          <span>
            {questionIndex + 1}/{totalQuestions}
          </span>
        </div>
        <p className="text-muted-foreground">{question}</p>
      </CardTitle>
    </CardHeader>
  </Card>
);
