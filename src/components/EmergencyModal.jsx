import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const CNPJ_PIX = '39976495000124'; // Chave PIX do Instituto Sublim (somente números)

// Função para gerar o payload do PIX (EMV) estático
// Baseado no manual BR.GOV.BCB.PIX
function generatePixPayload(chave, nomeRecebedor, cidadeRecebedor, valor) {
  let payload = "000201"; // Payload Format Indicator
  
  // Merchant Account Information
  const gui = "0014br.gov.bcb.pix";
  const chaveFormatada = `01${String(chave.length).padStart(2, '0')}${chave}`;
  const accountInfo = `${gui}${chaveFormatada}`;
  payload += `26${String(accountInfo.length).padStart(2, '0')}${accountInfo}`;
  
  payload += "52040000"; // Merchant Category Code (0000)
  payload += "5303986";  // Transaction Currency (986 = BRL)
  
  if (valor && parseFloat(valor) > 0) {
    const valorStr = parseFloat(valor).toFixed(2);
    payload += `54${String(valorStr.length).padStart(2, '0')}${valorStr}`;
  }
  
  payload += "5802BR"; // Country Code
  
  // Nome do recebedor (Max 25 chars)
  const nomeFormatado = nomeRecebedor.substring(0, 25).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  payload += `59${String(nomeFormatado.length).padStart(2, '0')}${nomeFormatado}`;
  
  // Cidade do recebedor (Max 15 chars)
  const cidadeFormatada = cidadeRecebedor.substring(0, 15).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  payload += `60${String(cidadeFormatada.length).padStart(2, '0')}${cidadeFormatada}`;
  
  // Transaction ID (txid)
  const txid = "DOACAOALUGUEL";
  const additionalDataField = `05${String(txid.length).padStart(2, '0')}${txid}`;
  payload += `62${String(additionalDataField.length).padStart(2, '0')}${additionalDataField}`;
  
  // CRC16
  payload += "6304";
  payload += computeCRC16(payload);
  
  return payload;
}

// Algoritmo CRC16-CCITT-FALSE
function computeCRC16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  crc &= 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export default function EmergencyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [valor, setValor] = useState('');
  const [pixPayload, setPixPayload] = useState('');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    // Verifica se já foi exibido nesta sessão ou dispositivo
    const hasSeen = localStorage.getItem('sublim_has_seen_emergency_modal');
    
    if (!hasSeen) {
      // Pequeno atraso para não aparecer imediatamente num piscar de olhos
      const timer = setTimeout(() => {
        setIsOpen(true);
        document.body.style.overflow = 'hidden'; // Bloqueia o scroll
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Atualiza o QR Code sempre que o valor muda
  useEffect(() => {
    const numValue = valor.replace(',', '.');
    const novoPayload = generatePixPayload(CNPJ_PIX, 'INSTITUTO SUBLIM', 'SAO PAULO', numValue);
    setPixPayload(novoPayload);
  }, [valor]);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto'; // Restaura o scroll
    localStorage.setItem('sublim_has_seen_emergency_modal', 'true');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
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
        
        {/* Botão Fechar Mobile (flutuante) */}
        <button 
          onClick={handleClose}
          className="md:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 z-20"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Lado Esquerdo - Info e QR Code (em telas grandes fica na esquerda, em mobile empilha) */}
        <div className="w-full md:w-5/12 bg-gray-50 p-6 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6">
            <QRCodeSVG 
              value={pixPayload}
              size={200}
              level="M"
              includeMargin={false}
              className="w-48 h-48 sm:w-56 sm:h-56"
            />
          </div>
          <p className="text-sm text-gray-500 text-center px-4">
            Escaneie o QR Code no app do seu banco ou copie a chave PIX ao lado para doar qualquer valor.
          </p>
        </div>

        {/* Lado Direito - Conteúdo e Formulário */}
        <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col">
          
          {/* Botão Fechar Desktop */}
          <button 
            onClick={handleClose}
            className="hidden md:flex absolute top-6 right-6 w-10 h-10 items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>

          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-500 text-xs font-bold uppercase tracking-wider">Ajuda Emergencial</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 leading-tight mb-4">
            Ajude o Instituto Sublim a manter a sede aberta este mês.
          </h2>
          
          <p className="text-gray-600 text-base mb-8 leading-relaxed">
            Sua contribuição para o aluguel da sede garante que nossa missão continue de portas abertas e que o trabalho com a comunidade não seja interrompido.
          </p>

          <div className="space-y-5 flex-1">
            {/* Input Valor Livre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Valor livre (Opcional)</label>
              <div className="flex border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">
                <span className="bg-gray-50 px-4 py-3 text-gray-500 font-medium border-r border-gray-300">R$</span>
                <input 
                  type="number" 
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Digite o valor que puder doar"
                  className="w-full px-4 py-3 outline-none text-gray-900"
                />
              </div>
            </div>

            {/* Chave PIX (Read Only) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Chave PIX (CNPJ)</label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 font-mono text-sm break-all">
                39.976.495/0001-24
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {copiado ? (
                  <><i className="fa-solid fa-check"></i> Chave PIX Copiada!</>
                ) : (
                  <><i className="fa-regular fa-copy"></i> Copiar Chave PIX</>
                )}
              </button>
              
              <button 
                onClick={handleClose}
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold py-3.5 px-6 rounded-xl transition-colors"
              >
                Já fiz minha doação
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-8 text-center md:text-left">
            Depois de concluir o PIX, você pode fechar esta janela.<br className="hidden md:block" />
            Obrigado por ajudar a manter a missão do Instituto Sublim ativa.
          </p>
        </div>
      </div>
    </div>
  );
}
