'use client';

import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: 0,
      overflow: 'hidden',
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      background: 'linear-gradient(180deg, var(--card-bg) 0%, var(--bg-secondary) 100%)'
    }}>
      {/* Elegant Top Border */}
      <div className="card-top-border" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--primary-500), var(--accent-500))',
        opacity: 0.3,
        transition: 'opacity 0.4s ease, height 0.4s ease',
        zIndex: 2
      }} />
      
      {/* Subtle Corner Accent */}
      <div className="corner-accent" style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '80px',
        background: 'radial-gradient(circle, rgba(0, 102, 204, 0.08), transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      
      {/* Bottom Accent - Only for visual effect, won't interfere */}
      <div className="bottom-accent" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--primary-200), transparent)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: 1
      }} />
      
      {product.imageUrl && (
        <div className="product-image-container" style={{
          width: '100%',
          height: '200px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-tertiary)',
          position: 'relative',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div className="image-shine" style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            zIndex: 2,
            pointerEvents: 'none'
          }} />
          <img
            src={product.imageUrl}
            alt={product.title}
            className="product-image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>
      )}
      
      <div style={{ 
        padding: 'clamp(1.5rem, 4vw, 2rem)', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative', 
        zIndex: 1 
      }}>
        {/* Professional Header Section */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 'clamp(1rem, 2.5vw, 1.25rem)',
          gap: 'clamp(0.75rem, 2vw, 1rem)'
        }}>
          <div className="icon-wrapper" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
            flex: 1
          }}>
            <div className="icon-container" style={{
              width: 'clamp(44px, 6vw, 52px)',
              height: 'clamp(44px, 6vw, 52px)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1.5px solid var(--primary-200)',
              boxShadow: '0 2px 8px rgba(0, 102, 204, 0.08)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div className="icon-bg" style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, var(--primary-50), var(--primary-100))',
                opacity: 0,
                transition: 'opacity 0.4s ease'
              }} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="icon-svg"
                style={{
                  width: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  height: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                  color: 'var(--primary-600)',
                  transition: 'transform 0.4s ease',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          
          {/* Professional Badge */}
          <div className="service-badge" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.375rem 0.75rem',
            backgroundColor: 'var(--primary-50)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--primary-200)',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--primary-700)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'all 0.4s ease',
            whiteSpace: 'nowrap'
          }}>
            <div style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary-500)',
              boxShadow: '0 0 6px var(--secondary-500)'
            }} />
            Servicio
          </div>
        </div>

        {/* Title Section */}
        <h3 className="product-title" style={{
          fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          transition: 'color 0.4s ease'
        }}>
          {product.title}
        </h3>
        
        {/* Divider */}
        <div className="title-divider" style={{
          width: 'clamp(30px, 5vw, 40px)',
          height: '2px',
          background: 'linear-gradient(90deg, var(--primary-500), transparent)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '1.25rem',
          transition: 'width 0.4s ease, background 0.4s ease'
        }} />
        
        {/* Description */}
        <p className="product-description" style={{
          fontSize: 'clamp(0.875rem, 2vw, 0.9375rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          flex: 1,
          fontWeight: 400
        }}>
          {product.description}
        </p>
      
        {/* CTA Button */}
        {product.ctaText && product.ctaUrl && (
          <a
            href={product.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary product-cta"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              marginTop: 'auto',
              padding: '0.875rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-500)',
              color: 'var(--text-inverse)',
              border: 'none',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              zIndex: 10,
              cursor: 'pointer'
            }}
          >
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              position: 'relative',
              zIndex: 2
            }}>
              {product.ctaText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="cta-arrow"
                style={{
                  width: '1rem',
                  height: '1rem',
                  transition: 'transform 0.4s ease',
                  flexShrink: 0
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </a>
        )}
      </div>
      
      <style jsx>{`
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-2xl), 0 8px 32px rgba(0, 102, 204, 0.15);
          border-color: var(--primary-300);
        }

        .product-card:hover .card-top-border {
          opacity: 1;
          height: 4px;
        }

        .product-card:hover .corner-accent {
          opacity: 1;
        }

        .product-card:hover .product-image {
          transform: scale(1.08);
        }

        .product-card:hover .image-shine {
          opacity: 1;
        }

        .product-card:hover .icon-container {
          transform: translateY(-2px);
          border-color: var(--primary-400);
          box-shadow: 0 4px 16px rgba(0, 102, 204, 0.2);
        }

        .product-card:hover .icon-bg {
          opacity: 1;
        }

        .product-card:hover .icon-svg {
          transform: scale(1.1);
        }

        .product-card:hover .service-badge {
          background: var(--primary-100);
          border-color: var(--primary-300);
          transform: scale(1.05);
        }

        .product-card:hover .product-title {
          color: var(--primary-600);
        }

        .product-card:hover .title-divider {
          width: 60px;
          background: linear-gradient(90deg, var(--primary-500), var(--accent-500));
        }

        .product-card:hover .product-cta {
          transform: translateY(-1px);
          box-shadow: var(--shadow-lg), 0 4px 16px rgba(0, 102, 204, 0.25);
          background-color: var(--primary-600) !important;
        }

        .product-card:hover .product-cta span {
          opacity: 1;
          visibility: visible;
        }

        .product-card:hover .cta-arrow {
          transform: translateX(4px);
        }
        
        .product-card:hover .bottom-accent {
          opacity: 0.5;
        }

        .product-card:active {
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .product-card {
            min-height: auto;
          }

          .product-image-container {
            height: 180px !important;
          }
        }

        @media (max-width: 640px) {
          .product-card {
            min-height: auto;
          }

          .product-image-container {
            height: 160px !important;
          }

          .icon-container {
            width: 40px !important;
            height: 40px !important;
          }

          .icon-svg {
            width: 1.25rem !important;
            height: 1.25rem !important;
          }
        }

        @media (max-width: 480px) {
          .product-image-container {
            height: 140px !important;
          }
        }
      `}</style>
    </div>
  );
}
