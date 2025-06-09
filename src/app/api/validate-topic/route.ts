import { validateTopic } from '@/lib/gemini';
import { capitalizeString } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const validateTopicSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { topic } = validateTopicSchema.parse(body);

    const normalizedTopic = capitalizeString(topic);
    const validation = await validateTopic(normalizedTopic);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Invalid topic',
          reason: validation.reason,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        isValid: true,
        normalizedTopic,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Topic validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate topic' },
      { status: 500 }
    );
  }
};
