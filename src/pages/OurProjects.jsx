import React, { useState } from 'react';
import { Button, Card, Modal } from '../components/ui';

export default function OurProjects() {
  const [selectedProject, setSelectedProject] = useState(null);

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
      name: 'Ana Silva',
      age: 28,
      program: 'Dignidade e Acolhimento',
      quote: 'O Instituto mudou completamente a trajetória da minha família...',
      image: '/images/ana-story.jpg'
    },
    {
      name: 'Carlos Santos',
      age: 35,
      program: 'Parceiro Estratégico',
      quote: 'Consegui meu primeiro emprego formal através das oficinas...',
      image: '/images/carlos-story.jpg'
    },
    {
      name: 'Maria Oliveira',
      age: 42,
      program: 'Alfabetização de Adultos',
      quote: 'Aprendi a ler aos 40 anos e hoje ajudo meus filhos nos estudos...',
      image: '/images/maria-story.jpg'
    },
    {
      name: 'João Pedro',
      age: 19,
      program: 'Curso de Informática',
      quote: 'Da periferia para o mercado de tecnologia, realizei meu sonho...',
      image: '/images/joao-story.jpg'
    }
  ];

  const workshops = [
    {
      title: 'Informática e Digitação',
      participants: 245,
      duration: '3 meses',
      schedule: 'Seg/Qua/Sex - 14h às 16h',
      image: '/images/workshop-tech.jpg'
    },
    {
      title: 'Estética do Empreend. Feminino',
      participants: 189,
      duration: '4 meses',
      schedule: 'Ter/Qui - 9h às 12h',
      image: '/images/workshop-beauty.jpg'
    },
    {
      title: 'Alfabetização de Adultos',
      participants: 156,
      duration: '6 meses',
      schedule: 'Seg a Sex - 19h às 21h',
      image: '/images/workshop-literacy.jpg'
    },
    {
      title: 'Educação Musical',
      participants: 312,
      duration: '2 anos',
      schedule: 'Sáb - 10h às 12h',
      image: '/images/workshop-music.jpg'
    }
  ];

  const partners = [
    { name: 'Tech Corp', logo: '/images/partners/tech.png' },
    { name: 'Green Energy', logo: '/images/partners/green.png' },
    { name: 'City Bank', logo: '/images/partners/bank.png' },
    { name: 'Health Plus', logo: '/images/partners/health.png' },
    { name: 'Education Now', logo: '/images/partners/edu.png' },
    { name: 'Food Chain', logo: '/images/partners/food.png' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="w-full hero-bg min-h-screen flex items-center relative"
        style={{ backgroundImage: 'url(/images/projects-hero.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Projetos que Geram Impacto
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
              Mais de 7.000 pessoas transformadas através de ações concretas que promovem dignidade, educação e desenvolvimento sustentável na Zona Norte de São Paulo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" icon="fa-regular fa-heart">
                QUERO APOIAR UM PROJETO
              </Button>
              <Button variant="outline" size="lg" icon="fa-solid fa-arrow-right" iconPosition="right">
                Ver Todos os Projetos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 lg:py-20 bg-neutral">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nosso Impacto em Números
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Resultados concretos que demonstram a efetividade dos nossos projetos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card variant="default" padding="lg" className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-3xl text-primary"></i>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">+7.000</div>
              <div className="text-gray-600">Pessoas Atendidas</div>
            </Card>

            <Card variant="default" padding="lg" className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-graduation-cap text-3xl text-primary"></i>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">+4</div>
              <div className="text-gray-600">Áreas de Necessidade</div>
            </Card>

            <Card variant="default" padding="lg" className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-3xl text-primary"></i>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Taxa de Empregabilidade</div>
            </Card>

            <Card variant="default" padding="lg" className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-hands-helping text-3xl text-primary"></i>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">45</div>
              <div className="text-gray-600">Comunidades Atendidas</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nossos Três Pilares de Atuação
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada pilar representa um eixo estratégico de transformação social e impacto direto na zona Norte de São Paulo
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => (
              <Card 
                key={project.id}
                variant="default" 
                padding="none"
                className="overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`bg-gradient-to-br ${project.color} p-8 text-white`}>
                  <div className="text-5xl mb-4">{project.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="opacity-90 mb-6">{project.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                    <div>
                      <div className="text-2xl font-bold">{project.beneficiaries || project.families}</div>
                      <div className="text-sm opacity-80">Beneficiários</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{project.workshops || project.rate || project.meals}</div>
                      <div className="text-sm opacity-80">{project.workshops ? 'Oficinas' : project.rate ? 'Satisfação' : 'Refeições'}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{project.communities || project.centers || project.kits}</div>
                      <div className="text-sm opacity-80">{project.communities ? 'Locais' : project.centers ? 'Centros' : 'Kits'}</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold mb-3">Projetos Ativos:</h4>
                  <ul className="space-y-2">
                    {project.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-check-circle text-primary mr-2"></i>
                        {activity}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full mt-4">
                    Conhecer Projetos Específicos →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Histórias de Transformação
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pessoas reais, histórias reais. Conheça quem teve a vida transformada pelos nossos projetos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transformationStories.map((story, idx) => (
              <Card key={idx} variant="default" padding="none" className="overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Foto {story.name}</span>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-1">{story.name}</h4>
                  <p className="text-sm text-gray-500 mb-3">{story.age} anos • {story.program}</p>
                  <blockquote className="text-sm text-gray-600 italic border-l-4 border-primary pl-3">
                    "{story.quote}"
                  </blockquote>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" size="lg">
              Ver Todas as Histórias
            </Button>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Oficinas e Capacitações
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Programas estruturados que geram oportunidades concretas de trabalho e renda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshops.map((workshop, idx) => (
              <Card key={idx} variant="outline" padding="md">
                <div className="mb-4 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Imagem Oficina</span>
                </div>
                <h4 className="font-bold mb-2">{workshop.title}</h4>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><i className="fas fa-clock mr-2"></i>{workshop.duration}</p>
                  <p><i className="fas fa-calendar mr-2"></i>{workshop.schedule}</p>
                  <p><i className="fas fa-users mr-2"></i>{workshop.participants} participantes</p>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  Saiba Mais
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" size="lg">
              Ver Todas as Oficinas
            </Button>
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Parcerias Estratégicas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Juntos somos mais fortes no compromisso social
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {partners.map((partner, idx) => (
              <Card key={idx} variant="outline" padding="md" className="flex items-center justify-center h-32 hover:border-primary transition">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-xs text-gray-400">Logo</span>
                  </div>
                  <p className="text-xs text-gray-600">{partner.name}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg">
              Seja Nosso Parceiro
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-green-500 text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Prefere Falar Diretamente Conosco?
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Nossa equipe está pronta para esclarecer dúvidas e apresentar como você pode fazer parte dessa transformação
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card variant="default" padding="lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Ligue para Nós</h3>
              <p className="text-gray-600 mb-4">De segunda a sexta, das 9h às 18h</p>
              <Button bg variant="black" className="w-full">
                (11) 1234-5678
              </Button>
            </Card>

            <Card variant="default" padding="lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Envie um E-mail</h3>
              <p className="text-gray-600 mb-4">Responderemos em até 24 horas</p>
              <Button variant="black" className="w-full">
                contato@sublim.org.br
              </Button>
            </Card>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <Button variant="ghost" size="sm">
              Agendar Reunião Presencial →
            </Button>
            <Button variant="ghost" size="sm">
              Ver Relatório Financeiro →
            </Button>
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