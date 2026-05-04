import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';

export default function BePartner() {
  const [depoimentosParceiros, setDepoimentosParceiros] = useState([]);
  const [loadingDepoimentos, setLoadingDepoimentos] = useState(true);
  const [erroDepoimentos, setErroDepoimentos] = useState(false);

  const carregarDepoimentos = async () => {
    setLoadingDepoimentos(true);
    setErroDepoimentos(false);

    const { data, error } = await supabase
      .from('depoimentos')
      .select('*')
      .eq('tipo', 'parceiro')
      .eq('ativo', true)
      .order('ordem', { ascending: true });

    if (error) {
      setErroDepoimentos(true);
      setDepoimentosParceiros([]);
    } else {
      setDepoimentosParceiros(data || []);
    }

    setLoadingDepoimentos(false);
  };

  useEffect(() => {
    carregarDepoimentos();
  }, []);

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    nomeEmpresa: '',
    cargo: '',
    email: '',
    telefone: '',
    tipoEmpresa: '',
    numFuncionarios: '',
    areaAtuacao: '',
    tiposParceria: [],
    mensagem: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        tiposParceria: checked 
          ? [...prev.tiposParceria, value]
          : prev.tiposParceria.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    // Permite que o formulário seja enviado normalmente
    // O FormSubmit irá redirecionar automaticamente
    console.log('Formulário sendo enviado...');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[780px] pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px] bg-cover bg-center flex items-center" style={{ backgroundImage: 'url(/images/hero-parceiro.png)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border-2 border-primary-500 px-4 py-2 rounded-full mb-6">
              <i className="fas fa-handshake text-sm text-primary-500"></i>
              <span className="text-sm font-semibold text-primary-500">Parcerias que Transformam</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Amplifique Seu Impacto Social
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
              Junte-se a empresas visionárias que escolheram o Instituto Sublim como parceiro estratégico para transformar vidas e comunidades na Zona Norte de São Paulo.
            </p>

            {/* Buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#partner-form" className='w-full'>
                <Button variant="primary" size="lg" icon="fas fa-handshake" className='w-full'>
                  Quero Ser Parceiro
                </Button>
              </a>
              <a href="/nossos-projetos" className='w-full'>
              <Button variant="outline" size="lg" className='w-full'>
                Ver Nosso Impacto
              </Button>
              </a>
              
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-teal-400">9.000</div>
                <div className="text-sm opacity-90">Famílias Impactadas</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-blue-400">200</div>
                <div className="text-sm opacity-90">Cestas Básicas 2025</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-purple-400">450</div>
                <div className="text-sm opacity-90">Famílias Natal Solidário 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Por Que Escolher o Instituto Sublim?
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Nossa metodologia comprovada garante transparência total e impacto mensurável para sua estratégia ESG
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Card 1 - Transformação Social */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-hands-helping text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Transformação Social
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Faça parte de um movimento que gera oportunidades reais de educação e desenvolvimento para famílias em situação de vulnerabilidade.
              </p>
            </div>

            {/* Card 2 - Responsabilidade Social */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-heart text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Responsabilidade Social
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Reforce o compromisso da sua empresa com o bem-estar social e ajude a construir um futuro melhor para a nossa comunidade.
              </p>
            </div>

            {/* Card 3 - Parceria Transparente */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-search text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Parceria Transparente
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Mantemos nossos parceiros informados sobre as nossas ações, garantindo que cada apoio chegue a quem realmente precisa.
              </p>
            </div>

            {/* Card 4 - Cultura de Solidariedade */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-seedling text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Cultura de Solidariedade
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Inspire sua equipe e engaje seus clientes ao associar a sua marca a projetos que promovem a dignidade humana.
              </p>
            </div>

            {/* Card 5 - Desenvolvimento Local */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-map-marked-alt text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Desenvolvimento Local
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Contribua diretamente para o fortalecimento da Zona Norte de São Paulo, melhorando a realidade ao nosso redor.
              </p>
            </div>

            {/* Card 6 - Rede do Bem */}
            <div className="bg-teal-50 rounded-3xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <i className="fas fa-network-wired text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Rede do Bem
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Conecte-se com uma rede crescente de empresas e indivíduos que compartilham do mesmo propósito de fazer a diferença.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Modalidades de Parceria
            </h2>
            <p className="text-lg text-gray-600">
              Escolha a forma de apoio que melhor se alinha aos objetivos da sua empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto auto-rows-fr">
            {/* Card 1 - Patrocínio Financeiro */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <i className="fas fa-money-bill-wave text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Patrocínio Financeiro
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  A partir de R$ 8.000/mês
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 mb-6 text-sm">
                  Contribua diretamente para projetos sociais, garantindo visibilidade da sua marca e relatórios de impacto.
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Logo em materiais e eventos</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Relatórios mensais de impacto</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Participação em eventos exclusivos</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <span>Saiba Mais</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>

            {/* Card 2 - Patrocínio In-kind */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <i className="fas fa-hand-holding-heart text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Patrocínio In-kind
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  Doação de produtos ou serviços
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 mb-6 text-sm">
                  Apoie com produtos, serviços ou expertise, agregando valor direto às ações do Instituto.
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Reconhecimento institucional</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Participação em ações sociais</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Certificado de parceria</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <span>Saiba Mais</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>

            {/* Card 3 - Voluntariado Corporativo */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <i className="fas fa-users text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Voluntariado Corporativo
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  Engajamento da equipe
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 mb-6 text-sm">
                  Incentive sua equipe a participar de ações voluntárias, fortalecendo a cultura e o propósito corporativo.
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Programas de voluntariado</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Desenvolvimento de lideranças</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Reconhecimento público</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <span>Saiba Mais</span>
                  <i className="fas fa-arrow-right text-sm"></i>
                </button>
              </div>
            </div>

            {/* Card 4 - Doação de Produtos */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <i className="fas fa-box text-white text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Doação de Produtos
                  </h3>
                </div>
                <p className="text-white/90 text-sm">
                  Qualquer valor
                </p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-700 mb-6 text-sm">
                  Doe produtos para ações sociais, campanhas e oficinas, ajudando diretamente famílias e crianças.
                </p>
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Entrega direta às famílias</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Visibilidade em campanhas</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-700">
                    <i className="fas fa-check-circle text-teal-500"></i>
                    <span>Certificado de agradecimento</span>
                  </li>
                </ul>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  <span>Saiba Mais</span>
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
              O Que Nossos Parceiros Dizem
            </h2>
            <p className="text-lg text-gray-600">
              Depoimentos de empresas que já transformam vidas conosco
            </p>
          </div>

          {loadingDepoimentos ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-teal-50 rounded-2xl p-8 animate-pulse">
                  <div className="h-4 w-20 bg-teal-200 rounded mb-4"></div>
                  <div className="h-3 w-full bg-teal-100 rounded mb-2"></div>
                  <div className="h-3 w-11/12 bg-teal-100 rounded mb-2"></div>
                  <div className="h-3 w-10/12 bg-teal-100 rounded mb-6"></div>
                  <div className="pt-6 border-t border-gray-300 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-teal-100"></div>
                    <div className="flex-1">
                      <div className="h-3 w-2/3 bg-teal-100 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-teal-100 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : erroDepoimentos ? (
            <div className="text-center">
              <p className="text-gray-500 mb-4">Nao foi possivel carregar os depoimentos no momento.</p>
              <button
                type="button"
                onClick={carregarDepoimentos}
                className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold transition"
              >
                Tentar novamente
              </button>
            </div>
          ) : depoimentosParceiros.length === 0 ? (
            <p className="text-center text-gray-500">Ainda não há depoimentos de parceiros publicados.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {depoimentosParceiros.map((testimonial) => (
              <div key={testimonial.id} className="bg-teal-50 rounded-2xl p-8 relative">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-teal-500 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {testimonial.texto}
                  </p>
                  <svg className="w-8 h-8 text-teal-500 mt-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.57-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-3 pt-6 border-t border-gray-300">
                  <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
                    <img src={testimonial.avatar_url} alt={testimonial.nome} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.nome}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-teal-500 font-semibold mt-1">{testimonial.area}</div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section id='partner-form' className="pt-[50px] px-[16px] lg:pt-[100px] lg:px-[204px] pb-12 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Vamos Conversar Sobre Sua Parceria
              </h2>
              <p className="text-base text-gray-600">
                Preencha o formulário e nossa equipe entrará em contato em até 24 horas com uma proposta personalizada
              </p>
            </div>

            <form 
              onSubmit={handleSubmit}
              action="https://formsubmit.co/contato@institutosublim.org"
              method="POST"
              className="bg-white rounded-2xl shadow-md p-8"
            >
              {/* Header do Formulário */}
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-xl -mx-8 -mt-8 mb-8 p-6">
                <h3 className="text-xl font-bold text-white mb-2">Formulário de Qualificação</h3>
                <p className="text-white/90 text-sm">Todas as informações são confidenciais e utilizadas apenas para personalizar nossa proposta</p>
              </div>

              {/* Hidden fields for FormSubmit configuration */}
              <input type="hidden" name="_subject" value="Nova Proposta de Parceria - Instituto Sublim" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
              <input type="hidden" name="_next" value="http://localhost:5173/seja-parceiro" />
              
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Nome da Empresa *</label>
                  <input
                    type="text"
                    name="nomeEmpresa"
                    value={formData.nomeEmpresa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Digite seu nome..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Nome de Contato *</label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Digite seu nome..."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">E-mail Corporativo *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Digite seu melhor e-mail..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Telefone *</label>
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
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Seu Cargo/Função</label>
                  <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Ex: Diretor de Sustentabilidade"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Porte da Empresa</label>
                  <select
                    name="tipoEmpresa"
                    value={formData.tipoEmpresa}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  >
                    <option value="">Selecione o porte</option>
                    <option value="pequena">Pequena</option>
                    <option value="media">Média</option>
                    <option value="grande">Grande</option>
                    <option value="multinacional">Multinacional</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Tipo de Parceria de Interesse</label>
                  <select
                    name="tipoParceria"
                    value={formData.tipoParceria || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  >
                    <option value="">Selecione uma modalidade</option>
                    <option value="patrocinio">Patrocínio Financeiro</option>
                    <option value="inkind">Patrocínio in-kind</option>
                    <option value="produtos">Doação de Produtos</option>
                    <option value="voluntariado">Voluntariado Corporativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900">Orçamento Anual ESG</label>
                  <select
                    name="orcamento"
                    value={formData.orcamento || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                  >
                    <option value="">Faixa de investimento</option>
                    <option value="ate50k">Até R$ 50.000</option>
                    <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                    <option value="100k-500k">R$ 100.000 - R$ 500.000</option>
                    <option value="500k+">Acima de R$ 500.000</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium mb-3 text-gray-900">Áreas de Interesse (selecione todos que se aplicam)</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'capacitacao', label: 'Capacitação profissional' },
                    { value: 'educacao', label: 'Educação Infantil' },
                    { value: 'empreendedorismo', label: 'Empreendedorismo' },
                    { value: 'tecnologia', label: 'Tecnologia e inclusão digital' },
                    { value: 'musica', label: 'Música' },
                    { value: 'meio-ambiente', label: 'Meio ambiente' },
                    { value: 'voluntariado', label: 'Voluntariado corporativo' },
                    { value: 'lideranca', label: 'Desenvolvimento de lideranças' }
                  ].map((area) => (
                    <label key={area.value} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input
                        type="checkbox"
                        name="areasInteresse"
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
                <label className="block text-sm font-medium mb-2 text-gray-900">Timeline para Início da Parceria</label>
                <select
                  name="timeline"
                  value={formData.timeline || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  <option value="">Quando gostaria de começar?</option>
                  <option value="imediato">Imediato</option>
                  <option value="1-3meses">1 a 3 meses</option>
                  <option value="3-6meses">3 a 6 meses</option>
                  <option value="6-12meses">6 a 12 meses</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-900">Mensagem Adicional</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Conte-nos mais sobre seus objetivos ESG e como podemos ajudar..."
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
                    <p className="text-sm font-semibold text-blue-900 mb-1">Compromisso de Privacidade:</p>
                    <p className="text-xs text-blue-800">
                      Suas informações são tratadas com total confidencialidade conforme LGPD. Utilizamos os dados apenas para personalizar nossa proposta de parceria.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3.5 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <i className="fas fa-paper-plane"></i>
                <span>Enviar Solicitação de Parceria</span>
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
              Prefere Falar Diretamente Conosco?
            </h2>
            <p className="text-base text-gray-600">
              Nossa equipe de parcerias está pronta para atender sua empresa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">E-mail</h3>
              <a href="mailto:contato@institutosublim.org" className="text-sm font-semibold text-gray-900 hover:text-teal-500 transition">
                contato@institutosublim.org
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Telefone</h3>
              <a href="tel:+551132167894" className="text-sm font-semibold text-gray-900 hover:text-blue-500 transition">
                (11) 3216-7894
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Agendamento</h3>
              <a href="#schedule" className="text-sm font-semibold text-gray-900 hover:text-purple-500 transition">
                Reunião Personalizada
              </a>
            </div>
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
        <div className="container mx-auto text-center flex flex-col items-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Transforme Seu ESG em Impacto Real
          </h2>
          <p className="text-base md:text-lg opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
            Junte-se a empresas visionárias que escolheram o Instituto Sublim para multiplicar seu impacto social com transparência total e resultados mensuráveis.
          </p>
          <div className="lg:w-[60%] w-full flex flex-col sm:flex-row gap-4 justify-between items-center">
            <a href="/nossos-projetos" className='w-full'>
              <Button variant='primary' icon='fa-solid fa-graduation-cap' className='w-full'>
                Conheça Nossos Projetos
              </Button>
            </a>
            <a href="/transparencia" className='w-full'>
              <Button variant='outline' icon='fas fa-arrow-right' iconPosition='right' className='w-full'>
                Ver Nossa Transparência
              </Button>
            </a>
            
          </div>
        </div>
      </section>
    </div>
  );
}