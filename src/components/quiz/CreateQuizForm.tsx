'use client';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useForm } from 'react-hook-form';
import { createQuizValidator } from '@/validator/quiz';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingQuiz from './LoadingQuiz';

type Props = {
  topicParam: string;
};

type Input = z.infer<typeof createQuizValidator>;

const CreateQuizForm = ({ topicParam }: Props) => {
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const {
    mutate: getQuestions,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async ({ amount, topic }: Input) => {
      const response = await axios.post('/api/quiz', {
        amount,
        topic,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(createQuizValidator),
    defaultValues: {
      topic: topicParam,
      amount: 3,
    },
  });

  const onSubmit = (input: Input) => {
    setIsGeneratingQuiz(true);
    getQuestions(
      { amount: input.amount, topic: input.topic },
      {
        onSuccess: ({ quizId }) => {
          setTimeout(() => {
            setFinishedLoading(true);
            router.push(`/quiz/${quizId}`);
          }, 1000);
        },
        onError: () => {
          setIsGeneratingQuiz(false);
          setErrorMessage('Failed creating quiz');
        },
      }
    );
  };

  form.watch();

  if (isGeneratingQuiz) {
    return <LoadingQuiz finishedLoading={finishedLoading} />;
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-fit ">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Craft Your Quiz</CardTitle>
          <CardDescription>Pick a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your quiz topic..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a topic that interests you. Your quiz will be based
                      on this topic.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a number from 1 to 20..."
                        {...field}
                        type="number"
                        max={3}
                        min={1}
                        onChange={(e) =>
                          form.setValue('amount', parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Note: Currently, the max number of questions are 3 due to
                      limitations of Vercel&apos;s Hobby plan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                Create
              </Button>
              {isError && (
                <p className="text-center text-sm text-red-500">
                  {errorMessage}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuizForm;
