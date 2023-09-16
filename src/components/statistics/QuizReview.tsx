'use client';

import { Difficulty, Question } from '@prisma/client';
import { FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import DifficultyLevel from '../DifficultyLevel';

type Props = {
  questions: Question[];
  topic: string;
  difficulty: Difficulty;
};

const QuizReview = ({ questions, topic, difficulty }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-col ">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Quiz Review 📝</CardTitle>
          <FileCheck />
        </div>

        <span className="px-2 py-1 text-white rounded-lg bg-slate-800 w-fit">
          {topic}
        </span>

        <DifficultyLevel difficulty={difficulty} />
      </CardHeader>
      <CardContent>
        {questions.map(
          ({ answer, question, userAnswer, isCorrect, options }, index) => {
            const parsedOptions = JSON.parse(options as string) as string[];
            const letters = ['A', 'B', 'C', 'D'];
            return (
              <div key={index}>
                <p className="font-semibold">
                  {index + 1}. {question}
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-8">
                  {parsedOptions.map((option, optionIndex) => {
                    const isAnswer = option === answer;
                    const isUserAnswer =
                      userAnswer !== null && option === userAnswer;

                    return (
                      <div
                        key={optionIndex}
                        className={`rounded-md p-3 ${
                          isAnswer
                            ? 'bg-green-500'
                            : isUserAnswer
                            ? 'bg-red-500'
                            : 'bg-secondary'
                        }`}
                      >
                        <p>
                          {letters[optionIndex]}. {option}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        )}
      </CardContent>
    </Card>
  );
};

export default QuizReview;
