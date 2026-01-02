'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentData } from '@/types';
import ThemeToggle from '@/components/ThemeToggle';
import ProfileManager from '@/components/dashboard/ProfileManager';
import LinksManager from '@/components/dashboard/LinksManager';
import VideosManager from '@/components/dashboard/VideosManager';
import ProductsManager from '@/components/dashboard/ProductsManager';

export default function DashboardPage() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'videos' | 'products'>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ Contenido guardado exitosamente');
      } else {
        alert('❌ Error al guardar: ' + (data.error || 'Error desconocido'));
      }
    } catch (error) {
      alert('❌ Error de conexión al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="skeleton" style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: 'var(--radius-full)', 
            margin: '0 auto 1rem' 
          }} />
          <p style={{ color: 'var(--text-secondary)' }}>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: 'var(--text-secondary)' }}>Error al cargar el contenido</p>
      </div>
    );
  }

  const tabs = [
    { id: 'profile' as const, name: 'Perfil', icon: '👤' },
    { id: 'links' as const, name: 'Enlaces', icon: '🔗' },
    { id: 'videos' as const, name: 'Videos', icon: '🎥' },
    { id: 'products' as const, name: 'Servicios', icon: '📦' },
  ];

  return (
    <>
      <ThemeToggle />
      
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        {/* Desktop Sidebar */}
        <aside style={{
          width: '280px',
          backgroundColor: 'var(--bg-elevated)',
          borderRight: '1px solid var(--border-color)',
          padding: '2rem 0',
          display: 'none',
          flexDirection: 'column'
        }}
        className="desktop-sidebar"
        >
          {/* Logo/Header */}
          <div style={{ padding: '0 1.5rem', marginBottom: '2.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 102, 204, 0.25)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" style={{ width: '1.5rem', height: '1.5rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 18v2.25A2.25 2.25 0 0118 22.5h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.375rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  margin: 0,
                  letterSpacing: '-0.02em'
                }}>
                  Panel Admin
                </h3>
              </div>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-tertiary)',
              margin: 0,
              paddingLeft: '2.75rem'
            }}>
              Gestión de contenido
            </p>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '0 0.75rem' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  padding: '0.875rem 1.125rem',
                  marginBottom: '0.5rem',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, var(--primary-100), var(--primary-50))' 
                    : 'transparent',
                  color: activeTab === tab.id ? 'var(--primary-700)' : 'var(--text-secondary)',
                  border: activeTab === tab.id 
                    ? '1px solid var(--primary-200)' 
                    : '1px solid transparent',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.9375rem',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textAlign: 'left',
                  position: 'relative',
                  boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0, 102, 204, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {activeTab === tab.id && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '60%',
                    background: 'linear-gradient(180deg, var(--primary-500), var(--accent-500))',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0'
                  }} />
                )}
                <span style={{ fontSize: '1.375rem', lineHeight: 1 }}>{tab.icon}</span>
                <span style={{ letterSpacing: '-0.01em' }}>{tab.name}</span>
              </button>
            ))}
          </nav>

          {/* Footer Actions */}
          <div style={{ padding: '0 1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginBottom: '0.75rem',
                textDecoration: 'none'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ver Sitio
            </a>
            <button
              onClick={handleLogout}
              className="btn btn-ghost"
              style={{
                width: '100%',
                justifyContent: 'center'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflow: 'auto' }}>
          {/* Mobile Header */}
          <header style={{
            backgroundColor: 'var(--bg-elevated)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          className="mobile-header"
          >
            <div>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0
              }}>
                Panel Administrativo
              </h1>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <a href="/" target="_blank" className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
              <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          </header>

          {/* Mobile Tabs */}
          <div style={{
            backgroundColor: 'var(--bg-elevated)',
            borderBottom: '1px solid var(--border-color)',
            padding: '0.5rem 1rem',
            overflowX: 'auto',
            display: 'none'
          }}
          className="mobile-tabs"
          >
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: activeTab === tab.id ? 'var(--primary-100)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--primary-600)' : 'var(--text-secondary)',
                    border: activeTab === tab.id ? '1px solid var(--primary-500)' : '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div style={{ padding: '2.5rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              {/* Content */}
              <div className="card animate-fade-in-scale" style={{ marginBottom: '2.5rem' }}>
                {activeTab === 'profile' && (
                  <ProfileManager
                    profile={content.profile}
                    onChange={(profile) => setContent({ ...content, profile })}
                  />
                )}
                {activeTab === 'links' && (
                  <LinksManager
                    links={content.socialLinks}
                    onChange={(socialLinks) => setContent({ ...content, socialLinks })}
                  />
                )}
                {activeTab === 'videos' && (
                  <VideosManager
                    videos={content.videos}
                    onChange={(videos) => setContent({ ...content, videos })}
                  />
                )}
                {activeTab === 'products' && (
                  <ProductsManager
                    products={content.products}
                    onChange={(products) => setContent({ ...content, products })}
                  />
                )}
              </div>

              {/* Save Button */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={saveContent}
                  disabled={saving}
                  className="btn btn-primary"
                  style={{
                    padding: '1rem 3rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    opacity: saving ? 0.6 : 1,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 102, 204, 0.25)'
                  }}
                >
                  {saving ? (
                    <>
                      <svg
                        style={{ animation: 'spin 1s linear infinite', width: '1.25rem', height: '1.25rem' }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-sidebar {
            display: flex !important;
          }
          .mobile-header, .mobile-tabs {
            display: none !important;
          }
        }
        
        @media (max-width: 767px) {
          .mobile-header, .mobile-tabs {
            display: flex !important;
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
