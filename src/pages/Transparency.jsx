import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

export default function Transparency() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="w-full hero-bg h-[780px] flex items-center relative pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px]"
        style={{ backgroundImage: 'url(/images/hero-transparency.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transparência Inspira Confiança
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
              No Instituto Sublim, acreditamos que o acesso claro e irrestrito às nossas ações e finanças é a base de um futuro sustentável e impactante. Veja como suas doações transformam vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link className="w-full" to="/doacao" onClick={handleLinkClick}>
                <Button size="lg" className="w-full" variant="primary" icon="fa-regular fa-heart">
                  DOAR AGORA
                </Button>
              </Link>
              <Link className="w-full" to="/nossos-projetos" onClick={handleLinkClick}>
                <Button size="lg" className='w-full' variant="outline" icon="fa-solid fa-arrow-right" iconPosition="right">
                  Conheça Nossos Projetos
                </Button>
              </Link>
            </div>            
          </div>
        </div>
      </section>
      {/* Transparência Financeira Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transparência Total: Nossa Credibilidade é Pública
            </h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Mais que oferecer abrigo, geramos oportunidades e futuro sustentável para mais de 7.000 pessoas.
            </p>
          </div>

          {/* Box Verde */}
          <div className="bg-primary rounded-3xl p-8 md:p-12 max-w-6xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              O Que Sua Doação Realizou
            </h2>
            <p className="text-gray-800 text-lg">
              Veja onde 100% dos recursos foram aplicados nos últimos 12 meses, de forma clara e objetiva.
            </p>
          </div>

          {/* Grid Principal */}
          <div className="grid items-center lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Coluna Esquerda - Distribuição */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Distribuição de Recursos 2025
              </h3>

              <div className="space-y-6">
                {/* Ações Comunitárias */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-800 font-medium">Ações Comunitárias</span>
                    <span className="text-gray-800 font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-primary-300 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* Capacitação */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-800 font-medium">Capacitação</span>
                    <span className="text-gray-800 font-bold">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>

                {/* Oficinas */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-800 font-medium">Oficinas</span>
                    <span className="text-gray-800 font-bold">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>

                {/* Custo Operacional */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-800 font-medium">Custo Operacional</span>
                    <span className="text-gray-800 font-bold">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gray-800 h-3 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Cards */}
            <div className="space-y-6">
              <div className='w-full flex gap-6 justify-between'>
                {/* Card Pessoas Impactadas */}
                <div className="w-full bg-gray-100 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-lime-300 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-users text-2xl text-gray-800"></i>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">2.847</div>
                  <div className="text-gray-700 font-medium">Pessoas Impactadas</div>
                </div>

                {/* Card Projetos Ativos */}
                <div className="w-full bg-gray-100 rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-bullseye text-2xl text-white"></i>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">12</div>
                  <div className="text-gray-700 font-medium">Projetos Ativos</div>
                </div>

              </div>

              {/* Botão */}
              <Button variant="primary" size="lg" icon="fas fa-file-alt" className="w-full">
                Entenda Nosso Custo Operacional
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Documentação Legal e Governança Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Documentação Legal e Governança
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Acesso rápido aos documentos essenciais para verificação de nossa credibilidade
            </p>
          </div>

          {/* Grid de Cards de Documentos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 - Relatórios de Impacto Anual */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col justify-between h-full w-full">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-file-alt text-2xl text-gray-900"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Relatórios de Impacto Anual
              </h3>
              <div className="mb-4">
                <span className="inline-block text-sm font-medium text-gray-900 bg-primary-500 px-3 py-1 rounded-full mb-4">
                  Documento Público
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Veja em detalhes o número de pessoas assistidas, resultados dos projetos e métricas de sucesso do Instituto Sublim no último ano.
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Pessoas:</span>
                  <span className="font-bold">2.847</span>
                </div>
                <div className="flex justify-between">
                  <span>Projetos:</span>
                  <span className="font-bold">12</span>
                </div>
              </div>
              <Button variant="blue" size="md" icon="fas fa-download" >
                Baixar Relatório 2025 (PDF)
              </Button>
            </div>

            {/* Card 2 - Prestação de Contas Financeira */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col justify-between h-full w-full">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-chart-bar text-2xl text-gray-900"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Prestação de Contas Financeira
              </h3>
              <div className="mb-4">
                <span className="inline-block text-sm font-medium text-gray-900 bg-primary-500 px-3 py-1 rounded-full mb-4">
                  Documento Público
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Acesse as demonstrações contábeis e fiscais do Instituto. Trabalhamos com auditoria e transparência na gestão de recursos.
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Transparência:</span>
                  <span className="font-bold">2.847</span>
                </div>
                <div className="flex justify-between">
                  <span>Projetos:</span>
                  <span className="font-bold">12</span>
                </div>
              </div>
              <Button variant="blue" size="md" icon="fas fa-download">
                Baixar Balanço 2024 (PDF)
              </Button>
            </div>

            {/* Card 3 - Estatutos e CNPJ */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col justify-between h-full w-full">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-bookmark text-2xl text-gray-900"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Estatutos e CNPJ
              </h3>
              <div className="mb-4">
                <span className="inline-block text-sm font-medium text-gray-900 bg-primary-500 px-3 py-1 rounded-full mb-4">
                  Documento Público
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Conheça nossa base legal. O Estatuto Social e dados do CNPJ estão disponíveis para verificação pública.
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>CNPJ:</span>
                  <span className="font-bold">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Auditoria:</span>
                  <span className="font-bold">Anual</span>
                </div>
              </div>
              <Button variant="blue" size="md" icon="fas fa-eye">
                Ver Estatutos e CNPJ
              </Button>
            </div>

            {/* Card 4 - Certificações e Títulos */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col justify-between h-full w-full">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-award text-2xl text-gray-900"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Certificações e Títulos
              </h3>
              <div className="mb-4">
                <span className="inline-block text-sm font-medium text-gray-900 bg-primary-500 px-3 py-1 rounded-full mb-4">
                  Documento Público
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Consulte nossos títulos de utilidade pública e outras certificações que atestam nossa idoneidade e boa governança.
              </p>
              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Certificados:</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Validade:</span>
                  <span className="font-bold">2025</span>
                </div>
              </div>
              <Button variant="blue" size="md" icon="fas fa-eye">
                Ver Certificados
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - A Confiança Gera Transformação */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-black lg:bg-white">
        <div className="bg-black text-white container mx-auto rounded-3xl lg:p-12">
          <div className="lg:max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              A Confiança Gera Transformação
            </h2>
            <p className="text-lg opacity-90 mb-10 leading-relaxed">
              Agora que você conhece nossa transparência, junte-se a nós. Seja o elo de mudança que milhares de famílias da Zona Norte de São Paulo precisam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="primary" size="lg" icon="fas fa-heart">
                QUERO FAZER A DIFERENÇA
              </Button>
              <Button variant="ghost" size="lg" icon="fas fa-arrow-right" iconPosition="right" className="text-primary hover:bg-white/10">
                Prefiro Parceria Corporativa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Esclarecemos as principais dúvidas sobre nossa operação e transparência
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button 
                onClick={() => toggleFaq(0)}
                className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-8">
                  Onde fica localizado o Instituto Sublim e qual sua área de atuação?
                </h3>
                <i className={`fas fa-chevron-down text-gray-600 transition-transform ${openFaq === 0 ? 'rotate-180' : ''}`}></i>
              </button>
              {openFaq === 0 && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  O Instituto Sublim está localizado na Zona Norte de São Paulo e atua principalmente nesta região, desenvolvendo projetos em comunidades carentes para promover educação, capacitação profissional e desenvolvimento social.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button 
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-8">
                  Quem fiscaliza a aplicação dos recursos do Instituto Sublim?
                </h3>
                <i className={`fas fa-chevron-down text-gray-600 transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`}></i>
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Nossa gestão financeira é auditada por empresa independente e prestamos contas aos órgãos reguladores. Além disso, mantemos total transparência com nossos doadores através de relatórios periódicos e documentação pública disponível nesta página.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button 
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-8">
                  Qual é o custo operacional do Instituto?
                </h3>
                <i className={`fas fa-chevron-down text-gray-600 transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`}></i>
              </button>
              {openFaq === 2 && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Nosso custo operacional representa apenas 5% do total de recursos, sendo destinado à manutenção de infraestrutura, gestão administrativa e custos fixos. Os outros 95% são aplicados diretamente em ações sociais, capacitação e oficinas que beneficiam as comunidades.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button 
                onClick={() => toggleFaq(3)}
                className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors text-left"
              >
                <h3 className="text-lg font-bold text-gray-900 pr-8">
                  Como posso ter certeza de que o PIX vai para a conta correta?
                </h3>
                <i className={`fas fa-chevron-down text-gray-600 transition-transform ${openFaq === 3 ? 'rotate-180' : ''}`}></i>
              </button>
              {openFaq === 3 && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  Sempre confira se o nome do beneficiário é "Instituto Sublim" e o CNPJ corresponde ao registrado em nossos documentos públicos. Você também receberá um comprovante imediatamente após a doação e poderá entrar em contato conosco para confirmar o recebimento.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
