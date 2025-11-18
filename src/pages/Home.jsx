import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Modal } from '../components/ui';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        id="home"
        className="w-full hero-bg min-h-screen flex items-center relative"
        style={{ backgroundImage: "url('/images/hero-photo.png')" }}
      >
        <div className="absolute inset-0 hero-overlay z-0"></div>

        <div className="container mx-auto px-4 lg:px-12 relative z-10">
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
                <Button className="w-full" variant="primary" icon="fa-regular fa-heart">
                  DOAR AGORA
                </Button>
              </Link>
              <Link className="w-full" to="/nossos-projetos" onClick={handleLinkClick}>
                <Button className='w-full' variant="outline" icon="fa-solid fa-arrow-right" iconPosition="right">
                  Conheça Nossos Projetos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section id="transparency" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transparência é Nosso Compromisso
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Acreditamos que a confiança é construída através da transparência total em nossas ações e resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Verde com contador */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-8 text-white text-center transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <i className="fas fa-users text-5xl text-white/90"></i>
              </div>
              <div className="text-5xl font-bold mb-2">200</div>
              <div className="text-lg font-semibold mb-1">Famílias Cadastradas</div>
              <div className="w-40 h-1 bg-primary mx-auto mt-4"></div>
            </div>

            {/* Card 2 - Branco com download */}
            <div className="flex flex-col justify-between bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200 transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <i className="fas fa-download text-5xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Relatório de Impacto 2024</h3>
              <p className="text-gray-600 mb-6">Dados completos de nossas ações</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                <i className="far fa-file-pdf"></i>
                Baixar PDF
              </button>
            </div>

            {/* Card 3 - Branco com certificações */}
            <div className="flex flex-col justify-between bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-200 transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <i className="fas fa-check-circle text-5xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">CNPJ e Certificações</h3>
              <p className="text-gray-600 mb-6">Documentação oficial e legal</p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                <i className="fas fa-award"></i>
                Ver Documentos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
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
      <section id="workshops" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Oficinas e Capacitações
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Programas estruturados que geram oportunidades concretas de trabalho e renda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              {
                category: 'Tecnologia',
                title: 'Informática e Digitação',
                frequency: '3x por semana',
                duration: '3 meses',
                graduates: '240 formados',
                nextClass: '15/Jan/2026',
                categoryColor: 'text-teal-600'
              },
              {
                category: 'Empreendedorismo',
                title: 'Gestão de Pequenos Negócios',
                frequency: '2x por semana',
                duration: '2 meses',
                graduates: '156 formados',
                nextClass: '22/Jan/2026',
                categoryColor: 'text-teal-600'
              },
              {
                category: 'Educação',
                title: 'Alfabetização de Adultos',
                frequency: 'Diária',
                duration: '6 meses',
                graduates: '89 alfabetizados',
                nextClass: '08/Fev/2026',
                categoryColor: 'text-teal-600'
              },
              {
                category: 'Arte e Cultura',
                title: 'Iniciação Musical',
                frequency: '3x por semana',
                duration: '6 meses',
                graduates: '40 formados',
                nextClass: '05/Mar/2026',
                categoryColor: 'text-teal-600'
              }
            ].map((workshop, idx) => (
              <div key={idx} className="flex flex-col justify-between bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200">
                <div className="mb-4">
                  <span className={`text-sm font-semibold ${workshop.categoryColor}`}>
                    {workshop.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-6">
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
                    <span className="font-semibold text-teal-600">{workshop.graduates}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 mb-1">Próxima Turma</p>
                  <p className="text-sm font-bold text-gray-900">{workshop.nextClass}</p>
                </div>

                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                  Inscrições Abertas
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Onde Sua Doação Acontece
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conheça os pilares de nossa atuação e como transformamos recursos em oportunidades reais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                badge: 'ATIVO',
                badgeColor: 'bg-orange-500',
                image: '/images/capacitacao.jpg',
                icon: 'fa-solid fa-graduation-cap',
                iconColor: 'text-orange-500',
                title: 'Capacitação Profissional',
                subtitle: 'Formação • Emprego • Autonomia Financeira',
                description: 'Cursos de capacitação profissional que geram renda e autonomia para famílias da Zona Norte, com ofertas empresariais para inserção no mercado de trabalho.',
                stat: '320+',
                statLabel: 'pessoas formadas',
                gradient: 'from-green-500 via-teal-500 to-blue-600'
              },
              {
                badge: 'CRESCENDO',
                badgeColor: 'bg-teal-500',
                image: '/images/oficinas.jpg',
                icon: 'fa-solid fa-book',
                iconColor: 'text-teal-500',
                title: 'Oficinas Culturais e Esportivas',
                subtitle: 'Arte • Esporte • Desenvolvimento Social',
                description: 'Oficinas de música, dança, teatro, futebol e outras modalidades que fortalecem vínculos comunitários e oferecem alternativas saudáveis para crianças e jovens.',
                stat: '180+',
                statLabel: 'jovens participantes',
                gradient: 'from-green-500 via-teal-500 to-blue-600'
              },
              {
                badge: 'URGENTE',
                badgeColor: 'bg-red-500',
                image: '/images/acoes-emergenciais.jpg',
                icon: 'fa-solid fa-bolt',
                iconColor: 'text-red-500',
                title: 'Ações Emergenciais',
                subtitle: 'Apoio • Alimentação • Festividades',
                description: 'Distribuição de cestas básicas, ações de Natal e outras festividades que fortalecem os laços comunitários e oferecem suporte em momentos críticos.',
                stat: '450+',
                statLabel: 'famílias assistidas',
                gradient: 'from-green-500 via-teal-500 to-blue-600'
              }
            ].map((project, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border border-gray-200 flex flex-col flex-grow">
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}></div>
                  <div className="absolute top-4 right-4">
                    <span className={`${project.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {project.badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                      <i className={`${project.icon} text-4xl ${project.iconColor}`}></i>
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

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                    <span>Saiba Mais</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Sua Empresa Pode Mudar Milhares de Vidas
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Através de parcerias estratégicas e utilização de Leis de Incentivo, sua empresa pode fazer parte desta transformação social enquanto obtém benefícios fiscais e fortalece sua responsabilidade social corporativa.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
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
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-24 h-24 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-3xl font-bold text-white">{stat.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <Link className="w-full" to="/seja-parceiro" onClick={handleLinkClick}>
              <Button className='w-full' variant="primary" icon="fas fa-handshake" iconPosition="left">
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
      <section className="py-16 lg:py-24 bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Faça Parte Dessa Transformação
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Sua contribuição pode mudar a vida de uma criança, jovem ou família inteira.
            Juntos, construímos um futuro melhor para todos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
            <Link to="/doacao" onClick={handleLinkClick} className="flex-1">
              <button className="w-full bg-lime-400 hover:bg-lime-500 text-gray-900 font-bold py-4 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-3 text-lg">
                <i className="far fa-heart"></i>
                QUERO TRANSFORMAR VIDAS
              </button>
            </Link>
            <Link to="/seja-parceiro" onClick={handleLinkClick} className="flex-1">
              <button className="w-full bg-transparent hover:bg-white/10 text-white font-bold py-4 px-8 rounded-lg transition-colors border-2 border-white inline-flex items-center justify-center gap-3 text-lg">
                Seja Voluntário
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal de Exemplo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalhes da Oficina"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Esta é uma oficina completa que oferece capacitação profissional
            e desenvolvimento de habilidades essenciais para o mercado de trabalho.
          </p>
          <div className="space-y-2">
            <p><strong>Duração:</strong> 3 meses</p>
            <p><strong>Carga Horária:</strong> 120 horas</p>
            <p><strong>Formato:</strong> Presencial e Online</p>
            <p><strong>Certificado:</strong> Sim</p>
          </div>
          <div className="flex gap-4 pt-4">
            <Button variant="primary" className="flex-1">
              Inscrever-se Agora
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}