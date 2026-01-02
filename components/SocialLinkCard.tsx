'use client';

import { SocialLink } from '@/types';

interface SocialLinkCardProps {
  link: SocialLink;
}

const iconMap: Record<string, { color: string }> = {
  instagram: { color: '#E4405F' },
  youtube: { color: '#FF0000' },
  twitter: { color: '#1DA1F2' },
  facebook: { color: '#1877F2' },
  linkedin: { color: '#0A66C2' },
  github: { color: '#181717' },
  tiktok: { color: '#000000' },
  website: { color: '#0066CC' },
  email: { color: '#EA4335' },
  whatsapp: { color: '#25D366' },
};

// Professional SVG Icons Component
const SocialIcon = ({ type }: { type: string }) => {
  const iconType = type.toLowerCase();
  
  switch (iconType) {
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
        </svg>
      );
    case 'website':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.34.16-2h4.68c.09.66.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" fill="currentColor"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="currentColor"/>
        </svg>
      );
  }
};

export default function SocialLinkCard({ link }: SocialLinkCardProps) {
  const iconInfo = iconMap[link.icon.toLowerCase()] || { color: '#0066CC' };
  
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="professional-social-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1.75rem 2rem',
        textDecoration: 'none',
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-xl)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        minHeight: '100px',
        cursor: 'pointer',
        background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--bg-secondary) 100%)'
      }}
    >
      {/* Elegant Left Border */}
      <div 
        className="accent-border"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          background: `linear-gradient(180deg, ${iconInfo.color}, ${iconInfo.color}cc, ${iconInfo.color}99)`,
          opacity: 0.4,
          transition: 'opacity 0.4s ease, width 0.4s ease',
          borderRadius: 'var(--radius-xl) 0 0 var(--radius-xl)'
        }}
      />
      
      {/* Subtle Background Pattern */}
      <div 
        className="bg-pattern"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at top right, ${iconInfo.color}05, transparent 60%)`,
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none'
        }}
      />

      {/* Professional Icon Container */}
      <div 
        className="icon-wrapper"
        style={{
          position: 'relative',
          zIndex: 1,
          flexShrink: 0
        }}
      >
        <div 
          className="icon-box"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1.5px solid var(--border-color)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Icon Background Gradient */}
          <div 
            className="icon-bg-gradient"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${iconInfo.color}15, ${iconInfo.color}08)`,
              opacity: 0,
              transition: 'opacity 0.4s ease'
            }}
          />
          <div 
            style={{ 
              position: 'relative', 
              zIndex: 1,
              width: '28px',
              height: '28px',
              color: iconInfo.color,
              transition: 'color 0.4s ease'
            }}
            className="icon-svg"
          >
            <SocialIcon type={link.icon} />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ 
        flex: 1,
        minWidth: 0,
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          <h3 
            className="card-title"
            style={{
              margin: 0,
              fontSize: '1.125rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              transition: 'color 0.4s ease',
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            {link.title}
          </h3>
          {/* Status Indicator */}
          <div 
            className="status-dot"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary-500)',
              boxShadow: '0 0 8px var(--secondary-500)',
              opacity: 0.6,
              transition: 'opacity 0.4s ease, transform 0.4s ease'
            }}
          />
        </div>
        <p 
          className="card-subtitle"
          style={{
            margin: 0,
            fontSize: '0.8125rem',
            color: 'var(--text-tertiary)',
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.01em'
          }}
        >
          Haz clic para visualizar
        </p>
      </div>

      {/* Professional Arrow Icon */}
      <div 
        className="arrow-icon"
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          color: 'var(--text-tertiary)',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>

      <style jsx>{`
        .professional-social-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-2xl), 0 8px 32px rgba(0, 102, 204, 0.12);
          border-color: var(--primary-300);
        }

        .professional-social-card:hover .accent-border {
          opacity: 1;
          width: 5px;
        }

        .professional-social-card:hover .bg-pattern {
          opacity: 1;
        }

        .professional-social-card:hover .icon-box {
          transform: translateY(-2px);
          border-color: var(--primary-300);
          box-shadow: 0 4px 16px rgba(0, 102, 204, 0.15);
        }

        .professional-social-card:hover .icon-bg-gradient {
          opacity: 1;
        }

        .professional-social-card:hover .icon-svg {
          color: ${iconInfo.color};
          transform: scale(1.1);
        }

        .professional-social-card:hover .card-title {
          color: var(--primary-600);
        }

        .professional-social-card:hover .status-dot {
          opacity: 1;
          transform: scale(1.2);
        }

        .professional-social-card:hover .arrow-icon {
          transform: translateX(4px);
          color: var(--primary-600);
          background-color: var(--primary-50);
          border-color: var(--primary-200);
        }

        .professional-social-card:active {
          transform: translateY(-3px);
        }

        @media (max-width: 640px) {
          .professional-social-card {
            padding: 1.5rem 1.75rem;
            gap: 1.25rem;
            minHeight: '90px';
          }
          
          .professional-social-card .icon-box {
            width: 56px;
            height: 56px;
          }

          .professional-social-card .icon-svg {
            width: '24px';
            height: '24px';
          }

          .professional-social-card .arrow-icon {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </a>
  );
}
