import React, { useState, useEffect } from 'react';

export default function OurStory() {
  const [pessoasTransformadas, setPessoasTransformadas] = useState(0);
  const [taxaEmpregabilidade, setTaxaEmpregabilidade] = useState(0);
  const [certificacoes, setCertificacoes] = useState(0);
  const [comunidades, setComunidades] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Counter animation effect for Impact Numbers Section (on scroll)
  useEffect(() => {
    const impactSection = document.getElementById('impact-numbers-section');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const duration = 1000;
            const steps = 60;
            const interval = duration / steps;

            const targets = {
              pessoas: 2847,
              taxa: 95,
              certificacoes: 8,
              comunidades: 45
            };

            let currentStep = 0;

            const timer = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;

              setPessoasTransformadas(Math.floor(targets.pessoas * progress));
              setTaxaEmpregabilidade(Math.floor(targets.taxa * progress));
              setCertificacoes(Math.floor(targets.certificacoes * progress));
              setComunidades(Math.floor(targets.comunidades * progress));

              if (currentStep >= steps) {
                setPessoasTransformadas(targets.pessoas);
                setTaxaEmpregabilidade(targets.taxa);
                setCertificacoes(targets.certificacoes);
                setComunidades(targets.comunidades);
                clearInterval(timer);
              }
            }, interval);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (impactSection) {
      observer.observe(impactSection);
    }

    return () => {
      if (impactSection) {
        observer.unobserve(impactSection);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-historia.png)' }}>
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                A Determinação de Uma História que Transforma Milhares de Futuros
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                Conheça a história de Carol Andrade, que transformou sua existência através da esperança em um propósito real de desenvolver crianças, jovens e comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carol Andrade Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Carol Andrade: A Força que Nos Move
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-sm sm:text-base">
            Da infância marcada por desafios ao sonho de transformar vidas.
          </p>

          {/* Story Cards */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {/* Card 1 - Raízes na Comunidade */}
            <article className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">Raízes na Comunidade</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  Carol cresceu na Zona Norte de São Paulo, em uma família que lutava para sobreviver. Filha de uma empregada doméstica e um pedreiro, aprendeu desde cedo o valor do trabalho e a importância da educação.
                </p>
                <blockquote className="border-l-4 border-teal-600 pl-4 italic text-gray-700 text-base leading-relaxed">
                  "Via minha mãe sair às 5h da manhã e voltar às 23h. Prometi que um dia ajudaria outras mães e não passarem por isso", relembra Carol.
                </blockquote>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 flex justify-center items-center">
                <img src="/images/carol_.png" alt="Carol Andrade" className="w-72 sm:w-96 lg:w-[450px] h-auto rounded-2xl" />
              </div>
            </article>

            {/* Card 2 - Educação Como Libertação */}
            <article className="flex flex-col md:flex-row-reverse items-center gap-8 sm:gap-10 lg:gap-16">
              <div className="md:w-1/2">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">Educação Como Libertação</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  Contra todas as estatísticas, Carol se formou em Pedagogia aos 28 anos, trabalhando durante o dia e estudando à noite. Foi a primeira de sua família a ter ensino superior.
                </p>
                <p className="text-gray-700 leading-relaxed text-base">
                  Durante a faculdade, organizava grupos de estudo gratuitos para jovens da comunidade, plantando a semente do que viria a ser o Instituto Sublim.
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="/images/educacao.png" alt="Educação" className="rounded-2xl w-full h-64 sm:h-72 md:h-80 object-cover shadow-xl" />
              </div>
            </article>

            {/* Card 3 - O Nascimento de um Sonho */}
            <article className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">O Nascimento de um Sonho</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  Em 2016, após ver uma vizinha perder o emprego e não ter como alimentar os filhos, Carol decidiu que era hora de formalizar sua missão. Com R$ 500 do próprio bolso, fundou o Instituto Sublim.
                </p>
                <blockquote className="border-l-4 border-teal-600 pl-4 italic text-gray-700 text-base leading-relaxed">
                  "Sublim vem de 'sublimar' - acredito que toda pessoa tem algo sublime dentro de si, só precisa de oportunidade para florescer."
                </blockquote>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src="/images/sonho.png" alt="Sonho" className="rounded-2xl w-full h-64 sm:h-72 md:h-80 object-cover shadow-xl" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Timeline - Nossa Evolução */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Nossa Evolução
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-sm sm:text-base">
            De uma ideia a uma organização que transforma milhares de vidas
          </p>

          <div className="relative">
            {/* Vertical Line - teal */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-teal-500 ml-6 md:ml-0"></div>

            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-12">
              {[
                { 
                  year: '2018', 
                  title: 'O Sonho se Torna Realidade', 
                  desc: 'Carol Andrade funda o Instituto Sublim na Zona Norte de SP, transformando sua própria experiência de superação em força para ajudar outras famílias.',
                  icon: <i className="fa-regular fa-star"></i>,
                  iconColor: 'bg-teal-500',
                  position: 'left'
                },
                { 
                  year: '2019', 
                  title: 'Primeiras Ações Comunitárias', 
                  desc: 'Início dos projetos de capacitação profissional e distribuição de cestas básicas, atendendo 180 famílias no primeiro ano.',
                  icon: <i className="fa-solid fa-user-group"></i>,
                  iconColor: 'bg-gray-500',
                  position: 'right'
                },
                { 
                  year: '2020', 
                  title: 'Resistência na Pandemia', 
                  desc: 'Adaptamos nossos projetos para o formato digital e triplicamos o atendimento, chegando a 540 famílias durante a crise.',
                  icon: <i className="fa-solid fa-head-side-mask"></i>,
                  iconColor: 'bg-gray-500',
                  position: 'left'
                },
                { 
                  year: '2021', 
                  title: 'Reconhecimento Oficial', 
                  desc: 'Conquista do título de Utilidade Pública Municipal e parcerias estratégicas com empresas e governo local.',
                  icon: <i className="fa-solid fa-award"></i>,
                  iconColor: 'bg-gray-500',
                  position: 'right'
                },
                { 
                  year: '2022 - 2024', 
                  title: 'Expansão e Impacto', 
                  desc: 'Mais de 2.500 pessoas impactadas, 12 projetos ativos e consolidação como referência em transformação social na Zona Norte.',
                  icon: <i className="fa-solid fa-bullseye"></i>,
                  iconColor: 'bg-teal-500',
                  position: 'left'
                }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Mobile and Desktop Layout */}
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${item.position === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    {/* Year label - mobile */}
                    <div className="md:hidden ml-16">
                      <span className="text-sm font-semibold text-gray-500">{item.year}</span>
                    </div>
                    
                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-40px)] ml-16 md:ml-0 ${item.position === 'right' ? 'md:pl-10' : 'md:pr-10'}`}>
                      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-500">{item.year}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    
                    {/* Icon - centered on timeline */}
                    <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 ${idx === 0 ? 'top-0' : 'top-0'}`}>
                      <div className={`w-12 h-12 ${item.iconColor} rounded-full flex items-center justify-center shadow-lg z-10`}>
                        <span className="text-xl text-white">{item.icon}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparência Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Transparência é Nosso Compromisso
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-sm sm:text-base">
            Acreditamos que a confiança é construída através da transparência total em nossas ações e resultados.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Missão */}
            <div className="bg-teal-50 rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-5">
                <i className="fas fa-bullseye text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Transformar vidas através da educação, capacitação profissional e fortalecimento comunitário, oferecendo oportunidades reais de desenvolvimento social e econômico para famílias em situação de vulnerabilidade.
              </p>
            </div>

            {/* Card 2 - Visão */}
            <div className="bg-blue-50 rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
                <i className="fas fa-star text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Ser referência nacional em transformação social, criando um modelo replicável de desenvolvimento comunitário que inspire outras organizações e gere impacto positivo duradouro.
              </p>
            </div>

            {/* Card 3 - Valores */}
            <div className="bg-teal-50 rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-5">
                <i className="fas fa-circle-check text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Transparência total, respeito pela dignidade humana, inovação social, colaboração comunitária e compromisso com resultados mensuráveis que gerem transformação real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nosso Impacto em Números Section */}
      <section id="impact-numbers-section" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lime-50 to-lime-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Nosso Impacto em Números
          </h2>
          <p className="text-center text-gray-700 mb-16 text-base sm:text-lg">
            Resultados concretos de nossa missão
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-users text-2xl text-gray-900"></i>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-lime-500 mb-2">{pessoasTransformadas.toLocaleString('pt-BR')}</div>
              <p className="text-gray-700 font-medium text-sm md:text-base">Pessoas Transformadas</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-bullseye text-2xl text-gray-900"></i>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-lime-500 mb-2">{taxaEmpregabilidade}%</div>
              <p className="text-gray-700 font-medium text-sm md:text-base">Taxa de Empregabilidade</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-award text-2xl text-gray-900"></i>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-lime-500 mb-2">{certificacoes}</div>
              <p className="text-gray-700 font-medium text-sm md:text-base">Certificações Conquistadas</p>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-map-marker-alt text-2xl text-gray-900"></i>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-lime-500 mb-2">{comunidades}</div>
              <p className="text-gray-700 font-medium text-sm md:text-base">Comunidades Atendidas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parcerias Estratégicas Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Parcerias Estratégicas
          </h2>
          <p className="text-center text-gray-700 mb-16 text-base sm:text-lg">
            Juntos somos mais fortes na transformação social
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { name: 'Gerando Falcões', type: 'ONGs' },
              { name: 'Vertem', type: 'Empresas' },
              { name: 'Fundação Everis', type: 'Fundações' },
              { name: 'SEBRAE', type: 'Educação' },
              { name: 'Caça Fome', type: 'ONGs' },
              { name: 'New School', type: 'Educação' }
            ].map((partner, idx) => (
              <div key={idx} className="bg-teal-50 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-building text-2xl text-white"></i>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-sm text-gray-600">{partner.type}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-4 px-8 rounded-lg transition-colors inline-flex items-center gap-2 text-lg">
              <i className="fas fa-handshake"></i>
              Seja Nosso Parceiro
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}