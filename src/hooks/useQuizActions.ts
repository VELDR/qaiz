import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { z } from 'zod';
import { answerValidator, endQuizValidator } from '@/validator/quiz';
import { Quiz, Question } from '@prisma/client';

type QuizWithQuestions = Quiz & {
  questions: Pick<Question, 'id' | 'question' | 'options'>[];
};

type UseQuizActionsProps = {
  quiz: QuizWithQuestions;
  questionIndex: number;
  selectedOptions: number[];
  submitted: boolean[];
  selectedOptionIsCorrect: (boolean | null)[];
  setSubmitted: (submitted: boolean[]) => void;
  setCorrectAnswers: Dispatch<SetStateAction<number>>;
  setWrongAnswers: Dispatch<SetStateAction<number>>;
  setSelectedOptionIsCorrect: (correct: (boolean | null)[]) => void;
  setHasEnded: (ended: boolean) => void;
  clearQuizStorage: () => void;
};

export const useQuizActions = ({
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
}: UseQuizActionsProps) => {
  const router = useRouter();

  const currentQuestion = useMemo(() => {
    return quiz.questions[questionIndex];
  }, [questionIndex, quiz.questions]);

  const options = useMemo(() => {
    if (!currentQuestion?.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isLoading: isCheckingAnswer } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof answerValidator> = {
        questionId: currentQuestion.id,
        userAnswer: options[selectedOptions[questionIndex]],
      };
      const { data } = await axios.post('/api/validateAnswer', payload);
      return data;
    },
  });

  const { mutate: endQuiz, isLoading: isEndingQuiz } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endQuizValidator> = {
        quizId: quiz.id,
      };
      const { data } = await axios.post('/api/endQuiz', payload);
      return data;
    },
  });

  const { data: quizStatus, isLoading: isCheckingStatus } = useQuery({
    queryKey: ['quizStatus', quiz.id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/quiz/${quiz.id}/status`);
      return data;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  const handleSubmit = useCallback(() => {
    if (submitted[questionIndex] || isCheckingAnswer) return;

    const newSubmitted = [...submitted];
    newSubmitted[questionIndex] = true;
    setSubmitted(newSubmitted);

    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          setCorrectAnswers((prev) => prev + 1);
        } else {
          setWrongAnswers((prev) => prev + 1);
        }

        const newCorrectnessStatus = [...selectedOptionIsCorrect];
        newCorrectnessStatus[questionIndex] = isCorrect;
        setSelectedOptionIsCorrect(newCorrectnessStatus);

        // End quiz if this is the last question
        if (questionIndex === quiz.questions.length - 1) {
          endQuiz(undefined, {
            onSuccess: () => {
              clearQuizStorage();
              setHasEnded(true);
            },
          });
        }
      },
    });
  }, [
    submitted,
    questionIndex,
    isCheckingAnswer,
    checkAnswer,
    setSubmitted,
    setCorrectAnswers,
    setWrongAnswers,
    selectedOptionIsCorrect,
    setSelectedOptionIsCorrect,
    quiz.questions.length,
    endQuiz,
    clearQuizStorage,
    setHasEnded,
  ]);

  const handleExitQuiz = useCallback(() => {
    endQuiz(undefined, {
      onSuccess: () => {
        clearQuizStorage();
        setHasEnded(true);
        router.push('/dashboard');
      },
    });
  }, [endQuiz, clearQuizStorage, setHasEnded, router]);

  return {
    currentQuestion,
    options,
    quizStatus,
    isCheckingStatus,
    isCheckingAnswer,
    isEndingQuiz,
    handleSubmit,
    handleExitQuiz,
  };
};
