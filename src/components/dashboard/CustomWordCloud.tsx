'use client';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import WordCloud from 'react-d3-cloud';

type Props = {
  topicWordClouds: { text: string; value: number }[];
};

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const CustomWordCloud = ({ topicWordClouds }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <WordCloud
        data={topicWordClouds}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === 'dark' ? 'white' : 'black'}
        onWordClick={(e, d) => {
          router.push('/quiz?topic=' + d.text);
        }}
        onWordMouseOver={(e, d) => {
          e.target.style.cursor = 'pointer'; // Change cursor to pointer on hover
          e.target.style.opacity = 0.75; // Change opacity to 75% on hover
        }}
        onWordMouseOut={(e, d) => {
          e.target.style.opacity = 1; // Restore opacity to 100% on mouse out
        }}
      />
    </>
  );
};

export default CustomWordCloud;
