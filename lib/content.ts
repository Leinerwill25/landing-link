import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { ContentData } from '@/types';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');
const CONTENT_ID = '00000000-0000-0000-0000-000000000000';

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Check if Supabase is configured
function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export async function getContent(): Promise<ContentData> {
  // Try Supabase first if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('content')
          .select('profile, social_links, videos, products')
          .eq('id', CONTENT_ID)
          .single();

        // PGRST116 = no rows returned (record doesn't exist yet)
        if (error && error.code === 'PGRST116') {
          console.log('No content found in Supabase, returning empty content');
          return {
            profile: { name: '', bio: '', avatar: '' },
            socialLinks: [],
            videos: [],
            products: [],
          };
        }

        if (error) {
          console.error('Error fetching from Supabase:', error);
          // If there's an error, still return empty content instead of falling back
          return {
            profile: { name: '', bio: '', avatar: '' },
            socialLinks: [],
            videos: [],
            products: [],
          };
        }

        // Return data from Supabase
        if (data) {
          // Parse JSON strings if they come as strings (Supabase sometimes returns JSONB as strings)
          const parseJsonField = (field: any, defaultValue: any) => {
            if (field === null || field === undefined) return defaultValue;
            
            // If it's already an object/array, return it
            if (typeof field !== 'string') {
              return field;
            }
            
            // If it's a string, try to parse it
            try {
              const parsed = JSON.parse(field);
              return parsed;
            } catch (e) {
              console.warn('Failed to parse JSON field:', e);
              return defaultValue;
            }
          };

          const profile = parseJsonField(data.profile, { name: '', bio: '', avatar: '' });
          const socialLinks = parseJsonField(data.social_links, []);
          const videos = parseJsonField(data.videos, []);
          const products = parseJsonField(data.products, []);

          return {
            profile: profile,
            socialLinks: socialLinks,
            videos: videos,
            products: products,
          };
        }

        // If no data but no error, return empty
        return {
          profile: { name: '', bio: '', avatar: '' },
          socialLinks: [],
          videos: [],
          products: [],
        };
      }
    } catch (error) {
      console.error('Error reading from Supabase:', error);
      // If Supabase is configured but fails, return empty instead of falling back to file
      return {
        profile: { name: '', bio: '', avatar: '' },
        socialLinks: [],
        videos: [],
        products: [],
      };
    }
  }

  // Fallback to file system (only if Supabase is NOT configured - development only)
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

export async function saveContent(content: ContentData): Promise<void> {
  // Try Supabase first if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
        // Ensure data is properly formatted as JSONB
        const { error } = await supabase
          .from('content')
          .upsert({
            id: CONTENT_ID,
            profile: typeof content.profile === 'string' ? JSON.parse(content.profile) : content.profile,
            social_links: typeof content.socialLinks === 'string' ? JSON.parse(content.socialLinks) : content.socialLinks,
            videos: typeof content.videos === 'string' ? JSON.parse(content.videos) : content.videos,
            products: typeof content.products === 'string' ? JSON.parse(content.products) : content.products,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id'
          });

        if (error) {
          console.error('Error saving to Supabase:', error);
          throw new Error(`Error al guardar en Supabase: ${error.message}`);
        }

        console.log('Content saved to Supabase successfully');
        return;
      }
    } catch (error: any) {
      console.error('Error saving to Supabase:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save content';
      throw new Error(errorMessage);
    }
  }

  // Fallback to file system (development only)
  try {
    const dir = path.dirname(CONTENT_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf-8');
    console.log('Content saved to file system successfully');
  } catch (error: any) {
    console.error('Error saving content file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to save content';
    throw new Error(errorMessage);
  }
}
