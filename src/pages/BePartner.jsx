import React, { useState } from 'react';

export default function BePartner() {
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
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    // Aqui você adicionaria a lógica de envio
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-parceiro.jpg)' }}>
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Amplifique Seu Impacto Social
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-6">
                Junte-se a empresas que já transformam vidas através de parcerias estratégicas com o Instituto Sublim. Nossa metodologia comprova garantia de transparência total e impacto mensurável para uma estratégia ESG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">2.867</div>
              <div className="text-sm opacity-90">Vidas Transformadas</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-sm opacity-90">Taxa de Engajamento</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">48</div>
              <div className="text-sm opacity-90">Empresas Parceiras</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">12</div>
              <div className="text-sm opacity-90">Anos de Impacto</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Por Que Escolher o Instituto Sublim?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa metodologia comprova garantia de transparência total e impacto mensurável para uma estratégia ESG
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Transparência Total',
                desc: 'Relatórios detalhados e métricas em tempo real sobre cada projeto e ação realizada'
              },
              {
                icon: '📈',
                title: 'ROI Social Mensurável',
                desc: 'Acompanhe o impacto real de cada investimento através de indicadores claros'
              },
              {
                icon: '✅',
                title: 'Certificações ESG',
                desc: 'Conquiste selos e certificações que valorizam sua marca no mercado'
              },
              {
                icon: '🎓',
                title: 'Impacto Escalável',
                desc: 'Projetos pensados para crescer e ampliar o alcance social'
              },
              {
                icon: '👥',
                title: 'Engajamento de Equipes',
                desc: 'Oportunidades de voluntariado que fortalecem a cultura organizacional'
              },
              {
                icon: '🎯',
                title: 'Visibilidade Estratégica',
                desc: 'Exposição em canais digitais e eventos comunitários'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Modalidades de Parceria
            </h2>
            <p className="text-lg text-gray-600">
              Escolha a forma de apoio que melhor se alinha aos objetivos da sua empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Patrocínio Estratégico */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-2xl font-bold">Patrocínio Estratégico</h3>
              </div>
              <p className="mb-6 opacity-90">
                Apoie financeiro direto aos projetos com visibilidade de marca e impacto direto em comunidades
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Logo em materiais</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Logo em eventos</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Relatórios trimestrais</span>
                </li>
              </ul>
              <button className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                Saiba Mais
              </button>
            </div>

            {/* Patrocínio Estratégico (Orange) */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold">Patrocínio Estratégico</h3>
              </div>
              <p className="mb-6 opacity-90">
                Apoio financeiro direto aos projetos com visibilidade de marca e impacto direto em comunidades
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Logo em materiais</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Logo em eventos</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Relatórios mensais</span>
                </li>
              </ul>
              <button className="w-full bg-white text-orange-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                Saiba Mais
              </button>
            </div>

            {/* Patrocínio Estratégico (Purple) */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold">Patrocínio Estratégico</h3>
              </div>
              <p className="mb-6 opacity-90">
                Apoio financeiro direto aos projetos com visibilidade de marca e impacto direto em comunidades
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Plano sob medida</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Logo sob medida</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Logo sob medida</span>
                </li>
              </ul>
              <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                Saiba Mais
              </button>
            </div>

            {/* Patrocínio Estratégico (Teal) */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold">Patrocínio Estratégico</h3>
              </div>
              <p className="mb-6 opacity-90">
                Apoio financeiro direto aos projetos com visibilidade de marca e impacto direto em comunidades
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Plano sob medida</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check-circle"></i>
                  <span>Acompanhamento dedicado</span>
                </li>
              </ul>
              <button className="w-full bg-white text-teal-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              O Que Nossos Parceiros Dizem
            </h2>
            <p className="text-lg text-gray-600">
              Depoimentos de empresas que já transformam vidas conosco
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: 'Parceria com o Instituto Sublim foi crucial para nossa estratégia ESG. Os relatórios trimestrais nos dão total...',
                name: 'Maria Silva',
                role: 'Diretora de Sustentabilidade',
                company: 'Tech Corp'
              },
              {
                text: 'A transparência e o profissionalismo da equipe nos impressionaram. Sabemos exatamente onde cada real é...',
                name: 'João Santos',
                role: 'CEO',
                company: 'Inovação SA'
              },
              {
                text: 'Nossos colaboradores se engajaram de forma incrível nos projetos de voluntariado. Ver o impacto...',
                name: 'Ana Paula',
                role: 'Gerente de RH',
                company: 'Global Solutions'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-4">
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-3 border-t pt-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24 bg-neutral">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Vamos Conversar Sobre Sua Parceria
              </h2>
              <p className="text-lg text-gray-600">
                Preencha o formulário e nossa equipe entrará em contato em até 24 horas úteis
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="João da Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Empresa *</label>
                  <input
                    type="text"
                    name="nomeEmpresa"
                    value={formData.nomeEmpresa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Sua Empresa LTDA"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Cargo *</label>
                  <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Gerente de Sustentabilidade"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Corporativo *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="joao@empresa.com.br"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone/WhatsApp *</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="(11) 98765-4321"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Empresa *</label>
                  <select
                    name="tipoEmpresa"
                    value={formData.tipoEmpresa}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="pequena">Pequena Empresa</option>
                    <option value="media">Média Empresa</option>
                    <option value="grande">Grande Empresa</option>
                    <option value="multinacional">Multinacional</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Número de Funcionários *</label>
                  <select
                    name="numFuncionarios"
                    value={formData.numFuncionarios}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="1-50">1 a 50</option>
                    <option value="51-200">51 a 200</option>
                    <option value="201-500">201 a 500</option>
                    <option value="500+">Mais de 500</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Área de Atuação *</label>
                  <select
                    name="areaAtuacao"
                    value={formData.areaAtuacao}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="industria">Indústria</option>
                    <option value="servicos">Serviços</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Tipos de Parceria de Interesse *</label>
                <div className="space-y-2">
                  {['Patrocínio Financeiro', 'Patrocínio in-kind', 'Doação de produtos', 'Voluntariado Corporativo'].map((tipo) => (
                    <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="tiposParceria"
                        value={tipo}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <span className="text-sm">{tipo}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Mensagem Adicional</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Conte-nos mais sobre seus objetivos de parceria..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                  />
                  <span className="text-xs text-gray-600">
                    Li e concordo com a Política de Privacidade. Autorizo o Instituto Sublim a utilizar meus dados pessoais para contato e envio de informações sobre parcerias.*
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Enviar Solicitação de Parceria
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-primary-dark text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Prefere Falar Diretamente Conosco?
            </h2>
            <p className="text-lg opacity-90">
              Escolha o melhor canal de contato para você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a href="mailto:parcerias@institutosublim.org.br" className="text-sm opacity-90 hover:opacity-100">
                parcerias@institutosublim.org.br
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <i className="fab fa-whatsapp text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <a href="https://wa.me/5511975911225" className="text-sm opacity-90 hover:opacity-100">
                (11) 97591-1225
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calendar text-2xl"></i>
              </div>
              <h3 className="font-semibold mb-2">Agende uma Reunião</h3>
              <a href="#schedule" className="text-sm opacity-90 hover:opacity-100">
                Clique aqui
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-green-500 text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Transforme Seu ESG em Impacto Real
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Junte-se a empresas que já estão fazendo a diferença. Não é apenas uma doação, é um investimento social com retorno mensurável.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition">
              Quero Ser Parceiro
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition">
              Ver Cases de Sucesso
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}