import { getAuthSession } from '@/lib/nextauth';
import { createQuizValidator } from '@/validator/quiz';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import axios from 'axios';
import { prisma } from '@/lib/db';

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to create a quiz' },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { topic, amount, difficulty } = createQuizValidator.parse(body);

    const { data } = await axios.post(`${process.env.API_URL}/api/questions`, {
      topic,
      amount,
      difficulty,
    });

    if (!data.questions || data.questions.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to retrieve questions. Please try again.',
        },
        { status: 500 }
      );
    }

    const quiz = await prisma.quiz.create({
      data: {
        userId: session.user.id,
        timeStarted: new Date(),
        topic,
        difficulty,
      },
    });

    // Creates or updates the topicCount
    await prisma.topicCount.upsert({
      where: { topic },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    type mcqQuestion = {
      question: string;
      answer: string;
      explanation: string;
      option1: string;
      option2: string;
      option3: string;
    };

    let questions = data.questions.map((question: mcqQuestion) => {
      let options = [
        question.answer,
        question.option1,
        question.option2,
        question.option3,
      ].sort(() => Math.random() - 0.5);

      return {
        quizId: quiz.id,
        question: question.question,
        answer: question.answer,
        explanation: question.explanation,
        options: JSON.stringify(options),
      };
    });

    await prisma.question.createMany({
      data: questions,
    });

    return NextResponse.json({ quizId: quiz.id }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      console.error('api/quiz error: ', error);
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
    }
  }
};
