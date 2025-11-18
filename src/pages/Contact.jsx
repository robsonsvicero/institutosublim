import React, { useState } from 'react';
import { Button } from '../components/ui';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    // Permite que o formulário seja enviado normalmente
    // O FormSubmit irá redirecionar automaticamente
    console.log('Formulário sendo enviado...');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: 'Onde fica localizado o Instituto Sublim e qual sua área de atuação?',
      answer: 'O Instituto Sublim está localizado na Zona Norte de São Paulo e atua principalmente nesta região, desenvolvendo projetos em comunidades carentes para promover educação, capacitação profissional e desenvolvimento social.'
    },
    {
      question: 'Quem fiscaliza a aplicação dos recursos do Instituto Sublim?',
      answer: 'A aplicação dos recursos é fiscalizada por órgãos reguladores como o Conselho Fiscal interno, auditorias externas independentes e também pelos próprios doadores através dos nossos relatórios de transparência publicados trimestralmente.'
    },
    {
      question: 'Qual é o custo operacional do Instituto?',
      answer: 'Mantemos nosso custo operacional abaixo de 15% do total arrecadado, destinando mais de 85% dos recursos diretamente para os programas e projetos sociais. Todos os detalhes estão disponíveis em nossos relatórios financeiros públicos.'
    },
    {
      question: 'Como posso ter certeza de que o PIX vai para a conta correta?',
      answer: 'Nossa chave PIX oficial é o CNPJ 12.345.678/0001-90. Sempre confirme os dados antes de realizar a transferência. Você receberá um comprovante automático e um e-mail de confirmação após a doação. Em caso de dúvida, entre em contato conosco antes de doar.'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="w-full hero-bg min-h-[80vh] flex items-center relative"
        style={{ backgroundImage: "url('/images/hero-contact.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <i className="fas fa-headset text-white"></i>
              <span className="text-white font-semibold text-sm">Atendimento Humanizado</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Estamos Aqui Para Você
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl">
              Mais de 7.000 pessoas transformadas através de nossos três pilares de atuação: Geração de Oportunidades, Cuidado e Crescimento, e Dignidade e Acolhimento.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-12">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24h</div>
                <div className="text-white/80 text-lg">Tempo de Resposta</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#C4E538] mb-2">100%</div>
                <div className="text-white/80 text-lg">Transparência</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Channels Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Canais de Comunicação
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Escolha o canal mais adequado para seu contato. Nossa equipe está pronta para atender você com transparência e agilidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contato Geral */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex items-center gap-3 text-white">
                  <i className="fas fa-envelope text-2xl"></i>
                  <div>
                    <h3 className="text-xl font-bold">Contato Geral</h3>
                    <p className="text-sm text-white/90">Respostas em até 24 horas</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Para dúvidas gerais, informações sobre projetos e voluntariado
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 font-semibold text-center">
                    contato@institutosublim.org.br
                  </p>
                </div>
                <Button variant="primary" className="w-full">
                  Entrar em Contato
                </Button>
              </div>
            </div>

            {/* Parcerias Corporativas */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
                <div className="flex items-center gap-3 text-white">
                  <i className="fas fa-envelope text-2xl"></i>
                  <div>
                    <h3 className="text-xl font-bold">Parcerias Corporativas</h3>
                    <p className="text-sm text-white/90">Respostas em até 12 horas</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Para empresas interessadas em parcerias estratégicas e patrocínios
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 font-semibold text-center">
                    parcerias@institutosublim.org.br
                  </p>
                </div>
                <Button variant="primary" className="w-full">
                  Entrar em Contato
                </Button>
              </div>
            </div>

            {/* Atendimento Direto */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
                <div className="flex items-center gap-3 text-white">
                  <i className="fas fa-envelope text-2xl"></i>
                  <div>
                    <h3 className="text-xl font-bold">Atendimento Direto</h3>
                    <p className="text-sm text-white/90">Seg. - Sex. 9h às 18h</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  WhatsApp e telefone para contato imediato e urgências
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-800 font-semibold text-center">
                    (11) 98765-4321
                  </p>
                </div>
                <Button variant="primary" className="w-full">
                  Entrar em Contato
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Vamos Conversar Sobre Sua Parceria
              </h2>
              <p className="text-lg text-gray-600">
                Preencha o formulário e nossa equipe entrará em contato em até 24 horas com uma proposta personalizada
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Formulário de Contato</h3>
                <p className="text-white/90 text-sm">
                  Todas as informações são confidenciais e utilizadas apenas para personalizar nossa proposta
                </p>
              </div>

              {/* Form Content */}
              <form 
                onSubmit={handleSubmit}
                action="https://formsubmit.co/robsonsvicero.designer@gmail.com"
                method="POST"
                className="p-8 space-y-6"
              >
                {/* Hidden fields for FormSubmit configuration */}
                <input type="hidden" name="_subject" value="Novo contato - Instituto Sublim" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                <input type="hidden" name="_next" value="http://localhost:5173/contato" />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                      placeholder="Digite seu nome..."
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                      placeholder="Digite seu melhor e-mail..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">
                      Assunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
                    >
                      <option value="">Selecione o assunto</option>
                      <option value="duvida">Dúvida Geral</option>
                      <option value="parceria">Proposta de Parceria</option>
                      <option value="doacao">Doação</option>
                      <option value="voluntario">Voluntariado</option>
                      <option value="imprensa">Imprensa</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors resize-none"
                    placeholder="Escreva sua mensagem aqui. Seja específico sobre como podemos ajudá-lo..."
                  ></textarea>
                </div>

                {/* Privacy Notice */}
                <div className="bg-teal-50 rounded-lg p-4 flex gap-3">
                  <div className="flex-shrink-0">
                    <i className="fas fa-shield-alt text-teal-600 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Política de Privacidade:</span> Suas informações pessoais são protegidas conforme LGPD. Utilizamos os dados apenas para responder ao seu contato e nunca os compartilhamos com terceiros.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Enviar Solicitação de Parceria</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nossa Localização
            </h2>
            <p className="text-lg text-gray-600">
              Visite nossa sede na Zona Norte de São Paulo
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-[32px] max-w-6xl mx-auto ">
            {/* Info Column */}
            <div className="bg-[#FBF9FA] rounded-xl p-8">
              <h3 className="text-3xl font-bold mb-8 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Instituto Sublim
              </h3>

              {/* Endereço */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-2xl text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Endereço</h4>
                  <p className="text-gray-600 leading-relaxed">
                    R. Albertina Viêira da Silva Gordo, 154<br />
                    Vila Aurora (Zona Norte)<br />
                    São Paulo - SP, 02410-000
                  </p>
                </div>
              </div>

              {/* Horário */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-2xl text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Horário de Funcionamento</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Segunda a Sexta: 09h às 18h
                  </p>
                </div>
              </div>

              {/* Como Chegar */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-route text-2xl text-white"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">Como Chegar</h4>
                  <p className="text-gray-600 leading-relaxed">
                    (A partir do Metrô Santana)<br />
                    Ônibus: Linhas 1785, 1787, 1764, 1786<br />
                    Não temos estacionamento no local.
                  </p>
                </div>
              </div>

              {/* Visitação */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Visitação</h4>
                <p className="text-gray-600 mb-4">
                  Agende uma visita para conhecer nossos projetos de perto. Recebemos visitantes, voluntários e possíveis parceiros.
                </p>
                <Button variant="primary">
                  Agendar Visita
                </Button>
              </div>
            </div>

            {/* Map Column */}
            <div>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full min-h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.4849272474956!2d-46.62567492400515!3d-23.50766036079784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef5f4c6e8e6e5%3A0x4e3e9e6c5e8e6e6e!2sR.%20Albertina%20Vi%C3%AAira%20da%20Silva%20Gordo%2C%20154%20-%20Vila%20Aurora%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2002410-000!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Instituto Sublim"
                ></iframe>
              </div>

              {/* Map Actions */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  Ver no Google Maps
                </button>
                <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                  Traçar Rota
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Esclarecemos as principais dúvidas sobre nossa operação e transparência
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <i className={`fas fa-chevron-down text-gray-600 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}></i>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-teal-400 via-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Vamos Transformar Vidas Juntos
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Sua participação é fundamental para continuarmos nossa missão. Seja através de doação, parceria ou voluntariado, há sempre uma forma de fazer a diferença.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <i className="fas fa-heart"></i>
                <span>Fazer Doação</span>
              </button>
              <button className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                <i className="fas fa-handshake"></i>
                <span>Ser Parceiro</span>
              </button>
            </div>
            
            {/* Footer Info */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-sm text-white/80">
                Instituição sem fins lucrativos • CNPJ: 12.345.678/0001-90 • Certificação de utilidade pública
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
