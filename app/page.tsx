import SocialLinkCard from '@/components/SocialLinkCard';
import VideoPlayer from '@/components/VideoPlayer';
import ProductCard from '@/components/ProductCard';
import ThemeToggle from '@/components/ThemeToggle';
import BubbleBackground from '@/components/BubbleBackground';
import { ContentData } from '@/types';

async function getContent(): Promise<ContentData> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    const res = await fetch(`${baseUrl}/api/content`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    return {
      profile: { name: '', bio: '', avatar: '' },
      socialLinks: [],
      videos: [],
      products: [],
    };
  }
}

export default async function Home() {
  const content = await getContent();
  const { profile, socialLinks, videos, products } = content;

  return (
    <>
      <ThemeToggle />
      <BubbleBackground />
      
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Hero Section with Enhanced Design */}
        <section style={{ 
          padding: '6rem 1.5rem 5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, var(--primary-500) 0%, transparent 70%)',
            opacity: 0.05,
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, var(--accent-500) 0%, transparent 70%)',
            opacity: 0.05,
            borderRadius: '50%',
            filter: 'blur(60px)'
          }} />

          <div className="container">
            <div style={{ 
              maxWidth: '1000px', 
              margin: '0 auto', 
              textAlign: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <div 
                className="animate-fade-in-scale"
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  marginBottom: '3rem'
                }}
              >
                  {/* Animated Gradient Ring */}
                  <div style={{
                    position: 'absolute',
                    inset: '-10px',
                    background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500), var(--secondary-500), var(--primary-500))',
                    backgroundSize: '300% 300%',
                    borderRadius: '50%',
                    animation: 'gradient-rotate 4s ease infinite',
                    zIndex: -1,
                    opacity: 0.6,
                    filter: 'blur(8px)'
                  }} />
                  
                  {/* Main Avatar Container */}
                  <div style={{ 
                    width: '200px', 
                    height: '200px', 
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '8px solid var(--bg-primary)',
                    boxShadow: '0 25px 80px rgba(0, 102, 204, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 0 60px rgba(0, 102, 204, 0.1)',
                    position: 'relative',
                    background: 'var(--bg-primary)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <img
                      src={profile.avatar || '/3.png'}
                      alt={profile.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  </div>
                  
                  {/* Verification Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, var(--secondary-500), var(--secondary-600))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '5px solid var(--bg-primary)',
                    boxShadow: '0 6px 20px rgba(0, 166, 81, 0.4), 0 0 0 2px rgba(0, 166, 81, 0.1)',
                    animation: 'scale-pulse 2s ease-in-out infinite'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" style={{ width: '22px', height: '22px' }}>
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

              {/* Name with Enhanced Gradient */}
              <h1 
                className="gradient-text animate-slide-up"
                style={{ 
                  marginBottom: '1.5rem',
                  fontWeight: 800,
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  animationDelay: '0.1s'
                }}
              >
                {profile.name || 'Profesional de la Salud'}
              </h1>
              
              {/* Professional Badge */}
              <div 
                className="animate-slide-up"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 1.5rem',
                  backgroundColor: 'var(--primary-50)',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '2rem',
                  border: '1px solid var(--primary-200)',
                  boxShadow: '0 2px 8px rgba(0, 102, 204, 0.1)',
                  animationDelay: '0.2s'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-500)',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                  boxShadow: '0 0 8px var(--secondary-500)'
                }} />
                <span style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: 'var(--primary-700)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  Profesional Verificado
                </span>
              </div>

              {/* Bio with Better Typography */}
              <p 
                className="animate-slide-up"
                style={{ 
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.75,
                  maxWidth: '800px',
                  margin: '0 auto 3rem',
                  fontWeight: 400,
                  animationDelay: '0.3s'
                }}
              >
                {profile.bio || 'Bienvenido a mi espacio profesional'}
              </p>

              {/* Decorative Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                margin: '2.5rem auto 0'
              }}>
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--primary-500))',
                  borderRadius: 'var(--radius-full)'
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-500)',
                  boxShadow: '0 0 10px var(--primary-500)'
                }} />
                <div style={{
                  width: '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--primary-500), transparent)',
                  borderRadius: 'var(--radius-full)'
                }} />
              </div>
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        {socialLinks && socialLinks.length > 0 && (
          <section style={{ 
            padding: '5rem 1.5rem',
            position: 'relative'
          }}>
            <div className="container">
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div 
                  className="animate-slide-up"
                  style={{ 
                    textAlign: 'center', 
                    marginBottom: '4rem' 
                  }}
                >
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.625rem 1.5rem',
                    backgroundColor: 'var(--primary-50)',
                    borderRadius: 'var(--radius-full)',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--primary-200)',
                    boxShadow: '0 2px 8px rgba(0, 102, 204, 0.08)'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--secondary-500)',
                      boxShadow: '0 0 8px var(--secondary-500)',
                      animation: 'pulse-dot 2s ease-in-out infinite'
                    }} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--primary-600)" style={{ width: '1.125rem', height: '1.125rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    <span style={{
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      color: 'var(--primary-700)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}>
                      Conecta Conmigo
                    </span>
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2
                  }}>
                    Redes Sociales y Contacto
                  </h2>
                  <div style={{
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, var(--primary-500), var(--accent-500))',
                    borderRadius: 'var(--radius-full)',
                    margin: '0 auto 1.25rem',
                    opacity: 0.8
                  }} />
                  <p style={{
                    fontSize: '1.0625rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '650px',
                    margin: '0 auto',
                    lineHeight: 1.7,
                    fontWeight: 400
                  }}>
                    Mantente en contacto a través de estos canales profesionales
                  </p>
                </div>

                <div className="grid grid-cols-2" style={{
                  gap: '1.5rem'
                }}>
                  {socialLinks
                    .sort((a, b) => a.order - b.order)
                    .map((link, index) => (
                      <div 
                        key={link.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 0.08}s` }}
                      >
                        <SocialLinkCard link={link} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Videos Section */}
        <section style={{ padding: '5rem 1.5rem' }}>
          <div className="container">
            <div 
              className="animate-slide-up"
              style={{ 
                textAlign: 'center', 
                marginBottom: '3.5rem' 
              }}
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 1.25rem',
                backgroundColor: 'var(--secondary-100)',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--secondary-700)" style={{ width: '1.25rem', height: '1.25rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--secondary-800)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Contenido Multimedia
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '0.75rem'
              }}>
                Recursos Educativos
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Videos informativos y material audiovisual
              </p>
            </div>
            
            {videos && videos.length > 0 ? (
              <div className="grid grid-cols-2" style={{
                gap: '2rem',
                maxWidth: '1100px',
                margin: '0 auto'
              }}>
                {videos
                  .sort((a, b) => a.order - b.order)
                  .map((video, index) => (
                    <div 
                      key={video.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <VideoPlayer video={video} />
                    </div>
                  ))}
              </div>
            ) : (
              <div 
                className="animate-slide-up"
                style={{
                  maxWidth: '600px',
                  margin: '0 auto',
                  textAlign: 'center',
                  padding: '4rem 2rem'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 2rem',
                  borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(135deg, var(--bg-elevated), var(--bg-secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '2.5rem', height: '2.5rem', color: 'var(--text-tertiary)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em'
                }}>
                  Actualmente No Hay Videos Educativos
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  Los recursos educativos estarán disponibles próximamente
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Services/Products Section */}
        {products && products.length > 0 && (
          <section style={{ padding: '5rem 1.5rem 6rem' }}>
            <div className="container">
              <div 
                className="animate-slide-up"
                style={{ 
                  textAlign: 'center', 
                  marginBottom: '3.5rem' 
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 1.25rem',
                  backgroundColor: 'var(--accent-100)',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '1rem'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--accent-600)" style={{ width: '1.25rem', height: '1.25rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--accent-700)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Servicios Disponibles
                  </span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  Mis Servicios Profesionales
                </h2>
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  Conoce las soluciones que ofrezco
                </p>
              </div>
              
              <div className="grid grid-cols-3" style={{
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
              }}>
                {products
                  .sort((a, b) => a.order - b.order)
                  .map((product, index) => (
                    <div 
                      key={product.id}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* Professional Footer */}
        <footer style={{ 
          backgroundColor: 'var(--bg-elevated)',
          borderTop: '1px solid var(--border-color)',
          padding: '4rem 1.5rem 3rem',
          marginTop: '4rem'
        }}>
          <div className="container">
            <div style={{ 
              maxWidth: '900px',
              margin: '0 auto',
              textAlign: 'center'
            }}>
              {profile.name && (
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {profile.name}
                </h3>
              )}
              <p style={{ 
                color: 'var(--text-tertiary)',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                Profesional dedicado al servicio de excelencia
              </p>
              <div style={{
                width: '40px',
                height: '2px',
                background: 'var(--primary-500)',
                margin: '1rem auto',
                borderRadius: 'var(--radius-full)',
                opacity: 0.3
              }} />
              <p style={{ 
                color: 'var(--text-tertiary)',
                fontSize: '0.8125rem',
                margin: 0
              }}>
                © {new Date().getFullYear()} {profile.name || 'Todos los derechos reservados'}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
