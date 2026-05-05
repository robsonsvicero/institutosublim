import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

const TransformLivesDonation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [donationType, setDonationType] = useState('monthly');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [modalData, setModalData] = useState(null);
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

  const [transformationStories, setTransformationStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [erroStories, setErroStories] = useState(false);

  const carregarHistorias = async () => {
    setLoadingStories(true);
    setErroStories(false);

    const { data, error } = await supabase
      .from('depoimentos')
      .select('*')
      .eq('tipo', 'beneficiado')
      .eq('ativo', true)
      .order('ordem', { ascending: true });

    if (error) {
      setErroStories(true);
      setTransformationStories([]);
    } else {
      setTransformationStories(data || []);
    }

    setLoadingStories(false);
  };

  useEffect(() => {
    carregarHistorias();
  }, []);

  const impactItems = [
    {
      id: 'impact-50',
      icon: 'fa-graduation-cap',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      amount: 'R$ 50',
      value: 50,
      label: 'valor do impacto',
      title: 'Reforço escolar para 1 criança por 1 mês',
      description: 'Material didático, acompanhamento pedagógico e lanche',
      qrCode: '/images/qrcode-pix-50.png',
      impactTitle: 'Dignidade imediata',
      impactDesc: 'Garante um Kit Completo de Higiene Pessoal e apoio básico para uma família vulnerável.'
    },
    {
      id: 'impact-100',
      icon: 'fa-home',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
      amount: 'R$ 100',
      value: 100,
      label: 'valor do impacto',
      title: 'Cesta básica completa para 1 família',
      description: 'Alimentação para 30 dias + produtos de higiene',
      qrCode: '/images/qrcode-pix-100.png',
      impactTitle: 'Segurança Alimentar',
      impactDesc: 'Garante uma cesta básica completa para uma família em situação de vulnerabilidade.'
    },
    {
      id: 'impact-150',
      icon: 'fa-briefcase',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      amount: 'R$ 150',
      value: 150,
      label: 'valor do impacto',
      title: 'Curso de capacitação profissional completo',
      description: 'Informática, vendas ou empreendedorismo para 1 pessoa',
      qrCode: '/images/qrcode-pix-150.png',
      impactTitle: 'Geração de Renda',
      impactDesc: 'Financia a capacitação profissional de um jovem para o mercado de trabalho.'
    },
    {
      id: 'impact-300',
      icon: 'fa-users',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      amount: 'R$ 300',
      value: 300,
      label: 'valor do impacto',
      title: 'Apoio integral para 1 família por 3 meses',
      description: 'Assistência social, educação e capacitação completa',
      qrCode: '/images/qrcode-pix-300.png',
      impactTitle: 'Transformação Familiar',
      impactDesc: 'Proporciona acompanhamento integral para que uma família conquiste autonomia.'
    }
  ];

  const handleOpenModal = (data) => {
    setModalData(data);
    setShowDonationModal(true);
  };

  const urgentCases = [
    // {
    //   title: 'Criança Escala Profissional',
    //   subtitle: 'R$ 50 por mês',
    //   description: 'Ajuda a oferecer ao nosso instituto a pagar por 3 meses de bolsa de estudos',
    //   progress: 85,
    //   buttonText: 'AJUDAR AGORA'
    // },
    // {
    //   title: 'Matheus Sarmêlo',
    //   subtitle: 'R$ 100 por mês',
    //   description: 'Ajuda a oferecer formação para uma pessoa que não tem condições de pagar',
    //   progress: 70,
    //   buttonText: 'AJUDAR AGORA'
    // },
    {
      title: 'Aluguel do Instituto',
      subtitle: 'Meta: R$ 2.200 / mês',
      description: 'Ajude-nos a manter nossa sede aberta para continuar atendendo centenas de famílias.',
      progress: 10,
      buttonText: 'AJUDAR AGORA',
      value: null, // Valor aberto
      qrCode: '/images/qrcode-pix-aberto.png',
      impactTitle: 'Manutenção da Sede',
      impactDesc: 'Sua doação ajuda a pagar o aluguel e custos fixos, mantendo nossos projetos vivos.'
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
                  <i className="fas fa-heart mr-2"></i> Transformando Vidas Juntos
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
                  icon="fas fa-heart"
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

      {/* Impact Section */}
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

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {impactItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-w-[260px] max-w-[300px]">
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
                  <Button variant='primary' className='hover:-translate-y-1' onClick={() => handleOpenModal(item)}>
                    DOAR {item.amount}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" size="lg" onClick={() => handleOpenModal({
              value: null,
              qrCode: '/images/qrcode-pix-aberto.png',
              impactTitle: 'Qualquer Valor',
              impactDesc: 'Sua doação espontânea é fundamental para nossos projetos.'
            })}>
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

          {loadingStories ? (
            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 p-6 animate-pulse w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-w-[260px] max-w-[300px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-teal-100 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-3 w-2/3 bg-teal-100 rounded mb-2"></div>
                      <div className="h-3 w-1/3 bg-teal-100 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-teal-100 rounded"></div>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-teal-100 rounded mb-2"></div>
                  <div className="h-3 w-11/12 bg-teal-100 rounded mb-2"></div>
                  <div className="h-3 w-10/12 bg-teal-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : erroStories ? (
            <div className="text-center">
              <p className="text-gray-500 mb-4">Nao foi possivel carregar as historias no momento.</p>
              <button
                type="button"
                onClick={carregarHistorias}
                className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Tentar novamente
              </button>
            </div>
          ) : transformationStories.length === 0 ? (
            <p className="text-center text-gray-500">Ainda nao ha historias publicadas.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
              {transformationStories.map((story, index) => (
                <div key={index} className="bg-gradient-to-b from-teal-50 to-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-w-[260px] max-w-[300px]">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-user text-gray-600 text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base">{story.nome}</h4>
                        <p className="text-sm text-gray-600">{story.idade}</p>
                        <p className="text-xs text-gray-500">{story.localizacao}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 italic mb-6 leading-relaxed">
                      {story.texto}
                    </p>

                    {(story.transformacao_de || story.transformacao_para) && (
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <p className="text-xs font-semibold text-green-700 mb-2">Transformação</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">{story.transformacao_de || '-'}</span>
                          <i className="fas fa-arrow-right text-green-600 mx-2"></i>
                          <span className="text-green-700 font-semibold">{story.transformacao_para || '-'}</span>
                        </div>
                      </div>
                    )}

                    {story.doacao && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-xs font-semibold text-blue-700 mb-1">Doação Mensal:</p>
                        <p className="text-sm font-bold text-blue-900">{story.doacao}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
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

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {urgentCases.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[300px] max-w-[380px]">
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

                  <Button variant="red" className="w-full" onClick={() => handleOpenModal(item)}>
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

          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto mb-12">
            <div className="bg-teal-50 rounded-2xl p-8 text-center w-full sm:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] min-w-[240px] max-w-[280px]">
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
              <Link to="/doacao-mensal" className="w-full">
                <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <i className="fas fa-heart"></i>
                  DOAÇÃO MENSAL (Recomendado)
                </button>
              </Link>
              <button 
                onClick={() => document.getElementById('impact-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
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
      {showDonationModal && modalData && (
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
                  {modalData.value ? (
                    <><strong>R$ {modalData.value.toFixed(2).replace('.', ',')}: </strong><span className="font-normal">{modalData.impactTitle}</span></>
                  ) : (
                    <><strong>Valor Livre: </strong><span className="font-normal">{modalData.impactTitle}</span></>
                  )}
                </h2>
                <p className="text-gray-700 text-xs sm:text-sm italic leading-relaxed px-2">
                  {modalData.impactDesc}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white p-3 sm:p-4 rounded-xl mb-4 sm:mb-6">
                <div className="w-50 h-50 flex items-center justify-center">
                  <img
                    src={modalData.qrCode}
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
