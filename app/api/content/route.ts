import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getContent, saveContent } from '@/lib/content';
import { ContentData, ApiResponse } from '@/types';

export async function GET() {
  try {
    console.log('API: Fetching content from Supabase...');
    const content = await getContent();
    console.log('API: Content fetched successfully');
    
    const response: ApiResponse<ContentData> = {
      success: true,
      data: content,
    };
    
    // Add cache control headers to prevent stale data
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('API: Error fetching content:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch content';
    const response: ApiResponse = {
      success: false,
      error: errorMessage,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      const response: ApiResponse = {
        success: false,
        error: 'Unauthorized',
      };
      return NextResponse.json(response, { status: 401 });
    }

    const body = await request.json();
    const content: ContentData = body;

    // Validate content structure
    if (!content.profile || !content.socialLinks || !content.videos || !content.products) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid content structure',
      };
      return NextResponse.json(response, { status: 400 });
    }

    await saveContent(content);

    const response: ApiResponse<ContentData> = {
      success: true,
      data: content,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error saving content:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to save content';
    const response: ApiResponse = {
      success: false,
      error: errorMessage,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
