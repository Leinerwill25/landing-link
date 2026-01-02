import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createToken, setAuthToken } from '@/lib/auth';
import { AuthResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      const response: AuthResponse = {
        success: false,
        message: 'Username and password are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const isValid = await validateCredentials(username, password);

    if (!isValid) {
      const response: AuthResponse = {
        success: false,
        message: 'Invalid credentials',
      };
      return NextResponse.json(response, { status: 401 });
    }

    const token = await createToken(username);
    
    const response: AuthResponse = {
      success: true,
      token,
      message: 'Login successful',
    };

    const nextResponse = NextResponse.json(response);
    
    // Set cookie
    nextResponse.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return nextResponse;
  } catch (error) {
    console.error('Login error:', error);
    const response: AuthResponse = {
      success: false,
      message: 'An error occurred during login',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
