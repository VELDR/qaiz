import { prisma } from '@/lib/db';
import { endQuizValidator } from '@/validator/quiz';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { quizId } = endQuizValidator.parse(body);

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
    });
    if (!quiz) {
      return NextResponse.json(
        {
          message: 'Quiz not found',
        },
        {
          status: 404,
        }
      );
    }
    await prisma.quiz.update({
      where: {
        id: quizId,
      },
      data: {
        timeEnded: new Date(),
      },
    });
    return NextResponse.json({
      message: 'Quiz ended',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
