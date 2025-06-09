import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

export const QuizNavigationSection = ({
  questionIndex,
  totalQuestions,
  submitted,
  isCheckingAnswer,
  isEndingQuiz,
  onBack,
  onNext,
  onSubmit,
}: any) => (
  <div className="flex justify-between items-center">
    <Button
      disabled={isCheckingAnswer || questionIndex === 0}
      onClick={onBack}
      variant="secondary"
      className={questionIndex === 0 ? 'invisible' : 'pl-2'}
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      Previous
    </Button>

    <Button
      disabled={isCheckingAnswer || submitted[questionIndex]}
      onClick={onSubmit}
      className="bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600"
    >
      {(isCheckingAnswer || isEndingQuiz) && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      Submit Answer
    </Button>

    <Button
      disabled={isCheckingAnswer || !submitted[questionIndex]}
      onClick={onNext}
      variant="secondary"
      className={questionIndex === totalQuestions - 1 ? 'invisible' : 'pr-2'}
    >
      Next
      <ChevronRight className="w-4 h-4 ml-1" />
    </Button>
  </div>
);
