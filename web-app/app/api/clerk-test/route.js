import { clerkClient } from '@/lib/clerk';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userCount = await clerkClient.users.getCount();
    return NextResponse.json({ 
      success: true, 
      userCount,
      clerkStatus: {
        initialized: true,
        version: require('@clerk/backend/package.json').version
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      diagnostics: {
        env: {
          CLERK_SECRET_KEY: !!process.env.CLERK_SECRET_KEY,
          NODE_ENV: process.env.NODE_ENV
        },
        imports: {
          clerkBackend: require.resolve('@clerk/backend'),
          nextVersion: require('next/package.json').version
        }
      }
    }, { status: 500 });
  }
}