import { prisma } from '@/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import dynamic from 'next/dynamic';

const CustomWordCloud = dynamic(
  () => {
    return import('./CustomWordCloud');
  },
  { ssr: false }
);

const CommunityInterestCard = async () => {
  const topics = await prisma.topicCount.findMany({});
  const topicWordClouds = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  });
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Community Interests
        </CardTitle>

        <CardDescription>
          🔍 Explore the topics that light up our community! 🧐 Discover what
          everyone&apos;s buzzing about and dive into the 🔥 hottest
          discussions. Click on a topic to start a quiz on it.
        </CardDescription>
      </CardHeader>
      <CardContent className="border-4 rounded-md border-primary mx-8">
        <CustomWordCloud topicWordClouds={topicWordClouds} />
      </CardContent>
    </Card>
  );
};

export default CommunityInterestCard;
