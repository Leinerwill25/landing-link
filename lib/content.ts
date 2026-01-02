import fs from 'fs';
import path from 'path';
import { ContentData } from '@/types';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');

export function getContent(): ContentData {
  try {
    const fileContent = fs.readFileSync(CONTENT_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent) as ContentData;
  } catch (error) {
    console.error('Error reading content file:', error);
    // Return default content if file doesn't exist
    return {
      profile: {
        name: '',
        bio: '',
        avatar: '',
      },
      socialLinks: [],
      videos: [],
      products: [],
    };
  }
}

export function saveContent(content: ContentData): void {
  try {
    const dir = path.dirname(CONTENT_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving content file:', error);
    throw new Error('Failed to save content');
  }
}
