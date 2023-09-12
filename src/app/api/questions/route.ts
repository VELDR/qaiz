import { strict_output } from '@/lib/gpt';
import { createQuizValidator } from '@/validator/quiz';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const POST = async (req: Request, res: Response) => {
  try {
    // const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: 'You must be logged in to create a quiz' },
    //     { status: 401 }
    //   );
    // }
    const body = await req.json();
    const { amount, topic } = createQuizValidator.parse(body);

    let questions = await strict_output(
      'Generate multiple-choice questions (MCQs) with concise answers (under 15 words each) at a moderate difficulty level.',
      new Array(amount).fill(
        `You are to generate a random multiple choice question about ${topic}`
      ),
      {
        question: 'question',
        answer: 'answer with max length of 15 words',
        option1: '1st option with max length of 15 words',
        option2: '2nd option with max length of 15 words',
        option3: '3rd option with max length of 15 words',
      }
    );

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      // For logs purpose
      console.log('api/questions error: ', error);
      return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
      );
    }
  }
};
