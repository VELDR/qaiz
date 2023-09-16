'use client';
import { Question, Quiz } from '@prisma/client';
import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Timer,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import { answerValidator, endQuizValidator } from '@/validator/quiz';
import { cn, formatTime } from '@/lib/utils';
import { differenceInSeconds } from 'date-fns';
import MCQCounter from './MCQCounter';
import Link from 'next/link';
import DifficultyLevel from '../DifficultyLevel';

type Props = {
  quiz: Quiz & { questions: Pick<Question, 'id' | 'question' | 'options'>[] };
};

type AnswerValidator = z.infer<typeof answerValidator>;

const MCQ = ({ quiz }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(quiz.questions.length).fill(0)
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [now, setNow] = useState(new Date());
  const [submitted, setSubmitted] = useState(
    new Array(quiz.questions.length).fill(false)
  );
  const [selectedOptionIsCorrect, setSelectedOptionIsCorrect] = useState(
    Array(quiz.questions.length).fill(null)
  );

  const currentQuestion = useMemo(() => {
    return quiz.questions[questionIndex];
  }, [questionIndex, quiz.questions]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: AnswerValidator = {
        questionId: currentQuestion.id,
        userAnswer: options[selectedOptions[questionIndex]],
      };
      const { data } = await axios.post('/api/validateAnswer', payload);
      return data;
    },
  });

  const { mutate: endQuiz } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endQuizValidator> = {
        quizId: quiz.id,
      };
      const { data } = await axios.post(`/api/endQuiz`, payload);
      return data;
    },
  });

  const handleNext = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    setQuestionIndex((prev) => prev - 1);
  };

  const handleSubmit = useCallback(() => {
    if (!submitted[questionIndex]) {
      if (isChecking) return;

      submitted[questionIndex] = true;

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

          // Check if all questions have been submitted
          if (submitted.every((value) => value === true)) {
            endQuiz();
            setHasEnded(true); // All questions have been submitted
          }
        },
      });
    }
  }, [
    submitted,
    checkAnswer,
    isChecking,
    questionIndex,
    selectedOptionIsCorrect,
    endQuiz,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSubmit, questionIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap ">
          You completed in{' '}
          {formatTime(differenceInSeconds(now, quiz.timeStarted))}
        </div>
        <div className="flex justify-center my-4">
          <MCQCounter
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
          />
        </div>
        <Link
          href={`/statistics/${quiz.id}`}
          className={cn(buttonVariants({ size: 'lg' }), 'mt-2')}
        >
          View Statistics
          <BarChart strokeWidth={2.5} className="ml-2" />
        </Link>
      </div>
    );
  }

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-1/2">
      <div className="flex flex-col space-y-2 md:flex-row md:justify-between">
        <div className="flex flex-col">
          <div className="flex space-x-2">
            <p className="px-2 py-1 text-white rounded-lg bg-slate-800 mb-2 w-fit">
              {quiz.topic}
            </p>
            <DifficultyLevel difficulty={quiz.difficulty} />
          </div>
          <div className="flex self-start text-slate-400">
            <Timer className="mr-1" />
            <span className="mr-2">Time elapsed:</span>
            <span suppressHydrationWarning>
              {formatTime(differenceInSeconds(now, quiz.timeStarted))}
            </span>
          </div>
        </div>
        <MCQCounter
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
        />
      </div>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="flex items-center mr-5 ">
            <div className="border-4 border-slate-800 dark:border-slate-200 rounded-md px-2 py-1 text-3xl diagonal-fractions mr-2">
              <span>{questionIndex + 1}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-400">{quiz.questions.length}</span>
            </div>
            <p>{currentQuestion.question}</p>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          const isSelected = selectedOptions[questionIndex] === index;
          const isCorrectOption =
            selectedOptionIsCorrect[questionIndex] === true && isSelected;
          const isWrongOption =
            selectedOptionIsCorrect[questionIndex] === false && isSelected;

          return (
            <Button
              key={index}
              disabled={submitted[questionIndex]}
              className={`w-full py-8 mb-4 justify-start ${
                isCorrectOption
                  ? 'bg-[green] text-white'
                  : isWrongOption
                  ? 'bg-[red] text-white'
                  : ''
              }`}
              variant={
                selectedOptions[questionIndex] === index
                  ? 'default'
                  : 'secondary'
              }
              onClick={() => {
                const newSelectedOptions = [...selectedOptions];
                newSelectedOptions[questionIndex] = index;
                setSelectedOptions(newSelectedOptions);
              }}
            >
              <div className="flex items-center">
                <div className="py-2 px-3 mr-5 rounded-md font-bold">
                  {letters[index]}
                </div>
              </div>

              <div className="text-start">{option}</div>
            </Button>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <Button
          disabled={isChecking}
          onClick={() => handleBack()}
          className={`pl-1 ${questionIndex === 0 ? 'invisible' : ''}`}
        >
          <ChevronLeft /> Back
        </Button>

        <Button
          disabled={isChecking || submitted[questionIndex]}
          onClick={() => handleSubmit()}
          className="bg-[green]"
        >
          {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Submit
        </Button>

        <Button
          disabled={isChecking}
          onClick={() => handleNext()}
          className={`pr-1 ${
            questionIndex === quiz.questions.length - 1 ? 'invisible' : ''
          }`}
        >
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
