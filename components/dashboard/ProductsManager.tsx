'use client';

import { useState } from 'react';
import { Product } from '@/types';

interface ProductsManagerProps {
  products: Product[];
  onChange: (products: Product[]) => void;
}

export default function ProductsManager({ products, onChange }: ProductsManagerProps) {
  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: '',
      description: '',
      imageUrl: '',
      ctaText: '',
      ctaUrl: '',
      order: products.length + 1,
    };
    onChange([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    onChange(products.map(product => product.id === id ? { ...product, ...updates } : product));
  };

  const deleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      onChange(products.filter(product => product.id !== id));
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newProducts = [...products];
    [newProducts[index - 1], newProducts[index]] = [newProducts[index], newProducts[index - 1]];
    newProducts.forEach((product, i) => product.order = i + 1);
    onChange(newProducts);
  };

  const moveDown = (index: number) => {
    if (index === products.length - 1) return;
    const newProducts = [...products];
    [newProducts[index], newProducts[index + 1]] = [newProducts[index + 1], newProducts[index]];
    newProducts.forEach((product, i) => product.order = i + 1);
    onChange(newProducts);
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
            📦 Servicios Profesionales
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            margin: 0
          }}>
            Gestiona tus servicios y ofertas profesionales
          </p>
        </div>
        <button onClick={addProduct} className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar Servicio
        </button>
      </div>

      {products.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '2px dashed var(--border-color)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            No hay servicios todavía
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }}>
            Comienza agregando tu primer servicio profesional
          </p>
          <button onClick={addProduct} className="btn btn-primary">
            Agregar Primer Servicio
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {products.map((product, index) => (
            <div key={product.id} style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem'
            }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  Título del Servicio
                </label>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => updateProduct(product.id, { title: e.target.value })}
                  className="input"
                  placeholder="Consulta General"
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  Descripción
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                  className="textarea"
                  placeholder="Descripción detallada del servicio..."
                  rows={4}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  URL de Imagen (Opcional)
                </label>
                <input
                  type="url"
                  value={product.imageUrl}
                  onChange={(e) => updateProduct(product.id, { imageUrl: e.target.value })}
                  className="input"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-tertiary)',
                  marginTop: '0.375rem',
                  margin: 0
                }}>
                  Enlace a una imagen representativa del servicio
                </p>
              </div>

              {product.imageUrl && (
                <div style={{
                  marginBottom: '1.25rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem'
                  }}>
                    Vista Previa de Imagen
                  </p>
                  <img
                    src={product.imageUrl}
                    alt="Preview"
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: 'auto',
                      borderRadius: 'var(--radius-md)',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}

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
                    Texto del Botón (Opcional)
                  </label>
                  <input
                    type="text"
                    value={product.ctaText}
                    onChange={(e) => updateProduct(product.id, { ctaText: e.target.value })}
                    className="input"
                    placeholder="Agendar Cita"
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
                    URL del Botón (Opcional)
                  </label>
                  <input
                    type="url"
                    value={product.ctaUrl}
                    onChange={(e) => updateProduct(product.id, { ctaUrl: e.target.value })}
                    className="input"
                    placeholder="https://agenda.ejemplo.com"
                  />
                </div>
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
                  disabled={index === products.length - 1}
                  className="btn btn-ghost"
                  style={{
                    opacity: index === products.length - 1 ? 0.4 : 1,
                    cursor: index === products.length - 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.125rem', height: '1.125rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                  Bajar
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
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
