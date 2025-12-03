import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Modal } from '../components/ui';

export default function OurProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Estados para animação dos números
  const [pessoasApoiadas, setPessoasApoiadas] = useState(0);
  const [anosOperacao, setAnosOperacao] = useState(0);
  const [taxaEmpregabilidade, setTaxaEmpregabilidade] = useState(0);
  const [comunidadesAtendidas, setComunidadesAtendidas] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const impactSectionRef = useRef(null);

  // Valores finais
  const pessoasApoiadasFinal = 7000;
  const anosOperacaoFinal = 4;
  const taxaEmpregabilidadeFinal = 95;
  const comunidadesAtendidasFinal = 45;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumbers();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (impactSectionRef.current) {
      observer.observe(impactSectionRef.current);
    }

    return () => {
      if (impactSectionRef.current) {
        observer.unobserve(impactSectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 1000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setPessoasApoiadas(Math.floor(pessoasApoiadasFinal * progress));
      setAnosOperacao(Math.floor(anosOperacaoFinal * progress));
      setTaxaEmpregabilidade(Math.floor(taxaEmpregabilidadeFinal * progress));
      setComunidadesAtendidas(Math.floor(comunidadesAtendidasFinal * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setPessoasApoiadas(pessoasApoiadasFinal);
        setAnosOperacao(anosOperacaoFinal);
        setTaxaEmpregabilidade(taxaEmpregabilidadeFinal);
        setComunidadesAtendidas(comunidadesAtendidasFinal);
      }
    }, interval);
  };

  const projects = [
    {
      id: 1,
      title: 'Parceiro Estratégico',
      description: 'Desenvolvendo parcerias sustentáveis com empresas',
      beneficiaries: '+2.100',
      workshops: '847',
      communities: '24',
      color: 'from-green-400 to-green-600',
      icon: '🤝',
      fullDescription: 'Programa que conecta empresas a projetos sociais...',
      activities: [
        'Banco Escolar',
        'Alfabetização de Adultos',
        'Curso de Informática',
        'Oficinas de Arte e Cultura'
      ]
    },
    {
      id: 2,
      title: 'Cuidando e Crescimento',
      description: 'Cuidado integral de crianças de 0 a 6 anos',
      beneficiaries: '+1.200',
      rate: '98%',
      centers: '36',
      color: 'from-purple-400 to-pink-500',
      icon: '👶',
      fullDescription: 'Programa de desenvolvimento infantil integral...',
      activities: [
        'Atividades de Desenvolvimento',
        'Nutrição',
        'Saúde Preventiva',
        'Educação Precoce'
      ]
    },
    {
      id: 3,
      title: 'Dignidade e Acolhimento',
      description: 'Apoio a famílias em situação de vulnerabilidade',
      families: '+3.700',
      meals: '15.600',
      kits: '+8.400',
      color: 'from-teal-400 to-cyan-600',
      icon: '🏠',
      fullDescription: 'Assistência emergencial e acolhimento...',
      activities: [
        'Distribuição de Cestas Básicas',
        'Kits de Higiene',
        'Acompanhamento Social',
        'Encaminhamento Profissional'
      ]
    }
  ];

  const transformationStories = [
    {
      name: 'John Doe',
      age: 37,
      location: 'Mandaqui, SP',
      transformation: 'Desempregado → Operador de Telemarketing',
      quote: '"O curso de informática mudou minha vida. Consegui meu primeiro emprego em uma empresa de telemarketing e hoje sustento minha família com dignidade."',
      image: '/images/volunteer1.jpg'
    },
    {
      name: 'Mary Jane',
      age: 34,
      location: 'Vila Penteado, SP',
      transformation: 'Desempregada → Operadora de Telemarketing',
      quote: '"O curso de informática mudou minha vida. Consegui meu primeiro emprego em uma empresa de telemarketing e hoje sustento minha família com dignidade."',
      image: '/images/volunteer2.jpg'
    },
    {
      name: 'John Doe',
      age: 37,
      location: 'Mandaqui, SP',
      transformation: 'Desempregado → Operador de Telemarketing',
      quote: '"O curso de informática mudou minha vida. Consegui meu primeiro emprego em uma empresa de telemarketing e hoje sustento minha família com dignidade."',
      image: '/images/volunteer1.jpg'
    },
    {
      name: 'Mary Jane',
      age: 34,
      location: 'Vila Penteado, SP',
      transformation: 'Desempregada → Operadora de Telemarketing',
      quote: '"O curso de informática mudou minha vida. Consegui meu primeiro emprego em uma empresa de telemarketing e hoje sustento minha família com dignidade."',
      image: '/images/volunteer2.jpg'
    }
  ];

  const workshops = [
    {
      category: 'Tecnologia',
      title: 'Informática e Digitação',
      frequency: '3x por semana',
      duration: '3 meses',
      students: '240 formados',
      nextClass: '15/Jan/2026'
    },
    {
      category: 'Empreendedorismo',
      title: 'Gestão de Pequenos Negócios',
      frequency: '2x por semana',
      duration: '2 meses',
      students: '156 formados',
      nextClass: '22/Jan/2026'
    },
    {
      category: 'Educação',
      title: 'Alfabetização de Adultos',
      frequency: 'Diária',
      duration: '6 meses',
      students: '89 alfabetizados',
      nextClass: '08/Fev/2026'
    },
    {
      category: 'Arte e Cultura',
      title: 'Iniciação Musical',
      frequency: '3x por semana',
      duration: '6 meses',
      students: '40 formados',
      nextClass: '05/Mar/2026'
    }
  ];

  const partners = [
    { name: 'Gerando Falcões', category: 'ONGs', logo: '/images/partners/gerando-falcoes.png' },
    { name: 'Vertem', category: 'Empresas', logo: '/images/partners/vertem.png' },
    { name: 'Fundação Everis', category: 'Fundações', logo: '/images/partners/everis.png' },
    { name: 'SEBRAE', category: 'Educação', logo: '/images/partners/sebrae.png' },
    { name: 'Caça Fome', category: 'ONGs', logo: '/images/partners/caca-fome.png' },
    { name: 'New School', category: 'Educação', logo: '/images/partners/new-school.png' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="w-full hero-bg h-[780px] flex items-center relative pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px]"
        style={{ backgroundImage: 'url(/images/projects-hero.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border-2 border-primary-500 px-4 py-2 rounded-full mb-6">
              <i className="fas fa-rocket text-sm text-primary-500"></i>
              <span className="text-sm font-semibold text-primary-500">+4 Anos Transformando Vidas</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Projetos que Geram Impacto
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
              Mais de 7.000 pessoas transformadas através de nossos três pilares de atuação: Geração de Oportunidades, Cuidado e Crescimento, e Dignidade e Acolhimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full">
              <Button variant="primary" size="lg" icon="fas fa-heart" className="bg-primary-500 hover:bg-primary-dark hover:text-white w-full">
                Apoie Nossos Projetos
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Ver Nosso Impacto
              </Button>
            </div>

            {/* Stats Card */}
            <div className="w-[366px] bg-white/95 backdrop-blur-sm rounded-2xl p-6 inline-block shadow-xl mt-4">
              <div className="flex flex-col items-center gap-3">
                <div className="text-4xl font-bold text-teal-500">+2.847</div>
                <div className="text-gray-900 font-semibold">Vidas Transformadas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section ref={impactSectionRef} className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nosso Impacto em Números
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Resultados concretos que demonstram a efetividade dos nossos projetos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {/* Card 1 - Pessoas Apoiadas */}
            <div className="bg-[#E8F5F1] rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <i className="fas fa-users text-3xl text-teal-600"></i>
              </div>
              <div className="text-5xl font-bold text-teal-600 mb-3">+{pessoasApoiadas.toLocaleString('pt-BR')}</div>
              <div className="text-gray-900 font-semibold text-base">Pessoas Apoiadas</div>
            </div>

            {/* Card 2 - Anos de Operação */}
            <div className="bg-[#E8F5F1] rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <i className="fas fa-calendar text-3xl text-blue-600"></i>
              </div>
              <div className="text-5xl font-bold text-blue-600 mb-3">+{anosOperacao}</div>
              <div className="text-gray-900 font-semibold text-base">Anos de Operação</div>
            </div>

            {/* Card 3 - Taxa de Empregabilidade */}
            <div className="bg-[#E8F5F1] rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <i className="fas fa-bullseye text-3xl text-primary-dark"></i>
              </div>
              <div className="text-5xl font-bold text-primary-dark mb-3">{taxaEmpregabilidade}%</div>
              <div className="text-gray-900 font-semibold text-base">Taxa de Empregabilidade</div>
            </div>

            {/* Card 4 - Comunidades Atendidas */}
            <div className="bg-[#E8F5F1] rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <i className="fas fa-map-marker-alt text-3xl text-purple-600"></i>
              </div>
              <div className="text-5xl font-bold text-purple-600 mb-3">{comunidadesAtendidas}</div>
              <div className="text-gray-900 font-semibold text-base">Comunidades Atendidas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nossos Três Pilares de Atuação
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Cada pilar representa uma abordagem específica para transformar vidas e comunidades inteiras na Zona Norte de São Paulo
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Patrocínio Estratégico - Card Grande */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-briefcase text-3xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Geração de Oportunidades</h3>
                  <p className="text-white/90 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}><strong>Capacitação e Emprego: </strong>Impulsionando jovens e mulheres ao mercado de trabalho, com foco em tecnologia e mentoria.</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-3xl font-bold mb-1">5</div>
                  <div className="text-sm text-white/80">Mães Indicadas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">3</div>
                  <div className="text-sm text-white/80">Jovens Empregados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">200</div>
                  <div className="text-sm text-white/80">Famílias Cadastradas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">3</div>
                  <div className="text-sm text-white/80">Certificações</div>
                </div>
              </div>
              <a href="/seja-parceiro">
                <Button variant="primary" className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl border border-white/30 transition-colors">
                  Apoie a Empregabilidade
                </Button>
              </a>
            </div>

            {/* Projetos Ativos Card 1 */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h4 className="font-bold text-lg mb-4">Projetos Ativos</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-teal-600 mt-0.5"></i>
                  <span className="text-sm text-gray-700"><strong>Oficina de Tecnologia: </strong>2x na semana - 1 ano de duração;</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-teal-600 mt-0.5"></i>
                  <span className="text-sm text-gray-700"><strong>Acolhimento para Mães: </strong>1x no mês.</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                <i className="fas fa-chart-line"></i>
                Resultados comprovados com impacto mensurável
              </p>
              <a href="/oficinas">
                <Button variant="link" className="text-teal-600 hover:text-teal-700 font-semibold text-sm mt-4 inline-flex items-center gap-2">
                  Conhecer Projetos Específicos <i className="fas fa-arrow-right"></i>
                </Button>
              </a>
            </div>

            {/* Projetos Ativos Card 2 */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h4 className="font-bold text-lg mb-4">Projetos Ativos</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-teal-600 mt-0.5"></i>
                  <span className="text-sm text-gray-700"><strong>Música: </strong>2x na semana - 1 ano de duração;</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-teal-600 mt-0.5"></i>
                  <span className="text-sm text-gray-700"><strong>Capoeira: </strong>1x na semana;</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-teal-600 mt-0.5"></i>
                  <span className="text-sm text-gray-700"><strong>Incentivo a Leitura: </strong>1x na semana;</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-teal-600 mt-0.5"></i>
                  <span className="text-sm text-gray-700"><strong>Cultura para Todos: </strong>passeios culturais (conforme ganho de ingressos).</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                <i className="fas fa-chart-line"></i>
                Resultados comprovados com impacto mensurável
              </p>
              <a href="/oficinas">
                <Button variant="link" className="text-teal-600 hover:text-teal-700 font-semibold text-sm mt-4 inline-flex items-center gap-2">
                  Conhecer Projetos Específicos <i className="fas fa-arrow-right"></i>
                </Button>
              </a>
            </div>

            {/* Cuidado e Crescimento */}
            <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-heart text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Cuidado e Desenvolvimento</h3>
                  <p className="text-white/90 text-sm"><strong>Desenvolvimento Pleno: </strong>Fomentamos o crescimento social, criativo e o apoio pedagógico para crianças e adolescentes.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-3xl font-bold mb-1">60</div>
                  <div className="text-sm text-white/80">Crianças Assistidas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">18</div>
                  <div className="text-sm text-white/80">Comunidades Atendidas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">7</div>
                  <div className="text-sm text-white/80">Oficinas Ativas</div>
                </div>
              </div>

              <a href="/seja-parceiro">
                <Button variant="primary" className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl border border-white/30 transition-colors">
                  Invista no Futuro
                </Button>
              </a>
            </div>

            {/* Dignidade e Acolhimento */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-hand-holding-heart text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Dignidade e Acolhimento</h3>
                  <p className="text-white/90 text-sm"><strong>Assistência e Vínculo: </strong>Garantimos o básico (higiene, alimentação) e fortalecemos o vínculo social nas comunidades;</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-3xl font-bold mb-1">200</div>
                  <div className="text-sm text-white/80">Famílias Cadastradas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">18</div>
                  <div className="text-sm text-white/80">Comunidades Atendidas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">+4</div>
                  <div className="text-sm text-white/80">Anos de Atuação</div>
                </div>
              </div>
              <a href="/seja-parceiro">
                <Button variant="primary" className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl border border-white/30 transition-colors">
                  Garantir Acolhimento
                </Button>
              </a>
            </div>

            {/* Projetos Ativos Card 3 */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h4 className="font-bold text-lg mb-4">Projetos Ativos</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-teal-600 mt-0.5"></i>
                  <span className="text-sm text-gray-700"><strong>Ações Comunitárias Fixas: </strong>Festas temáticas de Páscoa, Dia das Crianças e Natal;</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check-circle text-teal-600 mt-0.5"></i>
                  <span className="text-sm text-gray-700"><strong>Distribuição Contínua: </strong>Kits de higiene e alimentação</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                <i className="fas fa-chart-line"></i>
                Resultados comprovados com impacto mensurável
              </p>
              <a href="/oficinas">
                <Button variant="link" className="text-teal-600 hover:text-teal-700 font-semibold text-sm mt-4 inline-flex items-center gap-2">
                  Conhecer Projetos Específicos <i className="fas fa-arrow-right"></i>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Histórias de Transformação
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pessoas reais cujas vidas foram transformadas pelos nossos projetos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {transformationStories.map((story, idx) => (
              <div key={idx} className="bg-teal-50 rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
                {/* Foto Circular */}
                <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 overflow-hidden flex items-center justify-center">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                </div>

                {/* Nome */}
                <h4 className="font-bold text-lg text-gray-900 mb-1">{story.name}</h4>

                {/* Idade e Local */}
                <p className="text-sm text-gray-600 mb-4">
                  {story.age} anos
                  <br />
                  {story.location}
                </p>

                {/* Tag Transformação */}
                <div className="bg-lime-200 rounded-lg px-4 py-2 mb-4 w-full">
                  <p className="text-xs font-semibold text-gray-800">Transformação</p>
                  <p className="text-sm text-gray-700 mt-1">{story.transformation}</p>
                </div>

                {/* Citação */}
                <blockquote className="text-sm text-gray-700 italic leading-relaxed">
                  {story.quote}
                </blockquote>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Workshops */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Oficinas e Capacitações
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Programas estruturados que geram oportunidades concretas de trabalho e renda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {workshops.map((workshop, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                {/* Tag Categoria */}
                <div className="mb-4">
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                    {workshop.category}
                  </span>
                </div>

                {/* Título */}
                <h4 className="font-bold text-xl text-gray-900 mb-6">{workshop.title}</h4>

                {/* Informações */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frequência:</span>
                    <span className="font-semibold text-gray-900">{workshop.frequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duração:</span>
                    <span className="font-semibold text-gray-900">{workshop.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Formados:</span>
                    <span className="font-semibold text-teal-600">{workshop.students}</span>
                  </div>
                </div>

                {/* Próxima Turma */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-600 mb-1">Próxima Turma</p>
                  <p className="font-bold text-gray-900 text-base">{workshop.nextClass}</p>
                </div>

                {/* Botão */}
                <button className="w-full bg-primary-500 hover:bg-primary-700 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-colors">
                  Inscrições Abertas
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Parcerias Estratégicas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Juntos somos mais fortes na transformação social
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12 max-w-7xl mx-auto">
            {partners.map((partner, idx) => (
              <div key={idx} className="bg-[#E8F5F1] rounded-2xl shadow-sm p-8 flex flex-col items-center text-center">
                {/* Ícone Circular */}
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-building text-2xl text-gray-900"></i>
                </div>

                {/* Nome do Parceiro */}
                <h4 className="font-bold text-gray-900 mb-2 text-base">{partner.name}</h4>

                {/* Categoria */}
                <p className="text-sm text-gray-600">{partner.category}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-primary-500 hover:bg-primary-700 text-gray-900 font-bold py-3 px-8 rounded-lg inline-flex items-center gap-2 transition-colors shadow-md">
              <i className="fas fa-handshake"></i>
              Seja Nosso Parceiro
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gradient-to-r from-teal-400 via-blue-500 to-blue-700 text-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Prefere Falar Diretamente Conosco?
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Nossa equipe de parcerias está pronta para atender sua empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Card Doação Individual */}
            <div className="bg-blue-500/30 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <div className="w-14 h-14 bg-blue-400/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart text-2xl text-white"></i>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-center">Doação Individual</h3>
              <p className="text-white/90 text-center mb-6">Contribua diretamente para nossos projetos</p>

              <div className="space-y-2 mb-8">
                <div className="flex items-start justify-between text-sm">
                  <span className="font-semibold">R$ 50</span>
                  <span className="text-white/90 flex items-center gap-2">
                    <i className="fas fa-arrow-right text-xs"></i>
                    1 mês de reforço escolar
                  </span>
                </div>
                <div className="flex items-start justify-between text-sm">
                  <span className="font-semibold">R$ 150</span>
                  <span className="text-white/90 flex items-center gap-2">
                    <i className="fas fa-arrow-right text-xs"></i>
                    Curso completo de informática
                  </span>
                </div>
                <div className="flex items-start justify-between text-sm">
                  <span className="font-semibold">R$ 300</span>
                  <span className="text-white/90 flex items-center gap-2">
                    <i className="fas fa-arrow-right text-xs"></i>
                    1 família assistida por 3 meses
                  </span>
                </div>
              </div>
              <a href="/doacao">
                <Button variant='outline' className="border border-white/30 text-white hover:bg-white/20 hover:border-primary-dark/40 hover:text-primary-dark">
                  DOAR AGORA
                </Button>
              </a>

            </div>

            {/* Card Parceria Corporativa */}
            <div className="bg-blue-600/30 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <div className="w-14 h-14 bg-blue-500/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-building text-2xl text-white"></i>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-center">Parceria Corporativa</h3>
              <p className="text-white/90 text-center mb-6">Transforme seu ESG em impacto mensurável</p>

              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <i className="fas fa-check-circle text-white"></i>
                  <span>Transparência total nos resultados</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <i className="fas fa-check-circle text-white"></i>
                  <span>Certificações ESG reconhecidas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <i className="fas fa-check-circle text-white"></i>
                  <span>ROI social mensurável</span>
                </div>
              </div>
              <a href="/seja-parceiro">
                <Button variant='outline' className="border border-white/30 text-white hover:bg-white/20 hover:border-primary-dark/40 hover:text-primary-dark">
                  SEJA PARCEIRO
                </Button>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-center max-w-2xl mx-auto">
            <button className="text-white hover:text-white/80 font-semibold inline-flex items-center gap-2 transition-colors">
              Apoie Nossos Projetos
              <i className="fas fa-arrow-right text-sm"></i>
            </button>
            <span className="hidden sm:block text-white/50">•</span>
            <button className="text-white hover:text-white/80 font-semibold inline-flex items-center gap-2 transition-colors">
              Ver Nosso Impacto
              <i className="fas fa-arrow-right text-sm"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Modal Project Details */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="lg"
      >
        {selectedProject && (
          <div className="space-y-6">
            <p className="text-gray-700 text-lg">{selectedProject.fullDescription}</p>

            <div>
              <h4 className="font-bold text-lg mb-3">Atividades do Projeto:</h4>
              <ul className="space-y-2">
                {selectedProject.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start">
                    <i className="fas fa-check-circle text-primary mr-3 mt-1"></i>
                    <span className="text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 pt-6 border-t">
              <Button variant="primary" className="flex-1">
                Quero Apoiar Este Projeto
              </Button>
              <Button variant="secondary" className="flex-1" onClick={() => setSelectedProject(null)}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}