import React, { useState, useEffect } from 'react';

export default function PreLoader({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-gradient-to-br from-[#FCFFF3] via-[#FBFFF0] to-[#FAFFEB] flex items-center justify-center overflow-hidden">
      {/* Círculos animados de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full animate-pulse-slower"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full animate-spin-slow"></div>
      </div>

      {/* Container do logo */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo com animação */}
        <div className="relative">
          {/* Anel externo rotativo */}
          <div className="absolute inset-0 w-48 h-48 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
          
          {/* Anel do meio rotativo reverso */}
          <div className="absolute inset-3 w-42 h-42 border-4 border-transparent border-b-primary-500/70 rounded-full animate-spin-reverse"></div>
          
          {/* Logo central com animação de escala e rotação */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <img 
              src="/images/sublim_simbolo.png" 
              alt="Instituto Sublim" 
              className="w-32 h-32 object-contain animate-logo-bounce drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Texto com animação de fade */}
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl font-bold text-primary-dark mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Instituto Sublim
          </h2>
          <p className="text-primary-dark/80 text-lg">Transformando vidas...</p>
        </div>

        {/* Barra de progresso */}
        <div className="w-64 h-1.5 bg-teal-500/20 rounded-full overflow-hidden">
          <div className="h-full bg-teal-500 rounded-full animate-progress"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes logo-bounce {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(5deg);
          }
          50% {
            transform: scale(0.95) rotate(0deg);
          }
          75% {
            transform: scale(1.05) rotate(-5deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }

        .animate-logo-bounce {
          animation: logo-bounce 2s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }

        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </div>
  );
}
