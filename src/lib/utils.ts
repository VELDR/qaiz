import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60);
  const result = [];
  if (hours > 0) {
    result.push(`${hours}h`);
  }
  if (minutes > 0) {
    result.push(`${minutes}m`);
  }
  if (secs > 0) {
    result.push(`${secs}s`);
  }
  return result.join(' ');
}

export function capitalizeString(string: string): string {
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .trim();
}
