import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';

const MonthlyDonation = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    valor: '50',
    outroValor: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contatos_doacao_mensal')
        .insert([
          { 
            nome: formData.nome,
            email: formData.email,
            whatsapp: formData.whatsapp,
            valor: formData.valor === 'outro' ? formData.outroValor : formData.valor,
            mensagem: formData.mensagem,
            status: 'pendente'
          }
        ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const impactCards = [
    {
      amount: '30',
      description: 'Garante o material didático de uma criança por um mês.'
    },
    {
      amount: '50',
      description: 'Proporciona alimentação saudável para um jovem em nossas oficinas.'
    },
    {
      amount: '100',
      description: 'Contribui para a manutenção de um curso profissionalizante completo.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-[120px] pb-[60px] lg:pt-[180px] lg:pb-[100px] bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/images/hero_doacao.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 lg:px-[204px]">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transforme Vidas Todos os Meses
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Ao se tornar um doador mensal, você garante a sustentabilidade de nossos projetos e permite que planejemos o futuro de centenas de crianças e jovens.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 px-6 lg:px-[204px]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left: Info and Impact */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Por que ser um doador mensal?</h2>
              <div className="space-y-6 mb-12">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600">
                    <i className="fas fa-calendar-check text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Impacto Contínuo</h3>
                    <p className="text-gray-600">Sua doação recorrente permite que nossos projetos não parem, oferecendo segurança para quem mais precisa.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600">
                    <i className="fas fa-chart-line text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Planejamento a Longo Prazo</h3>
                    <p className="text-gray-600">Com recursos previsíveis, podemos expandir nossas oficinas e atender mais famílias na comunidade.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 text-primary-600">
                    <i className="fas fa-shield-alt text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Transparência Total</h3>
                    <p className="text-gray-600">Você receberá relatórios mensais exclusivos sobre como seu investimento está sendo aplicado.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-center">Seu impacto mensal:</h3>
                <div className="grid gap-4">
                  {impactCards.map((card, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                      <div className="text-2xl font-bold text-primary-600 w-24">R$ {card.amount}</div>
                      <p className="text-sm text-gray-600">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-check text-3xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Obrigado pelo interesse!</h3>
                    <p className="text-gray-600 mb-8">Recebemos seus dados e nossa equipe entrará em contato em breve para finalizar o processo de doação mensal.</p>
                    <Button variant="primary" onClick={() => setSubmitted(false)}>ENVIAR OUTRO</Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Preencha o formulário e entraremos em contato</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label>
                        <input
                          type="text"
                          name="nome"
                          required
                          value={formData.nome}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            placeholder="seu@email.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp / Celular *</label>
                          <input
                            type="tel"
                            name="whatsapp"
                            required
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">Valor pretendido por mês</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {['30', '50', '100', 'outro'].map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, valor: v }))}
                              className={`py-3 rounded-xl border-2 font-bold transition ${
                                formData.valor === v 
                                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                                  : 'border-gray-200 text-gray-500 hover:border-primary-200'
                              }`}
                            >
                              {v === 'outro' ? 'Outro' : `R$ ${v}`}
                            </button>
                          ))}
                        </div>
                        {formData.valor === 'outro' && (
                          <input
                            type="number"
                            name="outroValor"
                            value={formData.outroValor}
                            onChange={handleChange}
                            className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            placeholder="Digite o valor (R$)"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Alguma dúvida ou comentário? (Opcional)</label>
                        <textarea
                          name="mensagem"
                          value={formData.mensagem}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                          placeholder="Fale conosco..."
                        ></textarea>
                      </div>

                      <Button 
                        type="submit" 
                        variant="primary" 
                        className="w-full py-4 text-lg font-bold"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'ENVIANDO...' : 'QUERO SER UM DOADOR MENSAL'}
                      </Button>
                      
                      <p className="text-center text-xs text-gray-400">
                        Ao enviar, você autoriza o contato de nossa equipe. Seus dados estão protegidos.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MonthlyDonation;
