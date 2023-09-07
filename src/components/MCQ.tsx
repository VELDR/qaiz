'use client';
import { Question, Quiz } from '@prisma/client';
import { ChevronRight, Loader2, Timer } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import { answerValidator } from '@/validator/form/quiz';

type Props = {
  quiz: Quiz & { questions: Pick<Question, 'id' | 'question' | 'options'>[] };
};

type AnswerValidator = z.infer<typeof answerValidator>;

const MCQ = ({ quiz }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  const currentQuestion = useMemo(() => {
    return quiz.questions[questionIndex];
  }, [questionIndex, quiz.questions]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: AnswerValidator = {
        questionId: currentQuestion.id,
        userAnswer: options[selectedOption],
      };
      const { data } = await axios.post('/api/validateAnswer', payload);
      return data;
    },
  });

  const handleNext = useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          setCorrectAnswers((prev) => prev + 1);
        } else {
          setWrongAnswers((prev) => prev + 1);
        }
        if (questionIndex === quiz.questions.length - 1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
    });
  }, [checkAnswer, isChecking, questionIndex, quiz.questions.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case '1':
          setSelectedOption(0);
          break;
        case '2':
          setSelectedOption(1);
          break;
        case '3':
          setSelectedOption(2);
          break;
        case '4':
          setSelectedOption(3);
          break;
        case 'Enter':
          handleNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext]);

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  if (hasEnded) {
    return;
  }

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-auto">
      <div className="flex flex-row justify-between">
        <p>
          <span className="text-slate-400 mr-3">Topic:</span>
          <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
            {quiz.topic}
          </span>
        </p>
        <div className="flex self-start text-slate-400">
          <Timer className="mr-2" />
          <span>00:00</span>
        </div>
      </div>
      <Card className="w-full mt-4">
        <CardHeader>
          <CardTitle className="flex items-center mr-5 text-center">
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
          return (
            <Button
              key={index}
              className="w-full py-8 mb-4 justify-start"
              variant={selectedOption === index ? 'default' : 'secondary'}
              onClick={() => setSelectedOption(index)}
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
        {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        <Button disabled={isChecking} onClick={() => handleNext()}>
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
