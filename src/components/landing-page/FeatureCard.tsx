import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="relative group">
    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-100 group-hover:animate-pulse transition"></div>
    <Card className="relative w-60 h-44">
      <CardHeader className="flex items-center justify-center">
        {icon}
      </CardHeader>
      <CardTitle className="text-center whitespace-nowrap">{title}</CardTitle>
      <CardContent className="text-center mt-2 text-muted-foreground">
        <p className="text-xs">{description}</p>
      </CardContent>
    </Card>
  </div>
);

export default FeatureCard;
