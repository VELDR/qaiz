import { useState, useEffect, useCallback } from 'react';
import { Quiz, Question } from '@prisma/client';

type QuizWithQuestions = Quiz & {
  questions: Pick<Question, 'id' | 'question' | 'options'>[];
};

export const useQuizState = (quiz: QuizWithQuestions) => {
  // Initialize state from localStorage or defaults
  const [questionIndex, setQuestionIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem(`quiz_${quiz.id}_questionIndex`);
    return saved ? parseInt(saved) : 0;
  });

  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (typeof window === 'undefined')
      return Array(quiz.questions.length).fill(-1);
    const saved = localStorage.getItem(`quiz_${quiz.id}_selectedOptions`);
    return saved ? JSON.parse(saved) : Array(quiz.questions.length).fill(-1);
  });

  const [correctAnswers, setCorrectAnswers] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem(`quiz_${quiz.id}_correctAnswers`);
    return saved ? parseInt(saved) : 0;
  });

  const [wrongAnswers, setWrongAnswers] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem(`quiz_${quiz.id}_wrongAnswers`);
    return saved ? parseInt(saved) : 0;
  });

  const [submitted, setSubmitted] = useState(() => {
    if (typeof window === 'undefined')
      return Array(quiz.questions.length).fill(false);
    const saved = localStorage.getItem(`quiz_${quiz.id}_submitted`);
    return saved ? JSON.parse(saved) : Array(quiz.questions.length).fill(false);
  });

  const [selectedOptionIsCorrect, setSelectedOptionIsCorrect] = useState(() => {
    if (typeof window === 'undefined')
      return Array(quiz.questions.length).fill(null);
    const saved = localStorage.getItem(`quiz_${quiz.id}_correctness`);
    return saved ? JSON.parse(saved) : Array(quiz.questions.length).fill(null);
  });

  const [hasEnded, setHasEnded] = useState(false);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `quiz_${quiz.id}_questionIndex`,
        questionIndex.toString()
      );
    }
  }, [questionIndex, quiz.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `quiz_${quiz.id}_selectedOptions`,
        JSON.stringify(selectedOptions)
      );
    }
  }, [selectedOptions, quiz.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `quiz_${quiz.id}_correctAnswers`,
        correctAnswers.toString()
      );
    }
  }, [correctAnswers, quiz.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `quiz_${quiz.id}_wrongAnswers`,
        wrongAnswers.toString()
      );
    }
  }, [wrongAnswers, quiz.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `quiz_${quiz.id}_submitted`,
        JSON.stringify(submitted)
      );
    }
  }, [submitted, quiz.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        `quiz_${quiz.id}_correctness`,
        JSON.stringify(selectedOptionIsCorrect)
      );
    }
  }, [selectedOptionIsCorrect, quiz.id]);

  // Clear localStorage when quiz ends
  const clearQuizStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('quiz')) {
          localStorage.removeItem(key);
        }
      }
    }
  }, []);

  return {
    questionIndex,
    setQuestionIndex,
    selectedOptions,
    setSelectedOptions,
    correctAnswers,
    setCorrectAnswers,
    wrongAnswers,
    setWrongAnswers,
    submitted,
    setSubmitted,
    selectedOptionIsCorrect,
    setSelectedOptionIsCorrect,
    hasEnded,
    setHasEnded,
    clearQuizStorage,
  };
};
