'use client';

import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  color: string;
}

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Colores corporativos sutiles y elegantes
    const colors = [
      'rgba(0, 102, 204, 0.08)',    // Azul corporativo
      'rgba(0, 166, 81, 0.06)',     // Verde profesional
      'rgba(0, 176, 215, 0.07)',    // Cyan elegante
      'rgba(66, 165, 245, 0.08)',   // Azul claro
      'rgba(129, 199, 132, 0.06)',  // Verde claro
    ];

    // Generar 15 burbujas más sutiles y elegantes
    const generatedBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 50 + 30, // 30px a 80px
      left: Math.random() * 100, // 0% a 100%
      duration: Math.random() * 15 + 20, // 20s a 35s (más lento, más elegante)
      delay: Math.random() * 8, // 0s a 8s de delay
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setBubbles(generatedBubbles);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0
    }}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            backgroundColor: bubble.color,
            borderRadius: '50%',
            animation: `floatUp ${bubble.duration}s ease-in infinite`,
            animationDelay: `${bubble.delay}s`,
            boxShadow: `inset 0 0 ${bubble.size * 0.2}px rgba(255, 255, 255, 0.2), 0 0 ${bubble.size * 0.15}px ${bubble.color}`,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(3px)'
          }}
        >
          {/* Reflejo de burbuja */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '30%',
            height: '30%',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
            filter: 'blur(4px)'
          }} />
        </div>
      ))}

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh) translateX(${Math.random() * 40 - 20}px) scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120vh) translateX(${Math.random() * 80 - 40}px) scale(0.8);
            opacity: 0;
          }
        }

        .bubble {
          will-change: transform, opacity;
        }

        /* Animación de movimiento lateral para simular flotación */
        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(20px);
          }
        }
      `}</style>
    </div>
  );
}
