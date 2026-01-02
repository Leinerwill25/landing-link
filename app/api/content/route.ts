import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getContent, saveContent } from '@/lib/content';
import { ContentData, ApiResponse } from '@/types';

export async function GET() {
  try {
    const content = getContent();
    const response: ApiResponse<ContentData> = {
      success: true,
      data: content,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching content:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch content',
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

    saveContent(content);

    const response: ApiResponse<ContentData> = {
      success: true,
      data: content,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error saving content:', error);
    const response: ApiResponse = {
      success: false,
      error: 'Failed to save content',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
