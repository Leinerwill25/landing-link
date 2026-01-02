'use client';

import { Video } from '@/types';

interface VideoPlayerProps {
  video: Video;
}

function getEmbedUrl(url: string, platform: 'youtube' | 'drive'): string {
  if (platform === 'youtube') {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  } else {
    const driveRegex = /\/file\/d\/([^\/]+)/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  }
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const embedUrl = getEmbedUrl(video.url, video.platform);
  
  return (
    <div className="card" style={{
      padding: 0,
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Play Icon Overlay on Hover */}
      <div className="video-overlay" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(0, 102, 204, 0.05) 100%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: 2,
        pointerEvents: 'none',
        borderRadius: 'var(--radius-xl)'
      }} />
      
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9 aspect ratio
        backgroundColor: 'var(--bg-tertiary)',
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
      }}>
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            transition: 'transform 0.5s ease'
          }}
          className="video-iframe"
        />
      </div>
      <div style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem'
        }}>
          <div style={{
            width: 'clamp(36px, 5vw, 40px)',
            height: 'clamp(36px, 5vw, 40px)',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--secondary-100), var(--secondary-50))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--secondary-200)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--secondary-600)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
          </div>
        </div>
        <h3 style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.625rem',
          lineHeight: 1.3,
          letterSpacing: '-0.01em'
        }}>
          {video.title}
        </h3>
        {video.description && (
          <p style={{
            fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            margin: 0
          }}>
            {video.description}
          </p>
        )}
      </div>
      
      <style jsx>{`
        .card:hover .video-overlay {
          opacity: 1;
        }
        
        .card:hover .video-iframe {
          transform: scale(1.02);
        }

        @media (max-width: 640px) {
          .card {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
