export interface Profile {
  name: string;
  bio: string;
  avatar: string;
}

export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: string;
  order: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: 'youtube' | 'drive';
  order: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  order: number;
}

export interface ContentData {
  profile: Profile;
  socialLinks: SocialLink[];
  videos: Video[];
  products: Product[];
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
