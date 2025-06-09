import { useState, useEffect } from 'react';

type UseQuizNavigationProps = {
  isQuizCompleted: boolean;
  hasEnded: boolean;
  submitted: boolean[];
  selectedOptions: number[];
  quizId: string;
};

export const useQuizNavigation = ({
  isQuizCompleted,
  hasEnded,
  submitted,
  selectedOptions,
  quizId,
}: UseQuizNavigationProps) => {
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(`quiz_${quizId}_isStarted`);
    return saved ? JSON.parse(saved) : false;
  });

  // Check if quiz has started
  useEffect(() => {
    const hasStarted =
      submitted.some(Boolean) ||
      selectedOptions.some((option) => option !== -1);

    if (hasStarted !== isQuizStarted) {
      setIsQuizStarted(hasStarted);

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `quiz_${quizId}_isStarted`,
          JSON.stringify(hasStarted)
        );
      }
    }
  }, [submitted, selectedOptions, isQuizStarted, quizId]);

  // Handle browser navigation prevention
  useEffect(() => {
    if (isQuizCompleted || hasEnded) return;

    const handlePopState = (e: PopStateEvent) => {
      if (isQuizStarted) {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        setShowExitDialog(true);
      }
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isQuizStarted, hasEnded, isQuizCompleted]);

  return {
    showExitDialog,
    setShowExitDialog,
    isQuizStarted,
  };
};
