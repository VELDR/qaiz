'use client';

import { Question } from '@prisma/client';
import { FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
type Props = {
  questions: Question[];
};

const QuizReview = ({ questions }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Quiz Review 📝</CardTitle>
        <FileCheck />
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
    // <Table className="mt-4">
    //   <TableHeader>
    //     <TableRow>
    //       <TableHead className="w-[10px]">No.</TableHead>
    //       <TableHead>Question</TableHead>
    //       <TableHead>Correct Answer</TableHead>
    //       <TableHead>Your Answer</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody>
    //     <>
    //       {questions.map(
    //         ({ answer, question, userAnswer, isCorrect }, index) => {
    //           return (
    //             <TableRow key={index}>
    //               <TableCell className="font-medium">{index + 1}</TableCell>
    //               <TableCell>{question}</TableCell>
    //               <TableCell>
    //                 <span className="font-semibold">{answer}</span>
    //               </TableCell>
    //               <TableCell
    //                 className={`${
    //                   isCorrect ? 'text-green-600' : 'text-red-600'
    //                 } font-semibold`}
    //               >
    //                 {userAnswer}
    //               </TableCell>
    //             </TableRow>
    //           );
    //         }
    //       )}
    //     </>
    //   </TableBody>
    // </Table>
  );
};

export default QuizReview;
