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
    const { topic, amount } = createQuizValidator.parse(body);
    const quiz = await prisma.quiz.create({
      data: {
        userId: session.user.id,
        timeStarted: new Date(),
        topic,
      },
    });
    const { data } = await axios.post(`${process.env.API_URL}/api/questions `, {
      topic,
      amount,
    });
    console.log(data);
    type mcqQuestion = {
      question: string;
      answer: string;
      option1: string;
      option2: string;
      option3: string;
    };
    /**
     * Data format:
     * questions: [{question, answer, option1, option2, option3}]
     */
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
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
};
