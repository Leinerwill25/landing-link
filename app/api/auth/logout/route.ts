import { NextRequest, NextResponse } from 'next/server';
import { clearAuthToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  
  // Clear the auth cookie
  response.cookies.delete('auth-token');
  
  return response;
}
