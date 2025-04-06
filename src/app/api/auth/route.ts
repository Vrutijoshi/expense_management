import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: 'error', message: 'Unauthorized' }),
      { status: 401 }
    );
  }

  return new NextResponse(
    JSON.stringify({ status: 'success', session }),
    { status: 200 }
  );
}