'use client';

import { Difficulty, Question } from '@prisma/client';
import {
  AlertCircle,
  CheckCircle,
  FileCheck,
  Info,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import DifficultyLevel from '../DifficultyLevel';
import { Badge } from '@/components/ui/badge';

type Props = {
  questions: Question[];
  topic: string;
  difficulty: Difficulty;
};

const QuizReview = ({ questions, topic, difficulty }: Props) => {
  const answeredQuestions = questions.filter(
    (q) => q.userAnswer !== null
  ).length;
  const correctAnswers = questions.filter((q) => q.isCorrect).length;
  const unansweredQuestions = questions.filter(
    (q) => q.userAnswer === null
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-1">
              Quiz Review
            </CardTitle>
            <FileCheck className="" />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Badge className="bg-accent text-accent-foreground px-3 py-1">
              {topic}
            </Badge>
            <DifficultyLevel difficulty={difficulty} />
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="text-center p-3 rounded-lg bg-secondary/50">
              <div className="text-lg font-bold text-foreground">
                {questions.length}
              </div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="text-lg font-bold text-green-600">
                {correctAnswers}
              </div>
              <div className="text-sm text-green-600/80">Correct</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
              <div className="text-lg font-bold text-red-600">
                {answeredQuestions - correctAnswers}
              </div>
              <div className="text-sm text-red-600/80">Wrong</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted">
              <div className="text-lg font-bold text-muted-foreground">
                {unansweredQuestions}
              </div>
              <div className="text-sm text-muted-foreground">Skipped</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => {
          const {
            answer,
            question: questionText,
            userAnswer,
            isCorrect,
            options,
            explanation,
          } = question;
          const parsedOptions = JSON.parse(options as string) as string[];
          const letters = ['A', 'B', 'C', 'D'];
          const wasAnswered = userAnswer !== null;

          return (
            <Card key={index} className="bg-card border-border overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-lg font-medium text-foreground leading-relaxed">
                        {questionText}
                      </p>

                      <div className="flex-shrink-0">
                        {!wasAnswered ? (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Not Answered
                            </span>
                          </div>
                        ) : isCorrect ? (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Correct</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                            <XCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Incorrect
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                {!wasAnswered ? (
                  /* Unanswered Question Layout */
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      {parsedOptions.map((option, optionIndex) => {
                        const isCorrectAnswer = option === answer;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              isCorrectAnswer
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                : 'bg-secondary border-border'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                  isCorrectAnswer
                                    ? 'bg-green-500 text-white'
                                    : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {letters[optionIndex]}
                              </div>
                              <p
                                className={`flex-1 ${
                                  isCorrectAnswer
                                    ? 'text-green-700 dark:text-green-300 font-medium'
                                    : 'text-foreground'
                                }`}
                              >
                                {option}
                              </p>
                              {isCorrectAnswer && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Answered Question Layout */
                  <div className="grid md:grid-cols-2 gap-3">
                    {parsedOptions.map((option, optionIndex) => {
                      const isCorrectAnswer = option === answer;
                      const isUserAnswer = option === userAnswer;

                      return (
                        <div
                          key={optionIndex}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isCorrectAnswer
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                              : isUserAnswer
                              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                              : 'bg-secondary border-border'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                isCorrectAnswer
                                  ? 'bg-green-500 text-white'
                                  : isUserAnswer
                                  ? 'bg-red-500 text-white'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              {letters[optionIndex]}
                            </div>
                            <p
                              className={`flex-1 ${
                                isCorrectAnswer
                                  ? 'text-green-700 dark:text-green-300 font-medium'
                                  : isUserAnswer
                                  ? 'text-red-700 dark:text-red-300 font-medium'
                                  : 'text-foreground'
                              }`}
                            >
                              {option}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Explanation Section */}
                {explanation && (
                  <div className="mt-4 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-accent">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-accent leading-relaxed">
                        {explanation}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuizReview;
