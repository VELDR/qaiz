# Qaiz - Self-paced Learning Platform

Qaiz is a self-paced learning platform built with Next.js, powered by OpenAI's AI-generated quizzes. It provides an engaging learning experience on any topics the user desires. With intuitive user interface design and robust features, Qaiz simplifies learning and knowledge assessment.

## Features

- **Smart Quizzes:** Qaiz offers AI-generated quizzes tailored to your chosen topics.

- **Quiz Insights:** Dive into the details of your performance. Review your answers to see which questions you got right and which ones you missed.

- **Quiz History Tracking:** Keep a record of your past quizzes, track your progress, and measure your improvement over time.

- **Trending Topics:** Explore trending quiz topics shared across the Qaiz community through an interactive word cloud.

## Technologies Used

- Next.js (with TypeScript)

- NextAuth (Google OAuth)

- Prisma (with MySQL)

- OpenAI API for AI-generated quizzes

- Zod for robust data validation

- Tailwind CSS and Shadcn for styling

- Lucide Icons for icons

- React Query for efficient data fetching and state management

## Deployment Limitations

Please note that the current deployment of Qaiz on Vercel's Hobby plan has certain limitations:

- Quizzes are limited to a maximum of 3 questions due to Vercel's serverless function execution timeout, which is set at 10 seconds.

- Occasionally, the platform may experience issues or delays in generating quizzes due to these limitations.
