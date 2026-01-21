import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { ContentData, SocialLink } from '@/types';

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

// Helper function to parse JSON fields from Supabase
function parseJsonField(field: any, defaultValue: any) {
  if (field === null || field === undefined) {
    console.log('[parseJsonField] Field is null/undefined, using default');
    return defaultValue;
  }
  
  // If it's already an object/array, return it
  if (typeof field !== 'string') {
    console.log('[parseJsonField] Field is already parsed:', typeof field, Array.isArray(field) ? `(array with ${field.length} items)` : '');
    return field;
  }
  
  // If it's a string, try to parse it
  try {
    const parsed = JSON.parse(field);
    console.log('[parseJsonField] Successfully parsed string to:', typeof parsed, Array.isArray(parsed) ? `(array with ${parsed.length} items)` : '');
    return parsed;
  } catch (e) {
    console.warn('[parseJsonField] Failed to parse JSON field:', e, 'Field value:', field?.substring(0, 100));
    return defaultValue;
  }
}

export async function getContent(): Promise<ContentData> {
  // Always try Supabase first if configured
  if (isSupabaseConfigured()) {
    console.log('[getContent] Reading from Supabase with ID:', CONTENT_ID);
    try {
      const supabase = getSupabaseClient();
      if (!supabase) {
        console.error('[getContent] Supabase client is null despite being configured');
        throw new Error('Supabase client initialization failed');
      }

      // Fetch all fields from content table
      const { data, error } = await supabase
        .from('content')
        .select('profile, social_links, videos, products, updated_at')
        .eq('id', CONTENT_ID)
        .single();
      
      console.log('[getContent] Supabase response - Error:', error?.message || 'none', 'Has data:', !!data);

      // PGRST116 = no rows returned (record doesn't exist yet)
      if (error && error.code === 'PGRST116') {
        console.log('[getContent] No content found in Supabase for ID:', CONTENT_ID);
        return {
          profile: { name: '', bio: '', avatar: '' },
          socialLinks: [],
          videos: [],
          products: [],
        };
      }

      if (error) {
        console.error('[getContent] Error fetching from Supabase:', error);
        throw error;
      }

      // Return data from Supabase
      if (data) {
        console.log('[getContent] Successfully fetched data from Supabase');
        console.log('[getContent] Raw data types - profile:', typeof data.profile, 'social_links:', typeof data.social_links);
        console.log('[getContent] Raw social_links preview:', typeof data.social_links === 'string' ? data.social_links.substring(0, 200) : JSON.stringify(data.social_links).substring(0, 200));

        const profile = parseJsonField(data.profile, { name: '', bio: '', avatar: '' });
        let socialLinks = parseJsonField(data.social_links, []);
        const videos = parseJsonField(data.videos, []);
        const products = parseJsonField(data.products, []);

        // Ensure socialLinks is always an array
        if (!Array.isArray(socialLinks)) {
          console.warn('[getContent] socialLinks is not an array, converting...', typeof socialLinks);
          socialLinks = [];
        }

        console.log('[getContent] Parsed content - Profile:', profile.name, 'Links:', socialLinks.length, 'Videos:', videos.length, 'Products:', products.length);
        if (socialLinks.length > 0) {
          console.log('[getContent] Social links details:', JSON.stringify(socialLinks.map((l: SocialLink) => ({ id: l.id, title: l.title, url: l.url })), null, 2));
        } else {
          console.warn('[getContent] No social links found in data!');
        }

        return {
          profile: profile,
          socialLinks: socialLinks,
          videos: Array.isArray(videos) ? videos : [],
          products: Array.isArray(products) ? products : [],
        };
      }

      // If no data but no error, return empty
      console.log('[getContent] No data returned from Supabase query');
      return {
        profile: { name: '', bio: '', avatar: '' },
        socialLinks: [],
        videos: [],
        products: [],
      };
    } catch (error) {
      console.error('Error reading from Supabase:', error);
      // If Supabase is configured but fails, throw error instead of falling back
      // This ensures we know there's a problem
      throw new Error(`Failed to read from Supabase: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
