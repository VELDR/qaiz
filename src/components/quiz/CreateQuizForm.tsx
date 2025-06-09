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
import { useToast } from '../ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Hammer } from 'lucide-react';
import DifficultyLevel from '../DifficultyLevel';

type Props = {
  topicParam: string;
};

type Input = z.infer<typeof createQuizValidator>;

const CreateQuizForm = ({ topicParam }: Props) => {
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync: validateTopic, isLoading: isValidating } = useMutation({
    mutationFn: async (topic: string) => {
      const response = await axios.post('/api/validate-topic', { topic });
      return response.data;
    },
  });

  const { mutateAsync: getQuestions } = useMutation({
    mutationFn: async ({ amount, topic, difficulty }: Input) => {
      const response = await axios.post('/api/quiz', {
        amount,
        topic,
        difficulty,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(createQuizValidator),
    defaultValues: {
      topic: topicParam,
      amount: 3,
      difficulty: 'beginner',
    },
  });

  const onSubmit = async (input: Input) => {
    try {
      const validationResult = await validateTopic(input.topic);

      setIsGeneratingQuiz(true);

      const quizResult = await getQuestions({
        ...input,
        topic: validationResult.normalizedTopic,
      });

      setTimeout(() => {
        setFinishedLoading(true);
        router.push(`/quiz/${quizResult.quizId}`);
      }, 1000);
    } catch (error: any) {
      setIsGeneratingQuiz(false);

      if (error.response?.status === 400 && error.response?.data?.reason) {
        toast({
          title: 'Invalid Topic',
          variant: 'destructive',
          description: error.response.data.reason,
        });
      } else {
        toast({
          title: 'Quiz Generation Failed',
          variant: 'destructive',
          description:
            'Unable to generate quiz questions. Please try again with a different topic or check your internet connection.',
        });
      }
    }
  };

  form.watch();

  if (isGeneratingQuiz) {
    return <LoadingQuiz finishedLoading={finishedLoading} />;
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-fit xl:w-1/3 ">
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
                    <FormLabel>No. of questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a number from 1 to 20..."
                        {...field}
                        type="number"
                        max={20}
                        min={1}
                        onChange={(e) =>
                          form.setValue('amount', parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Note: Try reducing the amount of questions if it fails to
                      generate.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">
                          <DifficultyLevel
                            difficulty="beginner"
                            divStyle="w-10"
                          />
                        </SelectItem>
                        <SelectItem value="intermediate">
                          <DifficultyLevel
                            difficulty="intermediate"
                            divStyle="w-10"
                          />
                        </SelectItem>
                        <SelectItem value="expert">
                          <DifficultyLevel
                            difficulty="expert"
                            divStyle="w-10"
                          />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isValidating}
                type="submit"
                className="w-full md:w-auto"
              >
                <Hammer size={18} className="mr-1" />
                {isValidating ? 'Validating...' : 'Craft'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuizForm;
