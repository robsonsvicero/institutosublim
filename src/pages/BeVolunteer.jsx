import React, { useState } from 'react';
import Button from '../components/ui/Button';

export default function BeVolunteer() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    idade: '',
    profissao: '',
    habilidades: [],
    disponibilidade: '',
    frequencia: '',
    interesse: [],
    experiencia: '',
    mensagem: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const arrayName = name;
      setFormData(prev => ({
        ...prev,
        [arrayName]: checked
          ? [...prev[arrayName], value]
          : prev[arrayName].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    console.log('Formulário sendo enviado...');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[780px] pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px] bg-cover bg-center flex items-center" style={{ backgroundImage: 'url(/images/hero-voluntario.png)' }}>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border-2 border-primary-500 px-4 py-2 rounded-full mb-6">
              <i className="fas fa-hands-helping text-sm text-primary-500"></i>
              <span className="text-sm font-semibold text-primary-500">Seja a Mudança</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transforme Vidas com Seu Talento
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
              Junte-se a centenas de voluntários que dedicam seu tempo, talento e energia para criar oportunidades reais e transformar a realidade de famílias na Zona Norte de São Paulo.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#volunteer-form" className='w-full'>
                <Button variant="primary" size="lg" icon="fas fa-heart" className="w-full">
                  Quero Ser Voluntário
                </Button>
              </a>
              <a href="#volunteer-opportunities" className='w-full'>
                <Button variant="outline" className='w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-primary-500 font-semibold py-3 px-6 rounded-xl border border-primary-500/30 transition-colors' size="lg">
                  Ver Oportunidades
                </Button>
              </a>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-primary">350+</div>
                <div className="text-sm opacity-90">Voluntários Ativos</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-400">12mil</div>
                <div className="text-sm opacity-90">Horas Doadas em 2024</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-pink-400">200+</div>
                <div className="text-sm opacity-90">Famílias Impactadas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Por Que Ser Voluntário no Instituto Sublim?
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Mais do que doar seu tempo, você se torna parte de uma comunidade que acredita no poder da transformação social
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Card 1 - Impacto Real */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-heart text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Impacto Real e Mensurável
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Veja o resultado direto do seu trabalho na vida das pessoas. Cada ação voluntária gera transformação visível e duradoura.
              </p>
            </div>

            {/* Card 2 - Desenvolvimento Pessoal */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-user-graduate text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Desenvolvimento Pessoal
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Aprenda novas habilidades, desenvolva competências socioemocionais e amplie sua rede de contatos com pessoas inspiradoras.
              </p>
            </div>

            {/* Card 3 - Flexibilidade */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-clock text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Flexibilidade Total
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Escolha quando e como participar. Temos oportunidades presenciais, remotas, pontuais ou recorrentes que se adaptam à sua rotina.
              </p>
            </div>

            {/* Card 4 - Comunidade */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-users text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Comunidade Engajada
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Faça parte de uma rede de pessoas que compartilham os mesmos valores e o desejo de fazer a diferença no mundo.
              </p>
            </div>

            {/* Card 5 - Reconhecimento */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-certificate text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Certificação e Reconhecimento
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Receba certificados de participação e reconhecimento público pelas suas contribuições e dedicação ao Instituto.
              </p>
            </div>

            {/* Card 6 - Propósito */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-star text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Vida com Propósito
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Encontre significado e satisfação pessoal ao contribuir para uma causa maior e fazer parte da mudança que o mundo precisa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section id='volunteer-opportunities' className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Áreas de Atuação Voluntária
            </h2>
            <p className="text-lg text-gray-600">
              Encontre a oportunidade que mais combina com suas habilidades e disponibilidade
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto auto-rows-fr">
            {/* Card 1 - Educação */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <i className="fas fa-chalkboard-teacher text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Educação e Capacitação
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  Presencial ou Remoto
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 mb-6 text-sm">
                  Ensine suas habilidades profissionais, dê aulas de reforço ou alfabetização de adultos
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Aulas de informática e digitação</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Reforço escolar para crianças</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Alfabetização de adultos</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Workshops profissionalizantes</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <span>Quero Ensinar</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>

            {/* Card 2 - Artes e Cultura */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <i className="fas fa-palette text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Artes e Cultura
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  Presencial
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 mb-6 text-sm">
                  Compartilhe seu talento artístico e cultural com crianças e jovens da comunidade
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Oficinas de música e instrumentos</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Teatro e expressão corporal</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Artes plásticas e pintura</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Dança e movimento</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <span>Compartilhar Arte</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>

            {/* Card 3 - Gestão e Administração */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <i className="fas fa-briefcase text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Gestão e Administração
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  Remoto ou Presencial
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 mb-6 text-sm">
                  Use suas habilidades profissionais para fortalecer a gestão e operação do instituto
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Consultoria em gestão e processos</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Apoio administrativo e financeiro</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Marketing e comunicação</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Captação de recursos</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <span>Aplicar Expertise</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>

            {/* Card 4 - Eventos e Apoio */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <i className="fas fa-calendar-check text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Eventos e Ações Pontuais
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  Presencial - Flexível
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 mb-6 text-sm">
                  Participe de ações específicas e eventos especiais sem compromisso de longo prazo
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Festas e celebrações comunitárias</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Distribuição de cestas básicas</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Mutirões e reformas</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Campanhas especiais</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <span>Participar de Eventos</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Histórias de Quem Transforma
            </h2>
            <p className="text-lg text-gray-600">
              Conheça voluntários que encontraram propósito ao dedicar seu tempo ao Instituto Sublim
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                text: 'Comecei dando aulas de informática aos sábados e vi meus alunos conseguirem emprego. A gratidão nos olhos deles não tem preço. Hoje coordeno a área de tecnologia e capacitamos 40 pessoas por mês.',
                name: 'Carlos Silva',
                role: 'Voluntário desde 2022',
                area: 'Professor de Informática',
                avatar: '/images/volunteer1.jpg'
              },
              {
                text: 'Sempre quis fazer diferença, mas não sabia como. No Instituto encontrei meu lugar. Ensino música para crianças e vejo como isso transforma a autoestima e abre portas para elas.',
                name: 'Ana Paula Santos',
                role: 'Voluntária desde 2023',
                area: 'Professora de Música',
                avatar: '/images/volunteer2.jpg'
              },
              {
                text: 'Como advogada, ajudo o instituto com consultoria jurídica. É gratificante usar minha formação para garantir que essa organização incrível funcione perfeitamente e alcance mais pessoas.',
                name: 'Mariana Costa',
                role: 'Voluntária desde 2021',
                area: 'Consultora Jurídica',
                avatar: '/images/volunteer3.jpg'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-teal-50 rounded-2xl p-8 relative flex flex-col">
                <div className="flex-1">
                  <svg className="w-8 h-8 text-teal-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                  <svg className="w-8 h-8 text-teal-500 mt-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-teal-500 font-semibold">{testimonial.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section id='volunteer-form' className="pt-[50px] px-[16px] lg:pt-[100px] lg:px-[204px] pb-12 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Cadastre-se Como Voluntário
              </h2>
              <p className="text-base text-gray-600">
                Preencha o formulário e nossa equipe entrará em contato para alinhar a melhor forma de você contribuir
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/hello@robsonsvicero.com.br"
              method="POST"
              className="bg-white rounded-2xl shadow-md p-8"
            >
              {/* Header do Formulário */}
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-xl -mx-8 -mt-8 mb-8 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Inscrição de Voluntário</h3>
                <p className="text-white/90 text-sm">Queremos conhecer você e entender como pode contribuir com nossos projetos</p>
              </div>

              {/* Hidden fields for FormSubmit configuration */}
              <input type="hidden" name="_subject" value="Nova Inscrição de Voluntário - Instituto Sublim" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
              <input type="hidden" name="_next" value="http://localhost:5173/seja-voluntario" />

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Nome Completo *</label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Digite seu nome completo..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Telefone/WhatsApp *</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Idade</label>
                  <input
                    type="number"
                    name="idade"
                    value={formData.idade}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Sua idade"
                    min="16"
                    max="100"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2 text-gray-900">Profissão/Área de Atuação</label>
                <input
                  type="text"
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Ex: Professor, Designer, Engenheiro, Estudante..."
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-3 text-gray-900">Habilidades que Gostaria de Compartilhar (selecione todas que se aplicam)</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'educacao', label: 'Educação e ensino' },
                    { value: 'tecnologia', label: 'Tecnologia e informática' },
                    { value: 'artes', label: 'Artes e cultura' },
                    { value: 'esportes', label: 'Esportes e recreação' },
                    { value: 'administracao', label: 'Administração e gestão' },
                    { value: 'marketing', label: 'Marketing e comunicação' },
                    { value: 'financeiro', label: 'Financeiro e contabilidade' },
                    { value: 'juridico', label: 'Jurídico' }
                  ].map((skill) => (
                    <label key={skill.value} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input
                        type="checkbox"
                        name="habilidades"
                        value={skill.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span>{skill.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Disponibilidade</label>
                  <select
                    name="disponibilidade"
                    value={formData.disponibilidade}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  >
                    <option value="">Selecione sua disponibilidade</option>
                    <option value="manha">Manhã</option>
                    <option value="tarde">Tarde</option>
                    <option value="noite">Noite</option>
                    <option value="finais-semana">Finais de Semana</option>
                    <option value="flexivel">Flexível</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Frequência Desejada</label>
                  <select
                    name="frequencia"
                    value={formData.frequencia}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  >
                    <option value="">Selecione a frequência</option>
                    <option value="semanal">Semanal</option>
                    <option value="quinzenal">Quinzenal</option>
                    <option value="mensal">Mensal</option>
                    <option value="pontual">Pontual/Eventos</option>
                    <option value="remoto">Remoto quando possível</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-3 text-gray-900">Áreas de Interesse (selecione todas que deseja atuar)</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'capacitacao', label: 'Capacitação profissional' },
                    { value: 'educacao-infantil', label: 'Educação infantil' },
                    { value: 'alfabetizacao', label: 'Alfabetização de adultos' },
                    { value: 'oficinas-culturais', label: 'Oficinas culturais' },
                    { value: 'eventos', label: 'Eventos e celebrações' },
                    { value: 'gestao', label: 'Gestão e administração' },
                    { value: 'comunicacao', label: 'Comunicação e redes sociais' },
                    { value: 'captacao', label: 'Captação de recursos' }
                  ].map((area) => (
                    <label key={area.value} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input
                        type="checkbox"
                        name="interesse"
                        value={area.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span>{area.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-2 text-gray-900">Já Teve Experiência com Voluntariado?</label>
                <select
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  <option value="">Selecione</option>
                  <option value="primeira-vez">Esta será minha primeira vez</option>
                  <option value="pouca">Pouca experiência</option>
                  <option value="moderada">Experiência moderada</option>
                  <option value="muita">Muita experiência</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-900">Conte-nos Mais Sobre Você</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Por que você quer ser voluntário? O que espera dessa experiência? Compartilhe conosco..."
                ></textarea>
              </div>

              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Próximos Passos:</p>
                    <p className="text-xs text-blue-800">
                      Após o envio, nossa equipe analisará seu perfil e entrará em contato em até 48 horas para agendar uma conversa e apresentar as oportunidades disponíveis.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <i className="fas fa-heart"></i>
                <span>Quero Ser Voluntário</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-12 pb-[100px] px-[16px] lg:px-[204px] bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Dúvidas Sobre o Voluntariado?
            </h2>
            <p className="text-base text-gray-600">
              Entre em contato com nossa coordenação de voluntários
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">E-mail</h3>
              <a href="mailto:voluntariado@institutosublim.org.br" className="text-sm font-semibold text-gray-900 hover:text-teal-500 transition">
                voluntariado@institutosublim.org.br
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">WhatsApp</h3>
              <a href="https://wa.me/5511932167894" className="text-sm font-semibold text-gray-900 hover:text-blue-500 transition">
                (11) 93216-7894
              </a>
            </div>

            {/* <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Redes Sociais</h3>
              <div className="flex justify-center gap-2">
                <a href="#" className="text-gray-900 hover:text-purple-500 transition">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a href="#" className="text-gray-900 hover:text-purple-500 transition">
                  <i className="fab fa-facebook text-lg"></i>
                </a>
              </div>
            </div> */}
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Horário de atendimento: Segunda a sexta, das 9h às 18h
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Faça Parte da Transformação
          </h2>
          <p className="text-base md:text-lg opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
            Cada hora doada, cada talento compartilhado, cada sorriso oferecido multiplica as oportunidades de transformação. Seja voluntário e descubra o poder de fazer a diferença.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#volunteer-form">
              <Button variant="primary" size="lg" icon="fas fa-heart" className="bg-primary-500 hover:bg-primary-700">
                INSCREVA-SE COMO VOLUNTÁRIO
              </Button>
            </a>
            <a href="/oficinas">
            <Button variant="outline" size="lg" icon="fas fa-arrow-right" iconPosition="right">
              Conheça Nossos Projetos
            </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
