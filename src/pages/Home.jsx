import React, { useState, useEffect } from 'react';
import PreLoader from '../components/PreLoader.jsx';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { supabase } from '../lib/supabaseClient';

// Dados das seções
const TRANSPARENCY_CARDS = [
  {
    icon: 'fas fa-users',
    iconColor: 'text-white/90',
    bgColor: 'from-green-500 to-green-600',
    value: '9.000',
    label: 'Famílias Impactadas',
    type: 'stat'
  },
  {
    icon: 'fas fa-box',
    iconColor: 'text-yellow-500',
    bgColor: 'from-yellow-400 to-yellow-500',
    value: '200',
    label: 'Cestas Básicas em 2025',
    type: 'stat'
  },
  {
    icon: 'fas fa-gift',
    iconColor: 'text-pink-500',
    bgColor: 'from-pink-400 to-pink-500',
    value: '450',
    label: 'Famílias Natal Solidário',
    type: 'stat'
  }
];



const IMPACT_PROJECTS = [
  {
    badge: 'ATIVO',
    badgeColor: 'bg-orange-500',
    icon: 'fa-solid fa-graduation-cap',
    iconColor: 'text-orange-500',
    title: 'Capacitação Profissional',
    subtitle: 'Formação • Emprego • Autonomia Financeira',
    description: 'Cursos de capacitação profissional que geram renda e autonomia para famílias da Zona Norte, com ofertas empresariais para inserção no mercado de trabalho.',
    stat: '320+',
    statLabel: 'pessoas formadas'
  },
  {
    badge: 'CRESCENDO',
    badgeColor: 'bg-teal-500',
    icon: 'fa-solid fa-book',
    iconColor: 'text-teal-500',
    title: 'Oficinas Culturais e Esportivas',
    subtitle: 'Arte • Esporte • Desenvolvimento Social',
    description: 'Oficinas de música, dança, teatro, futebol e outras modalidades que fortalecem vínculos comunitários e oferecem alternativas saudáveis para crianças e jovens.',
    stat: '180+',
    statLabel: 'jovens participantes'
  },
  {
    badge: 'URGENTE',
    badgeColor: 'bg-red-500',
    icon: 'fa-solid fa-bolt',
    iconColor: 'text-red-500',
    title: 'Ações Emergenciais',
    subtitle: 'Apoio • Alimentação • Festividades',
    description: 'Distribuição de cestas básicas, ações de Natal e outras festividades que fortalecem os laços comunitários e oferecem suporte em momentos críticos.',
    stat: '450+',
    statLabel: 'famílias assistidas'
  }
];

const PARTNERSHIP_STATS = [
  {
    number: '25+',
    label: 'Empresas Parceiras',
    description: 'Colaborando para o desenvolvimento social',
    color: 'bg-blue-500'
  },
  {
    number: '45+',
    label: 'Projetos Ativos',
    description: 'Iniciativas em andamento com impacto real',
    color: 'bg-green-600'
  },
  {
    number: '100%',
    label: 'Transparência',
    description: 'Relatórios detalhados de todas as ações',
    color: 'bg-orange-500'
  }
];

// Componentes internos
const TransparencyCard = ({ card }) => {
  if (card.type === 'stat') {
    return (
      <div className={`flex flex-col justify-between bg-gradient-to-br ${card.bgColor} rounded-2xl shadow-xl p-8 text-white text-center transform hover:scale-105 transition-transform`}>
        <div className="mb-4">
          <i className={`${card.icon} text-5xl ${card.iconColor}`} aria-hidden="true"></i>
        </div>
        <div className="text-5xl font-bold mb-2">{card.value}</div>
        <div className="text-lg font-semibold mb-1">{card.label}</div>
        <div className="w-40 h-1 bg-primary mx-auto mt-4"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col justify-between bg-${card.bgColor} rounded-2xl shadow-xl p-8 text-center border border-gray-200 transform hover:scale-105 transition-transform`}>
      <div className="mb-4">
        <i className={`${card.icon} text-5xl ${card.iconColor}`} aria-hidden="true"></i>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
      <p className="text-gray-600 mb-6">{card.description}</p>
      <button className={`${card.buttonColor} text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2`}>
        <i className={card.buttonIcon} aria-hidden="true"></i>
        {card.buttonText}
      </button>
    </div>
  );
};

const WorkshopCard = ({ workshop }) => (
  <div className="flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 relative">
    {workshop.closed && (
      <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">Encerrado</span>
    )}
    <div>
      <div className="mb-4">
        <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {workshop.category}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        {workshop.icon && (
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
            <i className={`${workshop.icon} text-lg`}></i>
          </div>
        )}
        <h3 className="text-xl font-bold text-primary-dark">{workshop.title}</h3>
      </div>

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
          <span className="text-gray-600">Alunos:</span>
          <span className="font-semibold text-teal-700">{workshop.students}</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-xs text-gray-600 mb-1">Próxima Turma</p>
        <p className="text-sm font-bold text-gray-900">{workshop.next_class}</p>
      </div>
    </div>
    <a href="/inscricao-oficinas" className="w-full">
      <Button variant="secondary" className="w-full">
        Inscrições Abertas
      </Button>
    </a>
  </div>
);

const ImpactProjectCard = ({ project }) => (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border border-gray-200 flex flex-col flex-grow">
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 opacity-90"></div>
      <div className="absolute top-4 right-4">
        <span className={`${project.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
          {project.badge}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <i className={`${project.icon} text-4xl ${project.iconColor}`} aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div className="p-6 flex flex-col justify-between h-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {project.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {project.subtitle}
      </p>
      <p className="text-gray-700 mb-6 leading-relaxed">
        {project.description}
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="text-3xl font-bold text-teal-600 mb-1">{project.stat}</div>
        <div className="text-sm text-gray-600">{project.statLabel}</div>
      </div>
    </div>
  </div>
);

const PartnershipStatCard = ({ stat }) => (
  <div className="text-center">
    <div className={`w-24 h-24 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
      <span className="text-3xl font-bold text-white">{stat.number}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.label}</h3>
    <p className="text-gray-600">{stat.description}</p>
  </div>
);

const SectionTitle = ({ children, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {children}
    </h2>
    {subtitle && (
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
  </div>
);

export default function Home() {
  const [showPreLoader, setShowPreLoader] = useState(false);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem('preloaderShown')) {
      setShowPreLoader(true);
      sessionStorage.setItem('preloaderShown', 'true');
    }
  }, []);

  useEffect(() => {
    async function fetchWorkshops() {
      const { data } = await supabase
        .from('cursos_oficinas')
        .select('*')
        .eq('closed', false)
        .order('created_at', { ascending: false });
      setWorkshops(data || []);
    }
    fetchWorkshops();
  }, []);
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* {showPreLoader && <PreLoader onFinish={() => setShowPreLoader(false)} />} */}
      <div className="bg-white">
        {/* Hero Section Otimizada */}
        <section
          id="home"
          className="w-full hero-bg h-[780px] flex items-center relative pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px]"
          style={{ backgroundImage: "url('/images/hero-photo.png')" }}>

          <div className="absolute inset-0 hero-overlay z-0"></div>

          <div className="container mx-auto mt-24 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Sua doação transforma a Zona Norte.<br />
                <span className="text-white/90">Ajude o Instituto Sublim a mudar vidas.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
                Já impactamos <strong>9.000 famílias</strong> com necessidades básicas.<br />
                Em 2025, entregamos <strong>200 cestas básicas</strong> e assistimos <strong>450 famílias</strong> no Natal Solidário.<br />
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link className="w-full" to="/doacao" onClick={handleLinkClick}>
                  <Button size="lg" className="w-full" variant="primary" icon="fas fa-heart">
                    DOE AGORA
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

        {/* Transparency Section */}
        <section id="transparency" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
          <div className="container mx-auto">
            <SectionTitle subtitle="Acreditamos que a confiança é construída através da transparência total em nossas ações e resultados.">
              Transparência é Nosso Compromisso
            </SectionTitle>

            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
              {TRANSPARENCY_CARDS.map((card, idx) => (
                <div key={idx} className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[280px] max-w-[350px]">
                  <TransparencyCard card={card} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History Section */}
        <section id="history" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-white">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/our-storie.png"
                    alt="Carol Andrade com crianças"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Nossa História: A Determinação que Transforma Vidas
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Carol Andrade transformou sua jornada de superação na Zona Norte de São Paulo em um propósito inabalável. Desde cedo, após enfrentar adversidades e abusos, nasceu a semente de que faria o possível para que nenhuma criança passasse por aquilo.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Toda essa dor moldou uma mulher forte e determinada. Hoje, o Instituto Sublim é a materialização dessa força, usando a transparência e a união para oferecer apoio e oportunidades reais para as 200 famílias cadastradas da periferia.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Sua história é a inspiração que nos move a construir um futuro mais justo e digno.
                </p>
                <Link to="/nossa-historia" onClick={handleLinkClick}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2 w-full lg:w-[50%]">
                    Leia a História Completa
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Workshops Section */}
        <section id="workshops" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
          <div className="container mx-auto">
            <SectionTitle subtitle="Programas estruturados que geram oportunidades concretas de trabalho e renda">
              Oficinas e Capacitações
            </SectionTitle>

            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
              {workshops.map((workshop) => (
                <div key={workshop.id} className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[300px] max-w-[380px] flex">
                  <WorkshopCard workshop={workshop} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-white">
          <div className="container mx-auto">
            <SectionTitle subtitle="Conheça os pilares de nossa atuação e como transformamos recursos em oportunidades reais.">
              Onde Sua Doação Acontece
            </SectionTitle>

            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
              {IMPACT_PROJECTS.map((project, idx) => (
                <div key={idx} className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[300px] max-w-[380px] flex">
                  <ImpactProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Onde Atuamos Section */}
        <section id="onde-atuamos" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
          <div className="container mx-auto">
            <SectionTitle subtitle="Veja os bairros da Zona Norte de São Paulo onde o Instituto Sublim atua e transforma vidas.">
              Onde Atuamos
            </SectionTitle>
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <img src="/images/mapa-zona-norte.png" alt="Mapa Zona Norte" className="rounded-xl shadow-xl w-full" />
              </div>
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-primary">Bairros Atendidos:</h3>
                <ul className="grid grid-cols-2 gap-2 text-lg text-gray-700">
                  <li>Vila Aurora</li>
                  <li>Comunidade da Paz</li>
                  <li>São João</li>
                  <li>Corisco</li>
                  <li>Filhos da Terra</li>
                  <li>Jaçanã</li>
                  <li>Vila Albertina</li>
                  <li>Cachoeira</li>
                  <li>Tremembé</li>
                  <li>Jardim Brasil</li>
                  <li>Vila Ede</li>
                  <li>Imirim</li>
                  <li>Pery</li>
                  <li>Sucupira</li>
                  <li>Vila Nova Galvão</li>
                  <li>Pery Alto</li>
                  <li>Casa Verde</li>
                  <li>Boi Malhado</li>
                  <li>Santana</li>
                  <li>Tucuruvi</li>
                  <li>Mandaqui</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section id="partnerships" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-100">
          <div className="container mx-auto">
            <SectionTitle subtitle="Através de parcerias estratégicas e utilização de Leis de Incentivo, sua empresa pode fazer parte desta transformação social enquanto obtém benefícios fiscais e fortalece sua responsabilidade social corporativa.">
              Sua Empresa Pode Mudar Milhares de Vidas
            </SectionTitle>

            <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto mb-12">
              {PARTNERSHIP_STATS.map((stat, idx) => (
                <div key={idx} className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] min-w-[240px] max-w-[300px]">
                  <PartnershipStatCard stat={stat} />
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <Link className="w-full" to="/seja-parceiro" onClick={handleLinkClick}>
                <Button className='w-full lg:w-[30%]' variant="primary" icon="fas fa-handshake" iconPosition="left">
                  Venha ser Nosso Parceiro
                </Button>
              </Link>
            </div>

            <p className="text-center text-gray-600 text-sm">
              Junte-se a empresas visionárias que escolheram o Instituto Sublim para multiplicar seu impacto social com transparência total e resultados mensuráveis.
            </p>
          </div>
        </section>

        {/* Contact/CTA Section */}


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

            <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
              {/* Monthly Donation Card */}
              <div className="w-full md:w-[calc(50%-2rem)] max-w-[450px] bg-gradient-to-br from-green-500 via-teal-500 to-blue-600 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
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

                  <Link to="/doacao-mensal">
                    <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-xl border-2 border-white/30 transition-all duration-300">
                      DOAÇÃO MENSAL
                    </button>
                  </Link>
                </div>
              </div>

              {/* Single Donation Card */}
              <div className="w-full md:w-[calc(50%-2rem)] max-w-[450px] bg-gradient-to-br from-fuchsia-500 via-pink-500 to-pink-600 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
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
                  <Link to="/doacao">
                    <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-xl border-2 border-white/30 transition-all duration-300">
                      DOAÇÃO ÚNICA
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}