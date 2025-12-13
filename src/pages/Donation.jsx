import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';

const TransformLivesDonation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [donationType, setDonationType] = useState('monthly');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [livesMudadas, setLivesMudadas] = useState(0);
  const [oficinas, setOficinas] = useState(0);
  const [familias, setFamilias] = useState(0);
  const [vidasTransformadas, setVidasTransformadas] = useState(0);
  const [recursosEmProjetos, setRecursosEmProjetos] = useState(0);
  const [transparencia, setTransparencia] = useState(0);
  const [hasAnimatedTrust, setHasAnimatedTrust] = useState(false);
  const [pessoasTransformadas, setPessoasTransformadas] = useState(0);
  const [taxaEmpregabilidade, setTaxaEmpregabilidade] = useState(0);
  const [certificacoes, setCertificacoes] = useState(0);
  const [comunidades, setComunidades] = useState(0);
  const [hasAnimatedImpact, setHasAnimatedImpact] = useState(false);

  // Counter animation effect for Hero
  useEffect(() => {
    const duration = 500; // 0.5 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      lives: 120,
      workshops: 85,
      families: 200
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setLivesMudadas(Math.floor(targets.lives * progress));
      setOficinas(Math.floor(targets.workshops * progress));
      setFamilias(Math.floor(targets.families * progress));

      if (currentStep >= steps) {
        setLivesMudadas(targets.lives);
        setOficinas(targets.workshops);
        setFamilias(targets.families);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Counter animation effect for Trust Section (on scroll)
  useEffect(() => {
    const trustSection = document.getElementById('trust-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedTrust) {
            setHasAnimatedTrust(true);

            const duration = 500;
            const steps = 60;
            const interval = duration / steps;

            const targets = {
              transformed: 2000,
              resources: 95,
              transparency: 100
            };

            let currentStep = 0;

            const timer = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;

              setVidasTransformadas(Math.floor(targets.transformed * progress));
              setRecursosEmProjetos(Math.floor(targets.resources * progress));
              setTransparencia(Math.floor(targets.transparency * progress));

              if (currentStep >= steps) {
                setVidasTransformadas(targets.transformed);
                setRecursosEmProjetos(targets.resources);
                setTransparencia(targets.transparency);
                clearInterval(timer);
              }
            }, interval);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (trustSection) {
      observer.observe(trustSection);
    }

    return () => {
      if (trustSection) {
        observer.unobserve(trustSection);
      }
    };
  }, [hasAnimatedTrust]);

  // Counter animation effect for Impact Numbers Section (on scroll)
  useEffect(() => {
    const impactSection = document.getElementById('impact-numbers-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedImpact) {
            setHasAnimatedImpact(true);

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
  }, [hasAnimatedImpact]);

  const donationAmounts = [
    { value: 50, label: 'R$ 50' },
    { value: 100, label: 'R$ 100' },
    { value: 200, label: 'R$ 200' },
    { value: 500, label: 'R$ 500' }
  ];

  const transformationStories = [
    {
      name: 'Mary Jane',
      age: '34 anos',
      location: 'Vila Penteado, SP',
      avatar: '/images/avatar-1.jpg',
      text: '"A doação mensal de R$ 150 por mês durante 6 meses me permitiu fazer o curso de informática e hoje trabalho em uma empresa de tecnologia. Minha vida mudou completamente."',
      from: 'Desempregada',
      to: 'Analista de Sistemas Jr',
      donation: 'R$ 150 por 6 meses'
    },
    {
      name: 'Mary Jane',
      age: '34 anos',
      location: 'Vila Penteado, SP',
      avatar: '/images/avatar-2.jpg',
      text: '"A doação mensal de R$ 150 por mês durante 6 meses me permitiu fazer o curso de informática e hoje trabalho em uma empresa de tecnologia. Minha vida mudou completamente."',
      from: 'Desempregada',
      to: 'Analista de Sistemas Jr',
      donation: 'R$ 150 por 6 meses'
    },
    {
      name: 'Mary Jane',
      age: '34 anos',
      location: 'Vila Penteado, SP',
      avatar: '/images/avatar-3.jpg',
      text: '"A doação mensal de R$ 150 por mês durante 6 meses me permitiu fazer o curso de informática e hoje trabalho em uma empresa de tecnologia. Minha vida mudou completamente."',
      from: 'Desempregada',
      to: 'Analista de Sistemas Jr',
      donation: 'R$ 150 por 6 meses'
    },
    {
      name: 'Mary Jane',
      age: '34 anos',
      location: 'Vila Penteado, SP',
      avatar: '/images/avatar-4.jpg',
      text: '"A doação mensal de R$ 150 por mês durante 6 meses me permitiu fazer o curso de informática e hoje trabalho em uma empresa de tecnologia. Minha vida mudou completamente."',
      from: 'Desempregada',
      to: 'Analista de Sistemas Jr',
      donation: 'R$ 150 por 6 meses'
    }
  ];

  const urgentCases = [
    {
      title: 'Criança Escala Profissional',
      subtitle: 'R$ 50 por mês',
      description: 'Ajuda a oferecer ao nosso instituto a pagar por 3 meses de bolsa de estudos',
      progress: 85,
      buttonText: 'AJUDAR AGORA'
    },
    {
      title: 'Matheus Sarmêlo',
      subtitle: 'R$ 100 por mês',
      description: 'Ajuda a oferecer formação para uma pessoa que não tem condições de pagar',
      progress: 70,
      buttonText: 'AJUDAR AGORA'
    },
    {
      title: 'Assistência Alimentar',
      subtitle: 'R$ 200 por mês',
      description: 'Ajuda toda nossa equipe a fazer compras de alimentos',
      progress: 50,
      buttonText: 'AJUDAR AGORA'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[780px] bg-cover bg-center pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px]"
        style={{ backgroundImage: 'url(/images/hero_doacao.png)' }}>
        <div className="absolute inset-0 bg-black/50 flex items-center pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px]">
          <div className="container mx-auto">
            <div className="max-w-3xl text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border-2 border-primary-500 px-4 py-2 rounded-full mb-6">
                <p className="text-sm font-semibold text-primary-500">
                  <i className="fa-regular fa-heart mr-2"></i> Transformando Vidas Juntos
                </p>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Sua Doação<br />
                Salva Vidas
              </h1>

              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                Cada real doado financia oficinas, programas de inclusão e apoio direto às crianças em comunidades reais, educando-as e salvando o mundo.
              </p>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{livesMudadas}</div>
                  <div className="text-sm text-white/80">Vidas Mudadas em 2024</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{oficinas}</div>
                  <div className="text-sm text-white/80">Oficinas Realizadas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{familias}</div>
                  <div className="text-sm text-white/80">Famílias Atendidas</div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row mt-20 gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon="fa-regular fa-heart"
                  className="flex-1 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                  onClick={() => document.getElementById('donation-channels')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  QUERO AJUDAR AGORA
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold"
                  onClick={() => document.getElementById('impact-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver Nosso Impacto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Channels Section */}
      <section id="donation-channels" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Canais de Comunicação
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Escolha o canal mais adequado para seu contato. Nossa equipe está pronta para atender você com transparência e agilidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Monthly Donation Card */}
            <div className="bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="p-8 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                      <i className="fas fa-chart-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Doação Mensal</h3>
                      <p className="text-sm text-white/90">Impacto contínuo e sustentável</p>
                    </div>
                  </div>
                  <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                    RECOMENDADO
                  </div>
                </div>

                <p className="text-white/90 mb-6 leading-relaxed">
                  Sua contribuição mensal gera transformação constante na vida de famílias da Zona Norte
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-white text-lg mt-0.5"></i>
                    <p className="text-white/90">Acompanhamento mensal do impacto gerado</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-white text-lg mt-0.5"></i>
                    <p className="text-white/90">Relatórios exclusivos de progresso</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-white text-lg mt-0.5"></i>
                    <p className="text-white/90">Pode ser cancelado a qualquer momento</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-white text-lg mt-0.5"></i>
                    <p className="text-white/90">Certificado anual de contribuição social</p>
                  </div>
                </div>

                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-xl border-2 border-white/30 transition-all duration-300">
                  COMEÇAR DOAÇÃO MENSAL
                </button>
              </div>
            </div>

            {/* Single Donation Card */}
            <div className="bg-gradient-to-br from-fuchsia-500 via-pink-500 to-pink-600 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="p-8 text-white">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                      <i className="fas fa-bolt text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Doação Única</h3>
                      <p className="text-sm text-white/90">Transformação imediata</p>
                    </div>
                  </div>
                </div>

                <p className="text-white/90 mb-6 leading-relaxed">
                  Uma contribuição pontual que gera impacto direto e imediato em nossa comunidade
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-white text-lg mt-0.5"></i>
                    <p className="text-white/90">Impacto imediato nos projetos</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-white text-lg mt-0.5"></i>
                    <p className="text-white/90">Comprovante para declaração de IR</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-white text-lg mt-0.5"></i>
                    <p className="text-white/90">Relatório específico do uso da doação</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-white text-lg mt-0.5"></i>
                    <p className="text-white/90">Reconhecimento na nossa galeria de doadores</p>
                  </div>
                </div>

                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-xl border-2 border-white/30 transition-all duration-300">
                  FAZER DOAÇÃO ÚNICA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="impact-section" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Ajude a Transformar Vidas
              </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparência total: cada real se transforma em resultado concreto
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: 'fa-graduation-cap',
                iconColor: 'text-blue-500',
                bgColor: 'bg-blue-50',
                amount: 'R$ 50',
                label: 'valor do impacto',
                title: 'Reforço escolar para 1 criança por 1 mês',
                description: 'Material didático, acompanhamento pedagógico e lanche'
              },
              {
                icon: 'fa-home',
                iconColor: 'text-green-500',
                bgColor: 'bg-green-50',
                amount: 'R$ 100',
                label: 'valor do impacto',
                title: 'Cesta básica completa para 1 família',
                description: 'Alimentação para 30 dias + produtos de higiene'
              },
              {
                icon: 'fa-briefcase',
                iconColor: 'text-purple-500',
                bgColor: 'bg-purple-50',
                amount: 'R$ 150',
                label: 'valor do impacto',
                title: 'Curso de capacitação profissional completo',
                description: 'Informática, vendas ou empreendedorismo para 1 pessoa'
              },
              {
                icon: 'fa-users',
                iconColor: 'text-red-500',
                bgColor: 'bg-red-50',
                amount: 'R$ 300',
                label: 'valor do impacto',
                title: 'Apoio integral para 1 família por 3 meses',
                description: 'Assistência social, educação e capacitação complet'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all ">
                <div className="p-8 flex flex-col justify-between h-full">
                  <div className={`${item.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <i className={`fas ${item.icon} ${item.iconColor} text-3xl`}></i>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-1">{item.amount}</div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-3 text-center leading-tight">{item.title}</h3>
                  <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">{item.description}</p>
                  <Button variant='primary' className='hover:-translate-y-1' onClick={() => setShowDonationModal(true)}>
                    DOAR {item.amount}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" size="lg" >
              <i className="fas fa-dollar-sign mr-2"></i>
              ESCOLHER OUTRO VALOR
            </Button>
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Histórias de Transformação
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pessoas reais cujas vidas foram transformadas pelos nossos projetos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {transformationStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-gray-600 text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{story.name}</h4>
                      <p className="text-sm text-gray-600">{story.age}</p>
                      <p className="text-xs text-gray-500">{story.location}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 italic mb-6 leading-relaxed">
                    {story.text}
                  </p>

                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <p className="text-xs font-semibold text-green-700 mb-2">Transformação</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{story.from}</span>
                      <i className="fas fa-arrow-right text-green-600 mx-2"></i>
                      <span className="text-green-700 font-semibold">{story.to}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Doação Mensal:</p>
                    <p className="text-sm font-bold text-blue-900">{story.donation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" size="lg" className="text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
              <i className="fa-regular fa-heart mr-2"></i>
              QUERO TRANSFORMAR UMA VIDA TAMBÉM
            </Button>
          </div>
        </div>
      </section>

      {/* Urgent Cases Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-red-200">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-red-100 border border-red-300 rounded-full px-6 py-2 mb-4">
              <p className="text-sm font-bold text-red-600">
                <i className="fa-regular fa-clock mr-2"></i> NECESSIDADES URGENTES
              </p>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Ajude Agora: Tempo é Crucial
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Estas campanhas têm prazo e precisão específicos para metas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {urgentCases.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-heart text-red-500 text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm font-semibold text-primary">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Meta Atingida</span>
                      <span className="font-bold text-gray-900">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button variant="red" className="w-full">
                    {item.buttonText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust-section" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Por Que Confiar no Instituto Sublim?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparência, resultados e compromisso com cada doador
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
            <div className="bg-teal-50 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">+{vidasTransformadas.toLocaleString()}</div>
              <div className="text-gray-800 font-semibold mb-2">Vidas Transformadas</div>
              <div className="text-sm text-gray-600">Pessoas diretamente beneficiadas em +4 anos</div>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">{recursosEmProjetos}%</div>
              <div className="text-gray-800 font-semibold mb-2">Recursos em Projetos</div>
              <div className="text-sm text-gray-600">Apenas 5% para custos operacionais</div>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">{transparencia}%</div>
              <div className="text-gray-800 font-semibold mb-2">Transparência</div>
              <div className="text-sm text-gray-600">Relatórios públicos mensais de impacto</div>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-800 font-semibold mb-2">Suporte ao Doador</div>
              <div className="text-sm text-gray-600">Canal direto para esclarecimentos</div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl py-6 flex justify-center gap-12 text-gray-600">
            <div className="flex items-center gap-2">
              <i className="fas fa-shield-alt text-green-600"></i>
              <span className="text-sm font-medium">Transação 100% Segura</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-blue-600"></i>
              <span className="text-sm font-medium">Certificação SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-award text-purple-600"></i>
              <span className="text-sm font-medium">ONG Certificada</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gradient-to-r from-green-700 via-teal-600 to-blue-700">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              O Momento é Agora
            </h2>
            <p className="text-xl lg:text-2xl mb-10 text-white/95 leading-relaxed">
              Enquanto você lê isso, famílias inteiras estão esperando uma oportunidade. Sua doação não é apenas um gesto de bondade - é a diferença entre desespero e esperança.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
              <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <i className="fa-regular fa-heart"></i>
                DOAÇÃO MENSAL (Recomendado)
              </button>
              <button className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <i className="fas fa-hand-holding-heart"></i>
                DOAÇÃO ÚNICA (Impacto Imediato)
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-between items-center text-sm text-white/90 mb-6">
              <button className="w-full hover:underline flex items-center justify-center gap-2">
                Ver Nossa Transparência <i className="fas fa-arrow-right"></i>
              </button>
              <span className="hidden sm:inline">•</span>
              <button className="w-full hover:underline flex items-center justify-center gap-2">
                Fale Conosco <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            <div className="border-t border-white/30 pt-6 text-sm text-white/80">
              <p className="mb-2">
                Instituto Sublim • CNPJ: 12.345.678/0001-90 • Certificação de Utilidade Pública
              </p>
              <p>
                Sua doação é dedutível no Imposto de Renda
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Doação */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 sm:p-6" onClick={() => setShowDonationModal(false)}>
          <div className="w-[520px] bg-gray-100 rounded-2xl sm:rounded-3xl relative shadow-2xl max-h-[95vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Botão Fechar */}
            <button
              onClick={() => setShowDonationModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-400 hover:bg-gray-500 text-white flex items-center justify-center text-lg sm:text-xl font-bold transition-colors z-10"
            >
              X
            </button>

            {/* Conteúdo do Modal */}
            <div className="p-6 sm:p-8 flex flex-col items-center text-center">
              {/* Logo */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6 flex items-center justify-center">
                <img 
                  src="/images/sublim_selo.png" 
                  alt="Instituto Sublim" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Título e Descrição */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  <strong>R$ 50,00: </strong><span className="font-normal">Dignidade imediata</span>
                </h2>
                <p className="text-gray-700 text-xs sm:text-sm italic leading-relaxed px-2">
                  Garante um Kit Completo de Higiene Pessoal e apoio básico para uma família vulnerável.
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white p-3 sm:p-4 rounded-xl mb-4 sm:mb-6">
                <div className="w-50 h-50 flex items-center justify-center">
                  <img 
                    src="/images/qrcode-pix.png" 
                    alt="QR Code PIX" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 flex items-center justify-center text-gray-500"><i class="fas fa-qrcode text-5xl sm:text-6xl"></i></div>';
                    }}
                  />
                </div>
              </div>

              {/* Chave PIX */}
              <div className="font-body mb-2">
                <p className="text-primary-dark text-xs sm:text-sm px-2">
                  Chave Pix (CNPJ): <strong>39.976.495/0001-24</strong>
                </p>
              </div>

              {/* Frase de Efeito */}
              <p className="text-primary-700 font-medium text-base mb-4 sm:mb-6 italic px-2">
                Mais que acolher, é transformar!
              </p>

              {/* Botão Copiar Chave PIX */}
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full bg-[#C4FF0E] hover:bg-[#B0E60D] text-gray-900 font-bold text-base sm:text-lg py-3 sm:py-4"
                onClick={() => {
                  navigator.clipboard.writeText('39.976.495/0001-24');
                  alert('Chave PIX copiada com sucesso!');
                }}
              >
                COPIAR CHAVE PIX
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransformLivesDonation;
