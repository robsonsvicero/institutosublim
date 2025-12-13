import React, { useState } from 'react';

const whatsappLink = 'https://wa.me/5511975911225?text=Ol%C3%A1!%20Gostaria%20de%20saber%20como%20posso%20ajudar%20o%20Instituto%20Sublim%3F'; // Substitua pelo link real já usado no projeto

export default function CartaoVisitaDigital() {
  const [copied, setCopied] = useState(false);
  const pixKey = '39.976.495/0001-24';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#FCFFF3] rounded-none md:rounded-[24px] overflow-hidden px-0 md:px-4">
      {/* Topo verde e logo */}
      <div className="w-full bg-[#06591C] flex flex-col items-center pt-8 pb-8 rounded-none">
        <img
          src="/images/sublim_selo 2.png"
          alt="Instituto Sublim"
          className="w-32 h-32 md:w-40 md:h-40 mb-4 border-4 border-lime-300 rounded-full bg-white"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Instituto Sublim</h1>
        <p className="text-base md:text-lg italic text-[#A6F4A6]">O gesto que transforma futuros</p>
      </div>

      {/* Conteúdo */}
      <div className="w-full max-w-xl flex flex-col items-center px-2 md:px-4 pt-4 pb-8">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-2 text-center">
          Fale Conosco e Conecte-se à Nossa Missão
        </h2>

        <div className="mb-4 text-center">
          <button
            onClick={handleCopyPix}
            className="block text-sm md:text-base font-semibold text-[#1CC29F] hover:underline focus:outline-none focus:ring-2 focus:ring-[#1CC29F] px-2 py-1 rounded"
            title="Clique para copiar a chave PIX"
          >
            PIX (Chave CNPJ): <span className="font-normal text-[#1CC29F]">{pixKey}</span>
          </button>
          {copied && (
            <span className="block text-xs text-green-600 mt-1 animate-pulse">Chave copiada!</span>
          )}
        </div>
        <div className="flex flex-col gap-4 md:gap-5 w-full">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 md:py-4 rounded-xl bg-lime-300 text-center text-base md:text-lg font-semibold text-[#06591C] hover:bg-lime-400 transition"
          >
            Quero Ajudar
          </a>
          <a
            href="https://institutosublim.org.br"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 md:py-4 rounded-xl bg-lime-300 text-center text-base md:text-lg font-semibold text-[#06591C] hover:bg-lime-400 transition"
          >
            Nosso Website Oficial
          </a>
          <a
            href="https://www.facebook.com/institutosublim/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 md:py-4 rounded-xl bg-lime-300 text-center text-base md:text-lg font-semibold text-[#06591C] hover:bg-lime-400 transition"
          >
            Acompanhe o Sublim (Facebook)
          </a>
          <a
            href="https://www.instagram.com/institutosublim/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 md:py-4 rounded-xl bg-lime-300 text-center text-base md:text-lg font-semibold text-[#06591C] hover:bg-lime-400 transition"
          >
            Acompanhe o Sublim (Instagram)
          </a>
          <a
            href="mailto:contato@institutosublim.org.br"
            className="block w-full py-3 md:py-4 rounded-xl bg-lime-300 text-center text-base md:text-lg font-semibold text-[#06591C] hover:bg-lime-400 transition"
          >
            E-mail de Contato
          </a>
        </div>
        
      </div>
    </div>
  );
}
