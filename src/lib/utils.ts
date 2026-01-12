/**
 * File path: src/lib/utils.ts
 * Role/responsibility: Utility functions used throughout the application
 * Connections: Used by all components for class merging, formatting, validation
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch {
    return dateString;
  }
}

export function formatRelativeDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return dateString;
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function isServer(): boolean {
  return typeof window === 'undefined';
}

export function safeLocalStorage(): Storage | null {
  if (isServer()) return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function debounce<T extends Function>(func: T, wait: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  const debounced = function(this: unknown, ...args: unknown[]) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), wait);
  };
  
  return debounced as unknown as T;
}

export function generateMailtoLink(
  email: string,
  subject?: string,
  body?: string
): string {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const queryString = params.toString();
  return `mailto:${email}${queryString ? `?${queryString}` : ''}`;
}
