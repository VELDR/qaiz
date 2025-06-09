import FeatureCard from './FeatureCard';
import { Archive, BarChart, BrainCog, Flame, Timer } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="w-full bg-primary-foreground py-7 md:py-16">
      <p className="text-4xl font-bold text-center mb-10 ">Features</p>

      <div className="flex flex-row flex-wrap justify-center mx-6 gap-8">
        <FeatureCard
          icon={<BrainCog size={50} />}
          title="Smart Quizzes"
          description="AI-generated quizzes based on topics of your choice."
        />
        <FeatureCard
          icon={<Timer size={50} />}
          title="Race Against Time"
          description="Challenge yourself with timed quizzes."
        />
        <FeatureCard
          icon={<BarChart size={50} />}
          title="Quiz Insights"
          description="See which questions you got right and wrong."
        />
        <FeatureCard
          icon={<Archive size={50} />}
          title="Quiz Archive"
          description="Keep track of your quiz journey."
        />
        <FeatureCard
          icon={<Flame size={50} />}
          title="Hot Topics"
          description="Explore trending quiz topics."
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
