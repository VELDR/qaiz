import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if quiz with given ID is completed
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json({
    isCompleted: quiz?.timeEnded !== null,
  });
}
