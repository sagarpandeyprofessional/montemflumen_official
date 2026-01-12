// File path: next.config.js
// Purpose: Next.js configuration for SSR/Compute deployment on AWS Amplify (removes static export).
// Connected files/modules: package.json scripts (build/start), AWS Amplify build settings, Next.js runtime.
// Responsibilities: Controls build output mode (SSR vs export), security headers, compression, caching, compiler optimizations.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: SSR/Compute requires a server build output in .next/
  // Static export (output: 'export') is intentionally removed.

  // Trailing slash preserves your existing URL structure (safe to keep)
  trailingSlash: true,

  // Re-enable Next.js image optimization for SSR builds (default behavior).
  // Keeping the images object is optional; omitted here to use defaults.

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Enable gzip compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Compiler options for production optimization
  compiler: {
    // Remove console.log in production (PIT-100)
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
