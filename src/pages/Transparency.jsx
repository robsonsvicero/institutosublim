import React from 'react';
import { Button } from '../components/ui';

export default function Transparency() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Transparência Financeira
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conheça como administramos nossos recursos para garantir maior eficiência e clareza em todas as nossas ações.
            </p>
          </div>

          {/* Financial Data Section */}
          <div className="max-w-5xl mx-auto space-y-6 mb-16">
            {/* Receita */}
            <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-1">
                <div className="text-gray-800 font-semibold mb-2">Receita</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="ml-8 text-right">
                <div className="text-2xl font-bold text-gray-800">R$ 2.5M</div>
              </div>
            </div>

            {/* Programa */}
            <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-1">
                <div className="text-gray-800 font-semibold mb-2">Programa</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="ml-8 text-right">
                <div className="text-2xl font-bold text-gray-800">R$ 1.8M</div>
              </div>
            </div>

            {/* Arrecadação */}
            <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-1">
                <div className="text-gray-800 font-semibold mb-2">Arrecadação</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-300 h-3 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div className="ml-8 text-right">
                <div className="text-2xl font-bold text-gray-800">R$ 1.6M</div>
              </div>
            </div>

            {/* Administrativo */}
            <div className="flex items-center justify-between bg-white rounded-lg p-6 shadow-sm">
              <div className="flex-1">
                <div className="text-gray-800 font-semibold mb-2">Administrativo</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-200 h-3 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="ml-8 text-right">
                <div className="text-2xl font-bold text-gray-800">R$ 950K</div>
              </div>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Total Doações */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-gray-600 text-sm mb-3">Total Doações</div>
              <div className="text-4xl font-bold text-gray-800 mb-3">R$ 2.5M</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Recursos recebidos através de doações de pessoas físicas, jurídicas e parcerias institucionais.
              </p>
            </div>

            {/* Documentação */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-gray-600 text-sm mb-3">Documentação</div>
              <div className="text-4xl font-bold text-gray-800 mb-3">100%</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Todos os documentos fiscais e relatórios disponíveis para consulta pública a qualquer momento.
              </p>
            </div>

            {/* Certificações */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="text-gray-600 text-sm mb-3">Certificações</div>
              <div className="text-4xl font-bold text-gray-800 mb-3">5+</div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Certificações de órgãos reguladores atestando nossa conformidade com as melhores práticas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nossa História
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Uma trajetória de compromisso, superação e impacto social na vida de milhares de pessoas.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Item 1 - Fundação */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
                      2015
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Fundação
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      O Instituto Sublim nasceu do sonho de transformar vidas através da educação e desenvolvimento comunitário na Zona Norte de São Paulo.
                    </p>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </div>

              {/* Item 2 - Primeiro Programa */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div className="hidden md:block"></div>
                  <div className="mb-8 md:mb-0">
                    <div className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
                      2016
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Primeiro Programa
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Lançamento do nosso primeiro programa educacional, atendendo 50 crianças e adolescentes da comunidade local.
                    </p>
                  </div>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </div>

              {/* Item 3 - Expansão Nacional */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
                      2019
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Expansão Nacional
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Crescimento exponencial nos levou a expandir nossas ações para outros estados, impactando mais de 2.000 vidas anualmente.
                    </p>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </div>

              {/* Item 4 - Certificação OSCIP */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div className="hidden md:block"></div>
                  <div className="mb-8 md:mb-0">
                    <div className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
                      2021
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Certificação OSCIP
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Reconhecimento oficial como Organização da Sociedade Civil de Interesse Público, fortalecendo nossa credibilidade.
                    </p>
                  </div>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </div>

              {/* Item 5 - Transformação Digital */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
                      2023
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Transformação Digital
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Implementação de plataforma digital para ensino híbrido, alcançando estudantes em locais remotos de todo o país.
                    </p>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </div>

              {/* Item 6 - Impacto Global */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                  <div className="hidden md:block"></div>
                  <div className="mb-8 md:mb-0">
                    <div className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold text-lg mb-4">
                      2024
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Impacto Global
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Parcerias internacionais estabelecidas, compartilhando nossa metodologia com organizações em outros países da América Latina.
                    </p>
                  </div>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Faça parte dessa história de transformação
            </p>
            <Button variant="primary" size="lg" icon="fa-solid fa-arrow-right" iconPosition="right">
              Junte-se a Nós
            </Button>
          </div>
        </div>
      </section>

      {/* Nossas Oficinas Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nossas Oficinas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Programas educacionais e de capacitação que transformam vidas através do conhecimento e desenvolvimento de habilidades.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Oficina 1 - Educação Financeira */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-graduation-cap text-3xl text-orange-500"></i>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Educação Financeira
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Aprenda a gerenciar suas finanças pessoais, fazer investimentos inteligentes e construir um futuro financeiro sólido.
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Saiba Mais
                </Button>
              </div>
              <div className="bg-gray-50 px-8 py-4 text-sm text-gray-600">
                <i className="fas fa-clock mr-2"></i>
                Duração: 8 semanas
              </div>
            </div>

            {/* Oficina 2 - Desenvolvimento Pessoal */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-briefcase text-3xl text-red-500"></i>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Desenvolvimento Pessoal
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Autoconhecimento, inteligência emocional e desenvolvimento de soft skills essenciais para o sucesso profissional.
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Saiba Mais
                </Button>
              </div>
              <div className="bg-gray-50 px-8 py-4 text-sm text-gray-600">
                <i className="fas fa-clock mr-2"></i>
                Duração: 10 semanas
              </div>
            </div>

            {/* Oficina 3 - Empreendedorismo */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-lightbulb text-3xl text-pink-500"></i>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Empreendedorismo
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Desenvolva seu próprio negócio desde a concepção da ideia até a execução, com mentoria especializada.
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Saiba Mais
                </Button>
              </div>
              <div className="bg-gray-50 px-8 py-4 text-sm text-gray-600">
                <i className="fas fa-clock mr-2"></i>
                Duração: 12 semanas
              </div>
            </div>

            {/* Oficina 4 - Tecnologia & Inovação */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-laptop-code text-3xl text-blue-500"></i>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Tecnologia & Inovação
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Introdução à programação, desenvolvimento web e mobile, preparando você para o mercado de tecnologia.
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Saiba Mais
                </Button>
              </div>
              <div className="bg-gray-50 px-8 py-4 text-sm text-gray-600">
                <i className="fas fa-clock mr-2"></i>
                Duração: 16 semanas
              </div>
            </div>

            {/* Oficina 5 - Saúde Mental e Bem-estar */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-heart text-3xl text-purple-500"></i>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Saúde Mental e Bem-estar
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Práticas de mindfulness, gestão do estresse e técnicas para manutenção do equilíbrio emocional.
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Saiba Mais
                </Button>
              </div>
              <div className="bg-gray-50 px-8 py-4 text-sm text-gray-600">
                <i className="fas fa-clock mr-2"></i>
                Duração: 6 semanas
              </div>
            </div>

            {/* Oficina 6 - Cidadania e Direitos */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-balance-scale text-3xl text-yellow-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Cidadania e Direitos
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Conhecimento sobre direitos fundamentais, participação cidadã e como exercer plenamente sua cidadania.
                </p>
                <Button variant="primary" size="sm" className="w-full">
                  Saiba Mais
                </Button>
              </div>
              <div className="bg-gray-50 px-8 py-4 text-sm text-gray-600">
                <i className="fas fa-clock mr-2"></i>
                Duração: 8 semanas
              </div>
            </div>
          </div>

          {/* CTA para todas as oficinas */}
          <div className="text-center mt-16">
            <Button variant="primary" size="lg">
              Ver Todas as Oficinas
            </Button>
          </div>
        </div>
      </section>

      {/* Nosso Impacto Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nosso Impacto
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Resultados concretos que demonstram nossa dedicação em transformar vidas e comunidades.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Stat 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-users text-4xl text-purple-600"></i>
              </div>
              <div className="text-5xl font-bold text-gray-800 mb-3">15K+</div>
              <div className="text-gray-600 font-semibold mb-2">Vidas Transformadas</div>
              <p className="text-sm text-gray-500">
                Pessoas beneficiadas diretamente por nossos programas desde a fundação
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-graduation-cap text-4xl text-blue-600"></i>
              </div>
              <div className="text-5xl font-bold text-gray-800 mb-3">2.4K</div>
              <div className="text-gray-600 font-semibold mb-2">Programas Educativos</div>
              <p className="text-sm text-gray-500">
                Oficinas e cursos realizados em diversas áreas do conhecimento
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-briefcase text-4xl text-red-600"></i>
              </div>
              <div className="text-5xl font-bold text-gray-800 mb-3">1.2K</div>
              <div className="text-gray-600 font-semibold mb-2">Pessoas Empregadas</div>
              <p className="text-sm text-gray-500">
                Beneficiários que conquistaram emprego formal após capacitação
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-hands-helping text-4xl text-green-600"></i>
              </div>
              <div className="text-5xl font-bold text-gray-800 mb-3">180+</div>
              <div className="text-gray-600 font-semibold mb-2">Comunidades Atendidas</div>
              <p className="text-sm text-gray-500">
                Bairros e comunidades impactadas por nossos projetos sociais
              </p>
            </div>

            {/* Stat 5 */}
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart text-4xl text-yellow-600"></i>
              </div>
              <div className="text-5xl font-bold text-gray-800 mb-3">95%</div>
              <div className="text-gray-600 font-semibold mb-2">Taxa de Satisfação</div>
              <p className="text-sm text-gray-500">
                Avaliação positiva dos beneficiários sobre nossos programas
              </p>
            </div>

            {/* Stat 6 */}
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-chart-line text-4xl text-indigo-600"></i>
              </div>
              <div className="text-5xl font-bold text-gray-800 mb-3">12X</div>
              <div className="text-gray-600 font-semibold mb-2">Sustentabilidade</div>
              <p className="text-sm text-gray-500">
                Retorno social sobre investimento em nossos projetos educacionais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary to-green-500 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Juntos, podemos fazer ainda mais pela transformação social
            </h2>
            <p className="text-lg opacity-90 mb-10 leading-relaxed">
              Sua doação é fundamental para expandirmos nosso alcance e impactarmos ainda mais vidas. 
              Seja parte dessa história de transformação e faça a diferença na vida de milhares de pessoas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="secondary" size="lg" icon="fa-solid fa-heart">
                Fazer uma Doação
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Baixar Relatório Completo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parceiros Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Nossos Parceiros
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Organizações e empresas que acreditam no nosso propósito e nos apoiam nessa jornada de transformação social.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {/* Parceiro 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-gray-100 hover:border-primary transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-leaf text-2xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-bold">Empresa Parceira</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Apoio institucional e financiamento de programas educacionais
              </p>
            </div>

            {/* Parceiro 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-gray-100 hover:border-primary transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-handshake text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-lg font-bold">Governo Federal</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Convênios para expansão de projetos sociais em território nacional
              </p>
            </div>

            {/* Parceiro 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-gray-100 hover:border-primary transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-university text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-lg font-bold">Fundação Social</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Parceria estratégica para desenvolvimento de metodologias educacionais
              </p>
            </div>

            {/* Parceiro 4 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-gray-100 hover:border-primary transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-building text-2xl text-yellow-600"></i>
                </div>
                <h3 className="text-lg font-bold">Grupo Empresarial</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Patrocínio de oficinas profissionalizantes e inserção no mercado
              </p>
            </div>

            {/* Parceiro 5 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-gray-100 hover:border-primary transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-heart text-2xl text-red-600"></i>
                </div>
                <h3 className="text-lg font-bold">Fundação Social</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Apoio em ações de impacto social e desenvolvimento comunitário
              </p>
            </div>

            {/* Parceiro 6 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-gray-100 hover:border-primary transition-colors">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-globe text-2xl text-orange-600"></i>
                </div>
                <h3 className="text-lg font-bold">ONG Internacional</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Cooperação técnica e intercâmbio de boas práticas sociais
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" icon="fa-solid fa-handshake">
              Torne-se um Parceiro
            </Button>
          </div>
        </div>
      </section>

      {/* Interesse em Parceria Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary to-green-600 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Interessado em Parceria?
                </h2>
                <p className="text-lg opacity-90 mb-6 leading-relaxed">
                  Junte-se a nós nessa missão de transformar vidas através da educação e desenvolvimento social. 
                  Juntos, podemos fazer muito mais!
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-2xl mr-3 mt-1"></i>
                    <span>Visibilidade da sua marca em ações sociais</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-2xl mr-3 mt-1"></i>
                    <span>Relatórios de impacto social mensuráveis</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-2xl mr-3 mt-1"></i>
                    <span>Certificações e reconhecimento público</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-2xl mr-3 mt-1"></i>
                    <span>Engajamento de colaboradores em causas sociais</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 text-gray-800">
                <h3 className="text-2xl font-bold mb-6">Entre em Contato</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="E-mail corporativo"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Empresa / Organização"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      rows="4"
                      placeholder="Mensagem"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>
                  <Button variant="primary" size="lg" className="w-full">
                    Enviar Proposta
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
