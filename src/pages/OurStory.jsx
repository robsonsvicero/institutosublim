import React from 'react';
export default function OurStory() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-historia.png)' }}>
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                A Determinação de Uma História que Transforma Milhares de Futuros
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                Conheça a história de Carol Andrade, que transformou sua existência através da esperança em um propósito real de desenvolver crianças, jovens e comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carol Andrade Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Carol Andrade: A Força que Nos Move
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
            Da infância marcada por desafios ao sonho de transformar vidas.
          </p>

          {/* Story Cards */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {/* Card 1 - Raízes na Comunidade */}
            <article className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">Raízes na Comunidade</h3>
                <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  Carol cresceu em uma comunidade vibrante, mas também com muitas dificuldades. Filha de uma evangélica persistente e um pai alcoólatra, aprendeu desde cedo sobre resiliência e a importância de lutar por um futuro melhor.
                </p>
                <blockquote className="border-l-4 border-primary pl-3 sm:pl-4 italic text-gray-600 text-sm sm:text-base">
                  "Eu achava que ser tia fazia parte do meu destino..."
                </blockquote>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <div className="rounded-full overflow-hidden w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto border-4 sm:border-8 border-primary">
                  <img src="/images/carol-portrait.jpg" alt="Carol Andrade" className="w-full h-full object-cover" />
                </div>
              </div>
            </article>

            {/* Card 2 - Educação Como Libertação */}
            <article className="flex flex-col md:flex-row-reverse items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="md:w-1/2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">Educação Como Libertação</h3>
                <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  Carol ingressa na Pedagogia aos 18 anos, encontrando na educação sua primeira esperança de transformação.
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="/images/education.jpg" alt="Educação" className="rounded-xl sm:rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover" />
              </div>
            </article>

            {/* Card 3 - O Nascimento de um Sonho */}
            <article className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">O Nascimento de um Sonho</h3>
                <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
                  Em 2015, Carol fundou o Instituto Sublim com a missão de transformar vidas através da educação e desenvolvimento comunitário.
                </p>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src="/images/dream.jpg" alt="Sonho" className="rounded-xl sm:rounded-2xl w-full h-48 sm:h-56 md:h-64 object-cover" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Timeline - Nossa Evolução */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-neutral">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Nossa Evolução
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
            De uma ideia a uma organização que transforma milhares de vidas
          </p>

          <div className="relative">
            {/* Vertical Line - hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary"></div>

            {/* Timeline Items */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {[
                { year: '2015', title: 'O Sonho se Torna Realidade', desc: 'Carol funda o Instituto Sublim...', icon: '🌱' },
                { year: '2017', title: 'Primeiras Ações Comunitárias', desc: 'Início das oficinas...', icon: '🤝' },
                { year: '2019', title: 'Expansão das Parcerias', desc: 'Novas parcerias estratégicas...', icon: '🔄' },
                { year: '2022', title: 'Reconhecimento Oficial', desc: 'Certificações e validações...', icon: '🏆' },
                { year: '2024', title: 'Expandir o Impacto', desc: 'Novos planos de sustentabilidade...', icon: '📈' }
              ].map((item, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Mobile: Year at top */}
                  <div className="md:hidden">
                    <span className="text-2xl font-bold text-primary">{item.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-6 lg:pr-8 md:text-right' : 'md:pl-6 lg:pl-8'}`}>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
                  </div>
                  
                  {/* Icon - centered on desktop */}
                  <div className="hidden md:flex relative items-center justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center text-xl sm:text-2xl z-10">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Year - right side on desktop */}
                  <div className={`hidden md:block w-1/2 ${idx % 2 === 0 ? 'pl-6 lg:pl-8' : 'pr-6 lg:pr-8 text-right'}`}>
                    <span className="text-2xl sm:text-3xl font-bold text-primary">{item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparência Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Transparência é Nosso Compromisso
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base">
            Acreditamos que a confiança é construída através da transparência total.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '🎯', title: 'Missão', desc: 'Transformar vidas através da educação...' },
              { icon: '👁️', title: 'Visão', desc: 'Ser referência nacional em projetos...' },
              { icon: '💎', title: 'Valores', desc: 'Ética, respeito e transparência...' }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}