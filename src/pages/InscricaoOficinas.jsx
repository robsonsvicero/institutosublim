import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';

export default function InscricaoOficinas() {
  const [workshopOptions, setWorkshopOptions] = useState([]);
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Telefone: '',
    Oficina: '',
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchWorkshopOptions() {
      const { data } = await supabase
        .from('cursos_oficinas')
        .select('title, closed')
        .order('title', { ascending: true });

      const activeOptions = Array.from(
        new Set((data || []).filter((item) => !item.closed).map((item) => item.title).filter(Boolean))
      );

      setWorkshopOptions(activeOptions);
      setForm((prev) => ({
        ...prev,
        Oficina: activeOptions[0] || '',
      }));
    }

    fetchWorkshopOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Preparar os dados incluindo os campos ocultos de configuração
    const formData = {
      ...form,
      _subject: "Nova Inscrição em Oficina - Instituto Sublim",
      _template: "table",
      _captcha: "false"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/contato@institutosublim.org", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowToast(true);
        setForm({
          Nome: '',
          Email: '',
          Telefone: '',
          Oficina: workshopOptions[0] || '',
        });
        setTimeout(() => setShowToast(false), 5000);
      } else {
        throw new Error('Falha no envio');
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Ocorreu um erro ao enviar sua inscrição. Por favor, tente novamente.");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}

      <section className="w-full hero-bg h-[640px] lg:h-[780px] items-center relative pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px]" style={{ backgroundImage: "url('/images/hero-inscricao-oficinas.png')" }}>
        <div className="absolute inset-0 hero-overlay z-0"></div>

        <div className="container mx-auto mt-0 lg:mt-24 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Inscreva-se em Nossas Oficinas
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
              Participe dos nossos cursos gratuitos e transforme seu futuro profissional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-20">
              <a href="/oficinas" className='w-full lg:w-[50%]'>
                <Button variant="primary" size="lg" icon="fas fa-heart" className="w-full">
                  OFICINAS EM ABERTO
                </Button>
              </a>
              
            </div>
          </div>
        </div>
      </section>

      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-100">
        {/* Toast de sucesso */}
      {showToast && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 text-center animate-bounce border-2 border-white">
          <div className="flex items-center gap-3">
            <i className="fas fa-check-circle text-2xl"></i>
            <div>
              <p className="font-bold text-lg">Inscrição enviada com sucesso!</p>
              <p className="text-sm opacity-90">Em breve nossa equipe entrará em contato.</p>
            </div>
          </div>
        </div>
      )}

      {/* Signup Form */}
      <div className="flex flex-col items-center justify-center ">
        <div className="max-w-3xl w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Inscrição em Oficinas e Capacitações
            </h2>
            <p className="text-base text-gray-600">
              Preencha o formulário e nossa equipe entrará em contato em até 24 horas
            </p>
          </div>
          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md p-8"
          >

            <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-xl -mx-8 -mt-8 mb-8 p-6">
              <h3 className="text-xl font-bold text-white mb-2">Formulário de Inscrição</h3>
              <p className="text-white/90 text-sm">Todas as informações são confidenciais e utilizadas apenas para contato</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">Nome Completo *</label>
                <input
                  type="text"
                  name="Nome"
                  value={form.Nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Digite seu nome..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">E-mail *</label>
                <input
                  type="email"
                  name="Email"
                  value={form.Email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Digite seu melhor e-mail..."
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">Telefone *</label>
                <input
                  type="tel"
                  name="Telefone"
                  value={form.Telefone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="(99) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900">Curso/Oficina *</label>
                <select
                  name="Oficina"
                  value={form.Oficina}
                  onChange={handleChange}
                  required
                  disabled={workshopOptions.length === 0}
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  {workshopOptions.length === 0 && (
                    <option value="">Nenhum curso/oficina em aberto no momento</option>
                  )}
                  {workshopOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
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
                    Suas informações são tratadas com total confidencialidade conforme LGPD. Utilizamos os dados apenas para contato sobre as oficinas.
                  </p>
                </div>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full" type="submit">
              <i className="fas fa-paper-plane mr-4"></i>
              <span>Enviar Inscrição</span>
            </Button>
          </form>
        </div>
      </div>
      </section>
    </div>
  );
}
