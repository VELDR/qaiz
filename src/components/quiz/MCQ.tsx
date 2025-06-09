'use client';
import { Question, Quiz } from '@prisma/client';

import { useEffect, useState } from 'react';
import { formatTime } from '@/lib/utils';
import { differenceInSeconds } from 'date-fns';

import LoadingPage from '@/components/LoadingPage';
import { useQuizState } from '@/hooks/useQuizState';
import { useQuizActions } from '@/hooks/useQuizActions';
import { useQuizNavigation } from '@/hooks/useQuizNavigation';
import { QuizCompletedScreen } from '@/components/quiz/QuizCompletedScreen';
import { QuizEndedScreen } from '@/components/quiz/QuizEndedScreen';
import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { OptionsSection } from '@/components/quiz/OptionsSection';
import { QuizNavigationSection } from '@/components/quiz/QuizNavigationSection';
import { ExitQuizDialog } from '@/components/quiz/ExitQuizDialog';

type Props = {
  quiz: Quiz & { questions: Pick<Question, 'id' | 'question' | 'options'>[] };
};

const MCQ = ({ quiz }: Props) => {
  const [now, setNow] = useState(new Date());

  const quizState = useQuizState(quiz);
  const {
    questionIndex,
    setQuestionIndex,
    selectedOptions,
    setSelectedOptions,
    correctAnswers,
    setCorrectAnswers,
    wrongAnswers,
    setWrongAnswers,
    submitted,
    setSubmitted,
    selectedOptionIsCorrect,
    setSelectedOptionIsCorrect,
    hasEnded,
    setHasEnded,
    clearQuizStorage,
  } = quizState;

  const {
    currentQuestion,
    options,
    quizStatus,
    isCheckingStatus,
    isCheckingAnswer,
    isEndingQuiz,
    handleSubmit,
    handleExitQuiz,
  } = useQuizActions({
    quiz,
    questionIndex,
    selectedOptions,
    submitted,
    selectedOptionIsCorrect,
    setSubmitted,
    setCorrectAnswers,
    setWrongAnswers,
    setSelectedOptionIsCorrect,
    setHasEnded,
    clearQuizStorage,
  });

  const { showExitDialog, setShowExitDialog } = useQuizNavigation({
    isQuizCompleted: quizStatus?.isCompleted,
    hasEnded,
    submitted,
    selectedOptions,
    quizId: quiz.id,
  });

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') handleSubmit();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit]);

  // Navigation handlers
  const handleNext = () => {
    if (submitted[questionIndex]) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setQuestionIndex((prev) => prev - 1);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!submitted[questionIndex]) {
      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions[questionIndex] = optionIndex;
      setSelectedOptions(newSelectedOptions);
    }
  };

  if (isCheckingStatus) return <LoadingPage />;

  if (quizStatus?.isCompleted) return <QuizCompletedScreen quiz={quiz} />;

  if (hasEnded) {
    return (
      <QuizEndedScreen
        quiz={quiz}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        completionTime={formatTime(differenceInSeconds(now, quiz.timeStarted))}
      />
    );
  }

  return (
    <>
      <div className="p-4">
        <div className="max-w-4xl flex flex-col mx-auto gap-4">
          <QuizHeader
            quiz={quiz}
            timeElapsed={formatTime(differenceInSeconds(now, quiz.timeStarted))}
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
          />

          <QuestionCard
            questionIndex={questionIndex}
            totalQuestions={quiz.questions.length}
            question={currentQuestion.question}
          />

          <OptionsSection
            options={options}
            selectedOptions={selectedOptions}
            questionIndex={questionIndex}
            selectedOptionIsCorrect={selectedOptionIsCorrect}
            submitted={submitted}
            onOptionSelect={handleOptionSelect}
          />

          <QuizNavigationSection
            questionIndex={questionIndex}
            totalQuestions={quiz.questions.length}
            submitted={submitted}
            isCheckingAnswer={isCheckingAnswer}
            isEndingQuiz={isEndingQuiz}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <ExitQuizDialog
        open={showExitDialog}
        onOpenChange={setShowExitDialog}
        onConfirmExit={handleExitQuiz}
      />
    </>
  );
};

export default MCQ;
