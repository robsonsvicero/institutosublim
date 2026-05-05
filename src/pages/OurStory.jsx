import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button';

export default function OurStory() {
  // Dados reais fornecidos pelo Instituto Sublim
  const familiasImpactadasFinal = 9000;
  const brigadaIncendioFormadas = 20;
  const capacitacaoOnlineFormadas = 30;
  const mentoriasJovens = 10;
  const asMarasFormadas = 50;
  const oficinasMusica = 40;
  const oficinasTecnologia = 40;
  const culturaParaTodos = 100;
  const oficinasRecreacao = 40;
  const cestasBasicas2025 = 200;
  const natalSolidario2025 = 450;
  const cacauShow2025 = 800;
  const empresasParceiras = [
    'Fundação Everis', 'Gerando Falcões', 'Brigada Solidária', 'Vertem', 'Sebrae', 'New Scool', 'Cruz Vermelha', 'Caça Fome', 'Fagotti Sociedade de Advogados', 'Mutirão do Bem', 'Corredores da Zona Norte', 'Deluxe – Perfumaria e Presentes', 'La Villette', 'Cri Amar', 'Projeto Formigueiro', 'UBS Vila Aurora', 'Rosa do Saron', 'Instituto Cacau Show', 'Associação Irmãos da Vila', 'Instituto Vidart', 'Pela rua pelo Reino'
  ];
  const bairrosAtendidos = [
    'Vila Aurora', 'Comunidade da Paz', 'São João', 'Corisco', 'Filhos da Terra', 'Jaçanã', 'Vila Albertina', 'Cachoeira', 'Tremembé', 'Jardim Brasil', 'Vila Ede', 'Imirim', 'Pery', 'Sucupira', 'Vila Nova Galvão', 'Pery Alto', 'Casa Verde', 'Boi Malhado', 'Santana', 'Tucuruvi', 'Mandaqui'
  ];

  // Estados para animação
  const [pessoasTransformadas, setPessoasTransformadas] = useState(0);
  const [taxaEmpregabilidade, setTaxaEmpregabilidade] = useState(0);
  const [certificacoes, setCertificacoes] = useState(0);
  const [comunidades, setComunidades] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumbers();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 1000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setPessoasTransformadas(Math.floor(pessoasTransformadasFinal * progress));
      setTaxaEmpregabilidade(Math.floor(taxaEmpregabilidadeFinal * progress));
      setCertificacoes(Math.floor(certificacoesFinal * progress));
      setComunidades(Math.floor(comunidadesFinal * progress));

      if (currentStep >= steps) {
        clearInterval(timer);
        setPessoasTransformadas(pessoasTransformadasFinal);
        setTaxaEmpregabilidade(taxaEmpregabilidadeFinal);
        setCertificacoes(certificacoesFinal);
        setComunidades(comunidadesFinal);
      }
    }, interval);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[780px] bg-cover bg-center pt-[120px] pb-[50px] px-[16px] lg:pt-[100px] lg:pb-[100px] lg:px-[204px]" style={{ backgroundImage: 'url(/images/hero-historia.png)' }}>
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container mx-auto">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Uma História Real de Impacto Social
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                Conheça a história de Carol Andrade, que transformou sua existência através da esperança em um propósito real de desenvolver crianças, jovens e comunidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carol Andrade Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Carol Andrade: A Determinação Inabalável que Transformou a Dor em Propósito
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-sm sm:text-base">
            A experiência que plantou a semente de que quando fosse adulta, faria o possível para que nenhuma criança passasse pelo mesmo.
          </p>

          {/* Story Cards */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {/* Card 1 - Raízes na Comunidade */}
            <article className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">Raízes na Comunidade</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  Carol Andrade nasceu na periferia da Zona Norte de São Paulo e desde muito cedo compreendeu o que significava a alta vulnerabilidade social. Aos 7 anos, assumiu o cuidado de seu lar e de seus dois irmãos, já que sua mãe, que veio do campo para ser doméstica e acabou como catadora, era paciente psiquiátrica. Para matar a fome da família, ela saía para pedir esmolas e, infelizmente, sofreu abuso sexual.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  Aos 9 anos, sua mãe perdeu a guarda dos filhos, e Carol foi parar em um orfanato com mais 180 crianças e lá, ela sofreu abusos psicológicos e agressões.
                </p>
                <blockquote className="border-l-4 border-teal-600 pl-4 italic text-gray-700 text-base leading-relaxed">
                  "Toda essa dor e essas feridas plantaram a semente de que, quando fosse adulta, faria o possível para que nenhuma criança passasse por aquilo."
                </blockquote>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 flex justify-center items-center">
                <img src="/images/carol_.png" alt="Carol Andrade" className="w-72 sm:w-96 lg:w-[450px] h-auto rounded-2xl" />
              </div>
            </article>

            {/* Card 2 - Educação Como Libertação */}
            <article className="flex flex-col md:flex-row-reverse items-center gap-8 sm:gap-10 lg:gap-16">
              <div className="md:w-1/2">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">Educação Como Libertação</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  Apesar das dificuldades, essa dor formou uma mulher forte, determinada e com o objetivo de fazer a diferença. Carol buscou a profissionalização: formou-se em <strong>Administração de Empresas</strong> e se especializou em <strong>Gestão do Terceiro Setor</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed text-base">
                  A iniciativa do Sublim ganhou vida quando Carol, enquanto gerenciava um abrigo, constatou a falha do sistema: cerca de <strong>90%</strong> dos jovens retornavam às periferias sem o suporte adequado para a reintegração. Diante disso, ela decidiu que era preciso enfrentar os desafios e romper as barreiras, focando em gerar oportunidades sustentáveis.
                </p>
              </div>
              <div className="md:w-1/2">
                <img src="/images/educacao.png" alt="Educação" className="rounded-2xl w-full h-64 sm:h-72 md:h-80 object-cover shadow-xl" />
              </div>
            </article>

            {/* Card 3 - O Nascimento de um Sonho */}
            <article className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5">O Nascimento de um Sonho</h3>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  O trabalho começou com o <strong>estudo do território em 2018</strong>. Em <strong>2019</strong>, Carol reuniu quatro amigos e iniciou as primeiras ações como coletivo, conseguindo atender <strong>9.000 famílias</strong> com cestas básicas, gás e kits de higiene.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-base">
                  A necessidade de ir além do amparo emergencial levou à formalização e em <strong>2020</strong>, o projeto se formalizou como uma ONG, iniciando os atendimentos com oficinas fixas.
                </p>
                <p className="text-gray-700 leading-relaxed text-base">
                  O <strong>Instituto Sublim</strong> nasceu com a missão de <strong>amparar seres humanos para promover uma transformação positiva e sustentável na sociedade</strong>, orientando crianças e adolescentes e capacitando mulheres. É a determinação de uma história que constrói um futuro onde as oportunidades se estendam a todos.
                </p>

              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src="/images/sonho.png" alt="Sonho" className="rounded-2xl w-full h-64 sm:h-72 md:h-80 object-cover shadow-xl" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Timeline - Nossa Evolução */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Nossa Evolução
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-sm sm:text-base">
            De uma ideia a uma organização que transforma milhares de vidas
          </p>

          <div className="relative">
            {/* Vertical Line - teal */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-teal-500 ml-6 md:ml-0"></div>

            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: '2018',
                  title: 'O Sonho se Torna Realidade',
                  desc: 'O trabalho de base e a determinação de Carol Andrade se materializaram com o estudo detalhado do território. Este período foi crucial para entender as necessidades reais das comunidades, garantindo que o Instituto nascesse com foco na efetividade e no impacto direcionado.',
                  icon: <i className="fa-regular fa-star"></i>,
                  iconColor: 'bg-teal-500',
                  position: 'left'
                },
                {
                  year: '2019',
                  title: 'Primeiras Ações Comunitárias',
                  desc: 'A iniciativa ganhou vida oficialmente. Carol se reuniu com mais quatro amigos e iniciou as primeiras ações como um coletivo. Neste ano, o grupo conseguiu atender 9.000 famílias com assistência emergencial, distribuindo cestas básicas, gás, kits de higiene, kits de frio e kits de produtos de limpeza.',
                  icon: <i className="fa-solid fa-user-group"></i>,
                  iconColor: 'bg-gray-500',
                  position: 'right'
                },
                {
                  year: '2020',
                  title: 'A Formalização',
                  desc: 'Com o crescimento e a necessidade de estruturar o apoio, o projeto foi formalizado. Passamos de coletivo para ONG, o que possibilitou iniciar os atendimentos regulares com as primeiras oficinas fixas, consolidando a capacidade de atuação na Zona Norte de São Paulo.',
                  icon: <i className="fa-solid fa-head-side-mask"></i>,
                  iconColor: 'bg-gray-500',
                  position: 'left'
                },
                {
                  year: '2021',
                  title: 'Em Busca de Novos Parceiros',
                  desc: 'Embora as oficinas fixas estivessem ativas, este foi um ano dedicado à expansão e credibilidade. O Instituto não possuía todas as certificações necessárias, mas estava ativamente em busca de novos parceiros para conseguir aprimorar e qualificar os atendimentos oferecidos à comunidade.',
                  icon: <i className="fa-solid fa-award"></i>,
                  iconColor: 'bg-gray-500',
                  position: 'right'
                },
                {
                  year: '2022 - 2025',
                  title: 'Expansão e Impacto',
                  desc: 'O esforço em prol da transparência se concretizou e em 2022, obtivemos as certificações essenciais, reforçando nossa governança e abrindo caminho para parcerias mais sólidas. O período de 2022 a 2025 foi marcado pelo impacto em mais de 2.500 pessoas,  12 projetos ativos e consolidação como referência em transformação social na Zona Norte.',
                  icon: <i className="fa-solid fa-bullseye"></i>,
                  iconColor: 'bg-teal-500',
                  position: 'left'
                }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Mobile and Desktop Layout */}
                  <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 ${item.position === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    {/* Year label - mobile */}
                    <div className="md:hidden ml-16">
                      <span className="text-sm font-semibold text-gray-500">{item.year}</span>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[calc(50%-40px)] ml-16 md:ml-0 ${item.position === 'right' ? 'md:pl-10' : 'md:pr-10'}`}>
                      <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-gray-500">{item.year}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Icon - centered on timeline */}
                    <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 ${idx === 0 ? 'top-0' : 'top-0'}`}>
                      <div className={`w-12 h-12 ${item.iconColor} rounded-full flex items-center justify-center shadow-lg z-10`}>
                        <span className="text-xl text-white">{item.icon}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparência Section */}
      <section className="py-[50px] px-[16px] lg:py-[100px] lg:px-[204px] bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Transparência é Nosso Compromisso
          </h2>
          <p className="text-center text-gray-600 mb-12 sm:mb-16 text-sm sm:text-base">
            Acreditamos que a confiança é construída através da transparência total em nossas ações e resultados.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Missão */}
            <div className="bg-teal-50 rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-5">
                <i className="fas fa-bullseye text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Missão</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Nossa missão é oferecer suporte social às crianças, adolescentes e suas famílias, residentes da zona norte da cidade de São Paulo, através de oficinas, workshops, mentorias e levando comida a quem mais precisa.
              </p>
            </div>

            {/* Card 2 - Visão */}
            <div className="bg-teal-50 rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-5">
                <i className="fas fa-star text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Ser a ONG referência da zona norte de São Paulo gerenciada por uma mulher negra e ex-abrigada, transformando vidas e gerando uma sociedade mais justa e digna.
              </p>
            </div>

            {/* Card 3 - Valores */}
            <div className="bg-teal-50 rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-5">
                <i className="fas fa-circle-check text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Valores</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Transparência nas ações, solidariedade no cuidado com as pessoas, respeito em cada relação construída e compromisso verdadeiro com aquilo que assumimos e entregamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[80px] px-[16px] lg:py-[120px] lg:px-[204px] bg-gradient-to-r from-green-500 via-teal-600 to-blue-700">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Sua História Pode Começar Agora
          </h2>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-3xl mx-auto">
            Assim como Carol transformou sua dor em propósito, você pode fazer parte desta transformação. Cada doação é um voto de confiança no potencial humano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/seja-parceiro">
              <Button variant="primary" size="lg" icon="fas fa-heart">
                QUERO TRANSFORMAR VIDAS
              </Button>
            </a>
            <a href="/transparencia">
              <Button variant="outline" size="lg" icon="fas fa-arrow-right" iconPosition="right">
                Ver Nossa Transparência
              </Button>
            </a>

          </div>
        </div>
      </section>
    </div>
  );
}