import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';

const BazaarDonation = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    tipoItens: '',
    localizacao: '',
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
        .from('agendamentos_bazar')
        .insert([
          { 
            nome: formData.nome,
            whatsapp: formData.whatsapp,
            tipo_itens: formData.tipoItens,
            localizacao: formData.localizacao,
            mensagem: formData.mensagem,
            status: 'pendente_entrega'
          }
        ]);

      if (error) throw error;

      // Enviar e-mail via FormSubmit
      await fetch("https://formsubmit.co/ajax/contato@institutosublim.org", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: "Novo Agendamento de Entrega de Doação - Instituto Sublim",
          _template: "table",
          _captcha: "false"
        })
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao agendar. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { name: 'Roupas e Acessórios', icon: 'fas fa-tshirt' },
    { name: 'Calçados', icon: 'fas fa-shoe-prints' },
    { name: 'Móveis', icon: 'fas fa-chair' },
    { name: 'Eletrodomésticos', icon: 'fas fa-blender' },
    { name: 'Brinquedos', icon: 'fas fa-puzzle-piece' },
    { name: 'Livros e Utensílios', icon: 'fas fa-book' }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-[120px] pb-[60px] lg:pt-[180px] lg:pb-[100px] bg-secondary-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-80"></div>
        <div className="container mx-auto px-6 relative z-10 lg:px-[204px]">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Doação de Itens para o Bazar
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Sua doação se transforma em impacto social. Aceitamos roupas, móveis e utensílios em bom estado para nosso bazar beneficente.
            </p>
          </div>
        </div>
      </section>

      {/* What to Donate */}
      <section className="py-16 lg:py-24 px-6 lg:px-[204px]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">O que você pode doar?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Aceitamos diversos tipos de itens, desde que estejam em <strong>bom estado de conservação</strong>. Lembre-se: doar é um ato de carinho, doe apenas o que você ainda usaria.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-all group">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className={cat.icon}></i>
                </div>
                <p className="font-semibold text-gray-800">{cat.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl max-w-4xl mx-auto">
            <p className="text-blue-800 font-medium italic">
              "Itens danificados, rasgados ou sem funcionamento não podem ser aproveitados em nosso bazar. Ajude-nos a manter a qualidade de quem compra e a dignidade de quem recebe."
            </p>
          </div>
        </div>
      </section>

      {/* How to Donate */}
      <section className="py-16 lg:py-24 bg-gray-50 px-6 lg:px-[204px]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Como entregar sua doação?</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xl">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Ponto de Entrega</h3>
                    <p className="text-gray-600 mb-4">Você pode entregar diretamente em nossa sede na Zona Norte de São Paulo.</p>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 inline-block">
                      <p className="text-sm font-bold text-gray-800">Endereço:</p>
                      <p className="text-sm text-gray-600">R. Albertina Vieira da Silva Gordo, 154 - Vila Aurora, São Paulo - SP</p>
                      <p className="text-sm text-gray-600">Segunda a Sexta, das 9h às 17h</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xl">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Agende sua Entrega</h3>
                    <p className="text-gray-600">Para facilitar o recebimento, pedimos que agende um horário através do formulário ao lado.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <img 
                  src="/images/bazar_social.png" 
                  alt="Bazar Social" 
                  className="rounded-3xl shadow-xl w-full h-[300px] object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&q=80&w=1000' }}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-calendar-check text-3xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Entrega Agendada!</h3>
                  <p className="text-gray-600 mb-8">Nossa equipe do Bazar entrará em contato via WhatsApp para confirmar o melhor horário para sua entrega.</p>
                  <Button variant="primary" onClick={() => setSubmitted(false)}>AGENDAR OUTRA</Button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Agende sua Entrega</h3>
                  <p className="text-gray-600 mb-8">Preencha os campos abaixo para que possamos nos preparar para receber sua doação.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Ex: Maria Silva"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp / Celular</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Quais itens deseja doar?</label>
                      <textarea
                        name="tipoItens"
                        required
                        value={formData.tipoItens}
                        onChange={handleChange}
                        rows="2"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Ex: 2 sofás, 3 sacos de roupas, 1 fogão..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Seu Bairro / Região</label>
                      <input
                        type="text"
                        name="localizacao"
                        required
                        value={formData.localizacao}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Ex: Vila Maria, São Paulo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Observações (Opcional)</label>
                      <textarea
                        name="mensagem"
                        value={formData.mensagem}
                        onChange={handleChange}
                        rows="2"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Melhor horário para contato, andar, etc."
                      ></textarea>
                    </div>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'AGENDANDO...' : 'AGENDAR ENTREGA'}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 px-6 lg:px-[204px] text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12">O ciclo da sua doação</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8">
              <i className="fas fa-box-open text-4xl text-blue-500 mb-6"></i>
              <h4 className="text-xl font-bold mb-4">Sua Doação</h4>
              <p className="text-gray-600">Você doa itens que não usa mais mas que estão em bom estado.</p>
            </div>
            <div className="p-8">
              <i className="fas fa-store text-4xl text-blue-500 mb-6"></i>
              <h4 className="text-xl font-bold mb-4">Nosso Bazar</h4>
              <p className="text-gray-600">Vendemos os itens a preços acessíveis para a própria comunidade.</p>
            </div>
            <div className="p-8">
              <i className="fas fa-hand-holding-heart text-4xl text-blue-500 mb-6"></i>
              <h4 className="text-xl font-bold mb-4">Investimento Social</h4>
              <p className="text-gray-600">100% do valor arrecadado é revertido para os projetos do Instituto Sublim.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BazaarDonation;
