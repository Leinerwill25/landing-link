'use client';

import { Profile } from '@/types';

interface ProfileManagerProps {
  profile: Profile;
  onChange: (profile: Profile) => void;
}

export default function ProfileManager({ profile, onChange }: ProfileManagerProps) {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          👤 Información del Perfil
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          margin: 0
        }}>
          Configura tu información personal y profesional
        </p>
      </div>

      <div className="grid grid-cols-1" style={{ gap: '1.5rem' }}>
        <div>
          <label htmlFor="profile-name" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            Nombre Completo *
          </label>
          <input
            id="profile-name"
            type="text"
            value={profile.name}
            onChange={(e) => onChange({ ...profile, name: e.target.value })}
            className="input"
            placeholder="Dr. Juan Pérez"
          />
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginTop: '0.375rem',
            margin: 0
          }}>
            Tu nombre profesional completo con títulos
          </p>
        </div>

        <div>
          <label htmlFor="profile-bio" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            Biografía Profesional *
          </label>
          <textarea
            id="profile-bio"
            value={profile.bio}
            onChange={(e) => onChange({ ...profile, bio: e.target.value })}
            className="textarea"
            placeholder="Especialista en medicina interna con 15 años de experiencia..."
            rows={4}
          />
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginTop: '0.375rem',
            margin: 0
          }}>
            Breve descripción de tu especialidad y experiencia
          </p>
        </div>

        <div>
          <label htmlFor="profile-avatar" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            URL del Avatar
          </label>
          <input
            id="profile-avatar"
            type="url"
            value={profile.avatar}
            onChange={(e) => onChange({ ...profile, avatar: e.target.value })}
            className="input"
            placeholder="https://ejemplo.com/mi-foto.jpg"
          />
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginTop: '0.375rem',
            margin: 0
          }}>
            Enlace directo a tu foto de perfil profesional
          </p>
        </div>

        {profile.avatar && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)'
          }}>
            <p style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '1rem'
            }}>
              Vista Previa
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={profile.avatar}
                alt="Avatar preview"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-full)',
                  objectFit: 'cover',
                  border: '3px solid var(--primary-500)'
                }}
              />
              <div>
                <p style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem'
                }}>
                  {profile.name || 'Tu nombre'}
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  margin: 0
                }}>
                  {profile.bio || 'Tu biografía'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
