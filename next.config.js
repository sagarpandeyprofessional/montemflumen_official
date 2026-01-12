/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for AWS Amplify
  output: 'export',
  
  // Trailing slash for static hosting compatibility
  trailingSlash: true,
  
  // Image optimization - use unoptimized for static export
  images: {
    unoptimized: true,
  },
  
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
