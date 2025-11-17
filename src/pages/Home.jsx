import React, { useState } from 'react';
import { Button, Card, Modal } from '../components/ui';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        id="home"
        className="w-full hero-bg min-h-screen flex items-center relative"
        style={{ backgroundImage: "url('/images/hero-photo.png')" }}
      >
        <div className="absolute inset-0 hero-overlay z-0"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transformando vidas, <br />
              <span className="text-white/90">construindo um futuro</span><br />
              <span className="text-primary">sustentável</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
              Mais que acolhimento: somos uma ponte que conecta oportunidades a mais de 7.000 pessoas em São Paulo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" icon="fa-regular fa-heart">
                DOAR AGORA
              </Button>
              <Button variant="outline" icon="fa-solid fa-arrow-right" iconPosition="right">
                Conheça Nossos Projetos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section id="transparency" className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transparência Total
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acreditamos que a confiança se constrói com clareza. Veja como utilizamos cada recurso.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="default" padding="lg" className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-pie text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Relatórios Financeiros</h3>
              <p className="text-gray-600 mb-4">
                Balanços trimestrais disponíveis para consulta pública
              </p>
              <Button variant="ghost" size="sm">
                Ver Relatórios
              </Button>
            </Card>

            <Card variant="default" padding="lg" className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Impacto Real</h3>
              <p className="text-gray-600 mb-4">
                Métricas e indicadores de todas as nossas ações
              </p>
              <Button variant="ghost" size="sm">
                Ver Impacto
              </Button>
            </Card>

            <Card variant="default" padding="lg" className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-file-alt text-3xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Documentação Legal</h3>
              <p className="text-gray-600 mb-4">
                Estatuto, atas e certificações oficiais
              </p>
              <Button variant="ghost" size="sm">
                Ver Documentos
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-16 lg:py-24 bg-neutral">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Nossa História
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Desde 2015, o Instituto Sublim nasceu do sonho de Carol Andrade de transformar 
                a realidade da Zona Norte de São Paulo. O que começou como pequenas ações 
                comunitárias se tornou um movimento de transformação social.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Hoje, impactamos mais de 7.000 vidas através de educação, capacitação 
                profissional e desenvolvimento comunitário.
              </p>
              <Button variant="primary" icon="fa-solid fa-arrow-right" iconPosition="right">
                Conheça Nossa História Completa
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card variant="gradient" padding="lg" className="text-center">
                <div className="text-4xl font-bold mb-2">2.867</div>
                <div className="text-sm opacity-90">Vidas Impactadas</div>
              </Card>
              <Card variant="gradient" padding="lg" className="text-center">
                <div className="text-4xl font-bold mb-2">48</div>
                <div className="text-sm opacity-90">Projetos Ativos</div>
              </Card>
              <Card variant="gradient" padding="lg" className="text-center">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-90">Satisfação</div>
              </Card>
              <Card variant="gradient" padding="lg" className="text-center">
                <div className="text-4xl font-bold mb-2">12</div>
                <div className="text-sm opacity-90">Anos de Impacto</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nossas Oficinas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Capacitação e desenvolvimento através de oficinas práticas e transformadoras
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Tecnologia & Programação',
                desc: 'Aprenda programação web, mobile e desenvolvimento de software',
                icon: 'fa-solid fa-code',
                participants: 245
              },
              {
                title: 'Empreendedorismo',
                desc: 'Desenvolva habilidades para criar e gerenciar seu próprio negócio',
                icon: 'fa-solid fa-lightbulb',
                participants: 189
              },
              {
                title: 'Artes & Cultura',
                desc: 'Expressão artística através de música, dança e artes visuais',
                icon: 'fa-solid fa-palette',
                participants: 312
              },
              {
                title: 'Idiomas',
                desc: 'Inglês, Espanhol e Libras para ampliar oportunidades',
                icon: 'fa-solid fa-language',
                participants: 156
              },
              {
                title: 'Desenvolvimento Pessoal',
                desc: 'Autoconhecimento, liderança e inteligência emocional',
                icon: 'fa-solid fa-heart',
                participants: 278
              },
              {
                title: 'Capacitação Profissional',
                desc: 'Preparação para o mercado de trabalho e carreira',
                icon: 'fa-solid fa-briefcase',
                participants: 201
              }
            ].map((workshop, idx) => (
              <Card key={idx} variant="default" padding="lg" className="hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <i className={`${workshop.icon} text-2xl text-primary`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{workshop.title}</h3>
                <p className="text-gray-600 mb-4">{workshop.desc}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    <i className="fas fa-users mr-2"></i>
                    {workshop.participants} participantes
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Saiba Mais
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-16 lg:py-24 bg-primary-dark text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nosso Impacto
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Números que representam vidas transformadas e futuros construídos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { number: '7.234', label: 'Vidas Transformadas', icon: 'fa-solid fa-heart' },
              { number: '152', label: 'Oficinas Realizadas', icon: 'fa-solid fa-chalkboard-teacher' },
              { number: '1.890', label: 'Jovens Capacitados', icon: 'fa-solid fa-user-graduate' },
              { number: '89%', label: 'Taxa de Empregabilidade', icon: 'fa-solid fa-chart-line' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-2xl text-primary`}></i>
                </div>
                <div className="text-5xl font-bold mb-2 text-primary">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="secondary" size="lg">
              Ver Relatório Completo de Impacto
            </Button>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nossos Parceiros
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Empresas e organizações que acreditam na transformação social
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((partner) => (
              <Card key={partner} variant="outline" padding="md" className="flex items-center justify-center hover:border-primary">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Logo {partner}</span>
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

      {/* Contact/CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-green-500 text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Faça Parte Dessa Transformação
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Sua contribuição pode mudar a vida de uma criança, jovem ou família inteira. 
            Juntos, construímos um futuro melhor para todos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" icon="fa-regular fa-heart">
              QUERO DOAR
            </Button>
            <Button variant="outline" size="lg">
              Seja Voluntário
            </Button>
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