import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ExitQuizDialog = ({ open, onOpenChange, onConfirmExit }: any) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Stop Quiz?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to stop the quiz? Your progress will be saved,
          but you won&apos;t be able to restart this quiz.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => onOpenChange(false)}>
          Continue Quiz
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirmExit}
          className={cn(buttonVariants({ variant: 'destructive' }))}
        >
          Stop Quiz
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
