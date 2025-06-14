import { prisma } from '@/lib/db';
import { answerValidator } from '@/validator/quiz';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { questionId, userAnswer } = answerValidator.parse(body);
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }
    const isCorrect =
      question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();

    await prisma.question.update({
      where: { id: questionId },
      data: {
        userAnswer,
        isCorrect,
      },
    });

    return NextResponse.json({ isCorrect }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
    }
  }
};
