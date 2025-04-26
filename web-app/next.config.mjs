/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  env: {
    clerkFrontendApi: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.replace(
      /^pk_(test|live)_/,
      '$1.'
    ),
  },
};

export default nextConfig;