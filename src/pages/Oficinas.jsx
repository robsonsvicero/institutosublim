import React, { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';

export default function Oficinas() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkshops() {
      setLoading(true);
      const { data, error } = await supabase
        .from('cursos_oficinas')
        .select('*')
        .order('created_at', { ascending: false });
      setWorkshops(data || []);
      setLoading(false);
    }
    fetchWorkshops();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[780px] pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('/images/hero-oficinas.png')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 border-2 border-primary-500 px-4 py-2 rounded-full mb-6">
            <i className="fas fa-graduation-cap text-primary-500 text-xl"></i>
            <span className="text-sm font-semibold text-white">Oficinas e Capacitações</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Conheça Nossas Oficinas
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-3xl">
            Descubra os cursos e oficinas que oferecemos para transformar vidas e promover inclusão.
          </p>
        </div>
      </section>

      {/* Cards de Oficinas */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="mb-16">
          <h2 className="text-center text-2xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Cursos e Formações Disponíveis
          </h2>
          <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">O <strong>Instituto Sublim</strong> acredita que a <strong>capacitação profissional</strong> é a <strong>peça-chave</strong> na concretização da autonomia financeira e social. Por isso, investe em cursos e experiências formativas que unem a determinação da comunidade com a prática do mercado, oferecendo suporte direto ao desenvolvimento de jovens e mulheres na Zona Norte de São Paulo.</p>
          <br />
          <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">Um dos principais caminhos para disseminar essas abordagens é o nosso programa de formação profissional, desenvolvido com esse propósito. Nele, os participantes encontram cursos, mentorias e workshops pensados para a sua realidade, com acesso flexível e adaptável à rotina profissional.</p>
          <br />          
          <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">Dessa forma, o Instituto fortalece a atuação nas temáticas defendidas: a empregabilidade, o desenvolvimento pessoal e a capacitação de mulheres para uma reintegração eficaz no mercado de trabalho.</p>
        </div>
        <div className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center text-gray-500">Carregando...</div>
          ) : workshops.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">Nenhum curso ou oficina disponível.</div>
          ) : (
            workshops.map((workshop) => (
              <div key={workshop.id} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center gap-4 relative">
                {workshop.closed && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">Encerrado</span>
                )}
                <div className="mb-4">
                  <i className={`${workshop.icon} text-primary-600 text-4xl`}></i>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>{workshop.title}</h2>
                <div className="flex flex-col text-left w-full">
                  <div className="text-sm text-primary-600 mb-2 font-semibold">{workshop.category}</div>
                  <ul className="mb-4 text-gray-700 text-sm space-y-1">
                    <li><strong>Frequência:</strong> {workshop.frequency}</li>
                    <li><strong>Duração:</strong> {workshop.duration}</li>
                    <li><strong>Alunos:</strong> {workshop.students}</li>
                    <li><strong>Próxima turma:</strong> {workshop.next_class}</li>
                  </ul>
                </div>
                <a href="/inscricao-oficinas" className="w-full">
                  <Button variant="primary" size="md" className="w-full">
                    Inscreva-se
                  </Button>
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
