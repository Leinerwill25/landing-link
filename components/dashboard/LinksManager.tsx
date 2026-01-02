'use client';

import { useState } from 'react';
import { SocialLink } from '@/types';

interface LinksManagerProps {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

const availableIcons = [
  { value: 'instagram', label: 'Instagram', emoji: '📷' },
  { value: 'youtube', label: 'YouTube', emoji: '▶️' },
  { value: 'twitter', label: 'Twitter/X', emoji: '🐦' },
  { value: 'facebook', label: 'Facebook', emoji: '👍' },
  { value: 'linkedin', label: 'LinkedIn', emoji: '💼' },
  { value: 'github', label: 'GitHub', emoji: '💻' },
  { value: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { value: 'website', label: 'Sitio Web', emoji: '🌐' },
  { value: 'email', label: 'Email', emoji: '✉️' },
  { value: 'whatsapp', label: 'WhatsApp', emoji: '💬' },
];

export default function LinksManager({ links, onChange }: LinksManagerProps) {
  const addLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      title: '',
      url: '',
      icon: 'website',
      order: links.length + 1,
    };
    onChange([...links, newLink]);
  };

  const updateLink = (id: string, updates: Partial<SocialLink>) => {
    onChange(links.map(link => link.id === id ? { ...link, ...updates } : link));
  };

  const deleteLink = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este enlace?')) {
      onChange(links.filter(link => link.id !== id));
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newLinks = [...links];
    [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
    newLinks.forEach((link, i) => link.order = i + 1);
    onChange(newLinks);
  };

  const moveDown = (index: number) => {
    if (index === links.length - 1) return;
    const newLinks = [...links];
    [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
    newLinks.forEach((link, i) => link.order = i + 1);
    onChange(newLinks);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            🔗 Enlaces Sociales
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            Gestiona tus redes sociales y canales de contacto
          </p>
        </div>
        <button onClick={addLink} className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar Enlace
        </button>
      </div>

      {links.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '2px dashed var(--border-color)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔗</div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            No hay enlaces todavía
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }}>
            Comienza agregando tu primer enlace social
          </p>
          <button onClick={addLink} className="btn btn-primary">
            Agregar Primer Enlace
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {links.map((link, index) => {
            const iconInfo = availableIcons.find(i => i.value === link.icon) || availableIcons[0];
            return (
              <div key={link.id} style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.25rem',
                  marginBottom: '1.25rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      Título
                    </label>
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => updateLink(link.id, { title: e.target.value })}
                      className="input"
                      placeholder="Instagram"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      Icono
                    </label>
                    <select
                      value={link.icon}
                      onChange={(e) => updateLink(link.id, { icon: e.target.value })}
                      className="select"
                    >
                      {availableIcons.map(icon => (
                        <option key={icon.value} value={icon.value}>
                          {icon.emoji} {icon.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    URL
                  </label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                    className="input"
                    placeholder="https://"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="btn btn-ghost"
                    style={{
                      opacity: index === 0 ? 0.4 : 1,
                      cursor: index === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    Subir
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === links.length - 1}
                    className="btn btn-ghost"
                    style={{
                      opacity: index === links.length - 1 ? 0.4 : 1,
                      cursor: index === links.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    Bajar
                  </button>
                  <button
                    onClick={() => deleteLink(link.id)}
                    className="btn btn-ghost"
                    style={{
                      marginLeft: 'auto',
                      color: '#DC2626'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
