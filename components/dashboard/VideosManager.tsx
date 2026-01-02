'use client';

import { useState } from 'react';
import { Video } from '@/types';

interface VideosManagerProps {
  videos: Video[];
  onChange: (videos: Video[]) => void;
}

export default function VideosManager({ videos, onChange }: VideosManagerProps) {
  const addVideo = () => {
    const newVideo: Video = {
      id: Date.now().toString(),
      title: '',
      url: '',
      platform: 'youtube',
      description: '',
      order: videos.length + 1,
    };
    onChange([...videos, newVideo]);
  };

  const updateVideo = (id: string, updates: Partial<Video>) => {
    onChange(videos.map(video => video.id === id ? { ...video, ...updates } : video));
  };

  const deleteVideo = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este video?')) {
      onChange(videos.filter(video => video.id !== id));
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newVideos = [...videos];
    [newVideos[index - 1], newVideos[index]] = [newVideos[index], newVideos[index - 1]];
    newVideos.forEach((video, i) => video.order = i + 1);
    onChange(newVideos);
  };

  const moveDown = (index: number) => {
    if (index === videos.length - 1) return;
    const newVideos = [...videos];
    [newVideos[index], newVideos[index + 1]] = [newVideos[index + 1], newVideos[index]];
    newVideos.forEach((video, i) => video.order = i + 1);
    onChange(newVideos);
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
            🎥 Videos Informativos
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            Comparte videos educativos y de información
          </p>
        </div>
        <button onClick={addVideo} className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar Video
        </button>
      </div>

      {videos.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '2px dashed var(--border-color)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎥</div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            No hay videos todavía
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }}>
            Agrega videos de YouTube o Google Drive
          </p>
          <button onClick={addVideo} className="btn btn-primary">
            Agregar Primer Video
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {videos.map((video, index) => (
            <div key={video.id} style={{
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
                    Plataforma
                  </label>
                  <select
                    value={video.platform}
                    onChange={(e) => updateVideo(video.id, { platform: e.target.value as 'youtube' | 'drive' })}
                    className="select"
                  >
                    <option value="youtube">▶️ YouTube</option>
                    <option value="drive">📁 Google Drive</option>
                  </select>
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                    marginTop: '0.375rem',
                    margin: 0
                  }}>
                    Selecciona la plataforma de hosting
                  </p>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    Título del Video
                  </label>
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => updateVideo(video.id, { title: e.target.value })}
                    className="input"
                    placeholder="Introducción a la medicina preventiva"
                  />
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
                  URL del Video
                </label>
                <input
                  type="url"
                  value={video.url}
                  onChange={(e) => updateVideo(video.id, { url: e.target.value })}
                  className="input"
                  placeholder={
                    video.platform === 'youtube'
                      ? 'https://www.youtube.com/watch?v=...'
                      : 'https://drive.google.com/file/d/...'
                  }
                />
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-tertiary)',
                  marginTop: '0.375rem',
                  margin: 0
                }}>
                  {video.platform === 'youtube'
                    ? 'Enlace completo del video de YouTube'
                    : 'Enlace de compartir de Google Drive'}
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  Descripción (Opcional)
                </label>
                <textarea
                  value={video.description}
                  onChange={(e) => updateVideo(video.id, { description: e.target.value })}
                  className="textarea"
                  placeholder="Breve descripción del contenido del video..."
                  rows={3}
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
                  disabled={index === videos.length - 1}
                  className="btn btn-ghost"
                  style={{
                    opacity: index === videos.length - 1 ? 0.4 : 1,
                    cursor: index === videos.length - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                  Bajar
                </button>
                <button
                  onClick={() => deleteVideo(video.id)}
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
          ))}
        </div>
      )}
    </div>
  );
}
