import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const OptionsSection = ({
  options,
  selectedOptions,
  questionIndex,
  selectedOptionIsCorrect,
  submitted,
  onOptionSelect,
}: any) => {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="space-y-3">
      {options.map((option: string, index: number) => {
        const isSelected = selectedOptions[questionIndex] === index;
        const isCorrectOption =
          selectedOptionIsCorrect[questionIndex] === true && isSelected;
        const isWrongOption =
          selectedOptionIsCorrect[questionIndex] === false && isSelected;
        const isSelectedButNotAnswered =
          isSelected && selectedOptionIsCorrect[questionIndex] === null;

        return (
          <Card
            key={index}
            className={cn(
              'transition-all duration-200 cursor-pointer border-2',
              isSelectedButNotAnswered && 'border-accent',
              isCorrectOption &&
                'border-lime-500 bg-lime-50 dark:bg-lime-900/20',
              isWrongOption && 'border-red-500 bg-red-50 dark:bg-red-900/20',
              !isSelected && !submitted[questionIndex] && 'border-muted',
              submitted[questionIndex] && 'cursor-default'
            )}
            onClick={() => onOptionSelect(index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors',
                    isSelectedButNotAnswered &&
                      'bg-gradient-to-br from-purple-600 to-pink-600 text-white',
                    isCorrectOption && 'bg-lime-500 text-white',
                    isWrongOption && 'bg-red-500 text-white',
                    !isSelected && 'bg-secondary text-secondary-foreground'
                  )}
                >
                  {letters[index]}
                </div>
                <p
                  className={cn(
                    'flex-1 text-primary',
                    isCorrectOption &&
                      'text-lime-800 dark:text-lime-200 font-medium',
                    isWrongOption &&
                      'text-red-800 dark:text-red-200 font-medium',
                    isSelected && 'font-bold'
                  )}
                >
                  {option}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
