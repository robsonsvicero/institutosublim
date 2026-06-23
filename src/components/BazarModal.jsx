import React, { useState, useEffect } from 'react';

const EXPIRATION_HOURS = 24; // Defina aqui quantas horas até o modal reaparecer

export default function BazarModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seenAt = localStorage.getItem('sublim_has_seen_bazar_modal');

    let shouldShow = true;

    if (seenAt) {
      const seenTime = parseInt(seenAt, 10);
      const now = Date.now();
      const hoursPassed = (now - seenTime) / (1000 * 60 * 60);

      // Só mostra novamente se já passou o tempo definido
      if (hoursPassed < EXPIRATION_HOURS) {
        shouldShow = false;
      }
    }

    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    // Salva o TIMESTAMP atual, não apenas 'true'
    localStorage.setItem('sublim_has_seen_bazar_modal', String(Date.now()));
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/5511975911225?text=Olá, gostaria de fazer uma doação para o Bazar Solidário!', '_blank');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 font-body">
      {/* Overlay com blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[95vh] overflow-y-auto">

        {/* Lado Esquerdo - Info (Apenas Desktop) */}
        <div className="hidden md:flex w-5/12 bg-gray-50 p-6 md:p-10 flex-col items-center justify-center border-r border-gray-100">
          <div className="bg-white p-6 rounded-full shadow-sm border border-gray-200 mb-6 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
            <i className="fa-solid fa-shirt text-7xl text-blue-500"></i>
          </div>
          <p className="text-sm text-gray-500 text-center px-4">
            Aceitamos roupas infantis e adultos, calçados em bom estado, brinquedos e objetos de decoração.
          </p>
        </div>

        {/* Lado Direito - Conteúdo e Formulário */}
        <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col">

          {/* Botão Fechar Desktop & Mobile */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors z-20"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>

          <div className="flex items-center gap-2 mb-4 mt-2 md:mt-0">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-blue-500 text-xs font-bold uppercase tracking-wider">Bazar Solidário</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 leading-tight mb-4 pr-6 md:pr-0">
            Transforme o que você não usa mais em esperança.
          </h2>

          <p className="text-gray-600 text-base mb-8 leading-relaxed">
            Doe roupas, calçados e objetos para o Bazar Solidário. Sua doação nos ajuda a levantar recursos e atende famílias da nossa comunidade que precisam de itens em bom estado.
          </p>

          <div className="space-y-5 flex-1">

            {/* Imagem/Icone Mobile Only (Antes dos botões) */}
            <div className="md:hidden flex flex-col items-center justify-center py-2">
              <div className="bg-white p-6 rounded-full shadow-sm border border-gray-200 flex items-center justify-center w-32 h-32 mb-3">
                <i className="fa-solid fa-shirt text-5xl text-blue-500"></i>
              </div>
              <p className="text-xs text-gray-500 text-center px-4">
                Aceitamos roupas infantis e adultos, calçados em bom estado, brinquedos e objetos de decoração.
              </p>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <i className="fa-brands fa-whatsapp text-lg"></i> Combinar Doação
              </button>

              <button
                onClick={handleClose}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold py-3.5 px-6 rounded-xl transition-colors"
              >
                Agora não
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-8 text-center md:text-left">
            Ao clicar em combinar doação, você será redirecionado para o nosso WhatsApp para agendar a entrega.<br className="hidden md:block" />
            Obrigado por apoiar nossa causa!
          </p>
        </div>
      </div>
    </div>
  );
}
