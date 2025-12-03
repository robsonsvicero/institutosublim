import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';

// Dados das seções
const TRANSPARENCY_CARDS = [
  {
    icon: 'fas fa-users',
    iconColor: 'text-white/90',
    bgColor: 'from-green-500 to-green-600',
    value: '200',
    label: 'Famílias Cadastradas',
    type: 'stat'
  },
  {
    icon: 'fas fa-download',
    iconColor: 'text-blue-600',
    bgColor: 'white',
    title: 'Relatório de Impacto 2024',
    description: 'Dados completos de nossas ações',
    buttonText: 'Baixar PDF',
    buttonIcon: 'far fa-file-pdf',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
    type: 'action'
  },
  {
    icon: 'fas fa-check-circle',
    iconColor: 'text-green-600',
    bgColor: 'white',
    title: 'CNPJ e Certificações',
    description: 'Documentação oficial e legal',
    buttonText: 'Ver Documentos',
    buttonIcon: 'fas fa-award',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    type: 'action'
  }
];

const WORKSHOPS = [
  {
    category: 'Empreendedorismo',
    title: 'Gestão de Pequenos Negócios',
    frequency: '2x por semana',
    duration: '2 meses',
    graduates: '156 formados',
    nextClass: '22/Jan/2026'
  },
  {
    category: 'Tecnologia',
    title: 'Manutenção de Computadores',
    frequency: '2x por semana',
    duration: '3 meses',
    graduates: 'NOVA OFICINA',
    nextClass: '15/Fev/2026'
  },
  {
    category: 'Educação',
    title: 'Alfabetização de Adultos',
    frequency: 'Diária',
    duration: '6 meses',
    graduates: '89 alfabetizados',
    nextClass: '08/Fev/2026'
  },
  {
    category: 'Arte e Cultura',
    title: 'Iniciação Musical',
    frequency: '3x por semana',
    duration: '6 meses',
    graduates: '40 formados',
    nextClass: '05/Mar/2026'
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
  <div className="flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200">
    <div className="mb-4">
      <span className="text-sm font-semibold text-teal-500">
        {workshop.category}
      </span>
    </div>

    <h3 className="text-xl font-bold text-primary-dark mb-6">
      {workshop.title}
    </h3>

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
        <span className="font-semibold text-teal-700">{workshop.graduates}</span>
      </div>
    </div>

    <div className="bg-gray-50 rounded-lg p-3 mb-4">
      <p className="text-xs text-gray-600 mb-1">Próxima Turma</p>
      <p className="text-sm font-bold text-gray-900">{workshop.nextClass}</p>
    </div>
    <a href="/inscricao-oficinas">
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

      {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
        <span>Saiba Mais</span>
        <i className="fas fa-arrow-right" aria-hidden="true"></i>
      </button> */}
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
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        id="home"
        className="w-full hero-bg h-[780px] flex items-center relative pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px]"
        style={{ backgroundImage: "url('/images/hero-photo.png')" }}>

        <div className="absolute inset-0 hero-overlay z-0"></div>

        <div className="container mx-auto mt-24 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transformando vidas, <br />
              <span className="text-white/90">construindo um futuro</span><br />
              <span className="text-primary">sustentável</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
              Conectamos o poder da solidariedade à <strong>determinação </strong>de mais de <strong>200 famílias </strong>
              na Zona Norte de SP, promovendo o desenvolvimento comunitário e a chance de um futuro digno.
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

      {/* Transparency Section */}
      <section id="transparency" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <SectionTitle subtitle="Acreditamos que a confiança é construída através da transparência total em nossas ações e resultados.">
            Transparência é Nosso Compromisso
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TRANSPARENCY_CARDS.map((card, idx) => (
              <TransparencyCard key={idx} card={card} />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {WORKSHOPS.map((workshop, idx) => (
              <WorkshopCard key={idx} workshop={workshop} />
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

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {IMPACT_PROJECTS.map((project, idx) => (
              <ImpactProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-100">
        <div className="container mx-auto">
          <SectionTitle subtitle="Através de parcerias estratégicas e utilização de Leis de Incentivo, sua empresa pode fazer parte desta transformação social enquanto obtém benefícios fiscais e fortalece sua responsabilidade social corporativa.">
            Sua Empresa Pode Mudar Milhares de Vidas
          </SectionTitle>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {PARTNERSHIP_STATS.map((stat, idx) => (
              <PartnershipStatCard key={idx} stat={stat} />
            ))}
          </div>

          <div className="text-center mb-8">
            <Link className="w-full" to="/seja-parceiro" onClick={handleLinkClick}>
              <Button className='w-full lg:w-[30%]' variant="primary" icon="fas fa-handshake" iconPosition="left">
                Fale com o Departamento de Parcerias
              </Button>
            </Link>
          </div>

          <p className="text-center text-gray-600 text-sm">
            Entre em contato e descubra como sua empresa pode fazer a diferença
          </p>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Faça Parte Dessa Transformação
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Sua contribuição pode mudar a vida de uma criança, jovem ou família inteira.
            Juntos, construímos um futuro melhor para todos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
            <Link to="/doacao" onClick={handleLinkClick} className="flex-1">
              <Button variant="primary" size="lg" icon="far fa-heart" className="w-full bg-primary hover:bg-primary/90">
                QUERO TRANSFORMAR VIDAS
              </Button>
            </Link>
            <Link to="/seja-voluntario" onClick={handleLinkClick} className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Seja Voluntário
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}