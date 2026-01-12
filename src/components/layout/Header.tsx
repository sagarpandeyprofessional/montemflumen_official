/**
 * File path: src/components/layout/Header.tsx
 * Role/responsibility: Site header with navigation, mobile menu, and theme toggle
 * Connections: Used in root layout, consumes NAV_ITEMS from constants
 * UI/UX patterns: [UX-NAV-03] Sticky CTA, glass morphism
 * Edge cases: Mobile menu focus trap, keyboard navigation
 * Reference documents: PIT-4 (onClick), PIT-23 (localStorage), PIT-90 (Focus Trap)
 *
 * Note: Adds brand logo from /public/images/banners/montemflumen-logo.svg (served at /images/banners/montemflumen-logo.svg)
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();

  // Handle scroll for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize theme from localStorage or system preference
  // (PIT-23: Window/localStorage Access - useEffect)
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, [theme]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Brand logo (public/)
  const brandLogoSrc = '/images/banners/montemflumen-logo.svg';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass border-b border-ash-200 dark:border-forest-800' : 'bg-transparent'
      )}
    >
      <div className="container-wide">
        <nav className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-forest-900 dark:text-picket-50"
            aria-label={`${SITE_CONFIG.name} home`}
          >
            <span className="relative h-7 w-7 lg:h-8 lg:w-8 shrink-0">
              <Image
                src={brandLogoSrc}
                alt={`${SITE_CONFIG.name} logo`}
                fill
                className="object-contain"
                sizes="32px"
                priority
                unoptimized
              />
            </span>
            <span>{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  isActive(item.href)
                    ? 'text-forest-900 bg-ash-200/50 dark:text-picket-50 dark:bg-forest-800/50'
                    : 'text-forest-600 hover:text-forest-900 hover:bg-ash-100 dark:text-ash-400 dark:hover:text-picket-100 dark:hover:bg-forest-800/30'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-forest-600 hover:bg-ash-100 dark:text-ash-400 dark:hover:bg-forest-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* CTA Button */}
            <Button variant="primary" size="sm" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-forest-600 hover:bg-ash-100 dark:text-ash-400 dark:hover:bg-forest-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-forest-600 hover:bg-ash-100 dark:text-ash-400 dark:hover:bg-forest-800 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="border-t border-ash-200 dark:border-forest-800 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'text-forest-900 bg-ash-200/50 dark:text-picket-50 dark:bg-forest-800/50'
                    : 'text-forest-600 hover:text-forest-900 hover:bg-ash-100 dark:text-ash-400 dark:hover:text-picket-100 dark:hover:bg-forest-800/30'
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Button variant="primary" fullWidth asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
