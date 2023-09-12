'use client';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import WordCloud from 'react-d3-cloud';

type Props = {
  topicWordClouds: { text: string; value: number }[];
};

const CustomWordCloud = ({ topicWordClouds }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const fontSizeMapper = useCallback(
    (word: { value: number }) => Math.log2(word.value) * 5 + 25,
    []
  );
  const rotate = useCallback((word: { value: number }) => word.value % 360, []);

  return (
    <>
      <WordCloud
        data={topicWordClouds}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={rotate}
        padding={10}
        fill={theme.theme === 'dark' ? 'white' : 'black'}
        onWordClick={(e, d) => {
          router.push('/quiz?topic=' + d.text);
        }}
        onWordMouseOver={(e, d) => {
          e.target.style.cursor = 'pointer';
          e.target.style.opacity = 0.5;
        }}
        onWordMouseOut={(e, d) => {
          e.target.style.opacity = 1;
        }}
      />
    </>
  );
};

export default CustomWordCloud;
