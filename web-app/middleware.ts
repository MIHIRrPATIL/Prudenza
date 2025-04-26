import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/api/webhooks(.*)',
  ],
  ignoredRoutes: [
    '/_next/static/(.*)',
    '/favicon.ico',
  ],
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
  