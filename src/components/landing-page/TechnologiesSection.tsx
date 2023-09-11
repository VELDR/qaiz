import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  content: string;
  className?: string;
};

const TechTooltip = ({ src, alt, content, className }: Props) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Image
          src={src}
          alt={alt}
          width={75}
          height={75}
          className={`hover:scale-105 ${className}`}
        />
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const TechnologiesSection = () => {
  return (
    <section className="w-full py-7 md:py-16">
      <p className="text-4xl font-bold text-center mb-10 ">Powered By</p>
      <div className="flex flex-row gap-16 mx-4 justify-center flex-wrap md:justify-evenly">
        <TechTooltip
          src="./nextjs.svg"
          alt="Next.js"
          content="Next.js"
          className="dark:invert"
        />
        <TechTooltip
          src="./typescript.svg"
          alt="Typescript"
          content="Typescript"
        />
        <TechTooltip
          src="/shadcn.png"
          alt="Shadcn"
          content="Shadcn"
          className="dark:invert"
        />
        <TechTooltip
          src="./openai.svg"
          alt="Open AI"
          content="Open AI"
          className="dark:invert"
        />
        <TechTooltip src="./tailwind.svg" alt="Tailwind" content="Tailwind" />
        <TechTooltip
          src="./react-query.svg"
          alt="React Query"
          content="React Query"
        />
        <TechTooltip src="/next-auth.png" alt="Next Auth" content="Next Auth" />
        <TechTooltip
          src="./prisma.svg"
          alt="Prisma"
          content="Prisma"
          className="dark:invert"
        />
      </div>
    </section>
  );
};

export default TechnologiesSection;
