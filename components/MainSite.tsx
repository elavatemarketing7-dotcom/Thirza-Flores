
import React, { useState, useRef, useEffect } from 'react';
import { MEDIA, EXPERT_INFO } from '../constants';

const MainSite: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented by browser:", error);
      });
    }
  }, []);

  const sections = [
    { id: 'sobre-mim', name: 'A Expert' },
    { id: 'prova-visual', name: 'Resultados' },
    { id: 'harmonizacao', name: 'Harmonização' },
    { id: 'depoimentos', name: 'Depoimentos' },
    { id: 'onde-encontrar', name: 'Localização' },
    { id: 'contato', name: 'Agendar' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EXPERT_INFO.address)}`;

  return (
    <div className="relative bg-white selection:bg-[#4A3728] selection:text-white">
      {/* Navigation Pill */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-lg">
        <div className="glass-pill px-8 py-4 flex items-center justify-between shadow-lg overflow-hidden border border-[#4A3728]/5">
          <div className="animate-ticker flex space-x-12 whitespace-nowrap items-center">
            {[...sections, ...sections].map((sec, idx) => (
              <button 
                key={idx} 
                onClick={() => scrollToSection(sec.id)}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#4A3728]/60 hover:text-[#4A3728] transition-colors"
              >
                {sec.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center items-center py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={MEDIA.mainHero} 
            alt="Dra. Thirza Flores Hero" 
            className="w-full h-full object-cover object-top opacity-40 md:opacity-50"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-6xl text-center flex flex-col items-center space-y-12">
          <div className="space-y-6">
            <span className="inline-block px-5 py-2 border border-[#4A3728]/30 rounded-full text-[#4A3728] text-[10px] font-black tracking-[0.5em] uppercase bg-white/40 backdrop-blur-sm">
              Excelência Facial
            </span>
            <h1 className="text-6xl sm:text-9xl font-playfair font-bold leading-[0.85] tracking-tighter text-[#2D1E17] drop-shadow-sm">
              Sua beleza <br/>
              <span className="text-[#8B5E3C] italic font-light">Elevada.</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-center gap-8 max-w-xl">
            <a 
              href={EXPERT_INFO.whatsapp} 
              target="_blank"
              className="px-16 py-7 bg-[#4A3728] text-white font-bold text-xs uppercase tracking-[0.3em] rounded-full hover:bg-[#2D1E17] transition-all shadow-2xl shadow-[#4A3728]/40 hover:scale-105 active:scale-95"
            >
              Agendar Avaliação
            </a>
            <p className="text-[#4A3728] text-xs font-semibold uppercase tracking-[0.25em] leading-relaxed bg-white/30 backdrop-blur-sm px-6 py-2 rounded-full">
              Onde a ciência encontra a sensibilidade para criar resultados naturais.
            </p>
          </div>
        </div>
      </header>

      {/* Video section */}
      <section className="py-32 px-6 bg-[#F9F7F5]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
           <div className="w-full md:w-1/2 relative">
              <div className="aspect-[9/16] rounded-[3rem] overflow-hidden shadow-2xl editorial-shadow bg-[#2D1E17]">
                <video 
                  ref={videoRef}
                  src={MEDIA.introVideo} 
                  poster={MEDIA.mainHero}
                  muted 
                  autoPlay 
                  loop 
                  playsInline 
                  preload="metadata"
                  className="w-full h-full object-cover transition-opacity duration-1000" 
                />
              </div>
           </div>
           <div className="w-full md:w-1/2 space-y-10">
              <h2 className="text-5xl sm:text-7xl font-playfair font-bold text-[#4A3728] leading-tight">
                Técnica & <br/><span className="text-[#8B5E3C] italic">Cuidado Único.</span>
              </h2>
              <p className="text-[#4A3728]/70 font-light leading-relaxed text-lg">
                Descubra como a beleza pode ser realçada com sensibilidade e propósito. O Método da Dra. Thirza entende que sua harmonia é única e merece atenção especial.
              </p>
              <div className="font-dancing text-5xl text-[#8B5E3C] border-b border-[#8B5E3C]/20 pb-4 inline-block">Thirza Flores</div>
           </div>
        </div>
      </section>

      {/* Portfolio Grid - Sliding Version */}
      <section id="prova-visual" className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-4">
              <span className="text-[#8B5E3C] font-bold text-[10px] uppercase tracking-[0.4em]">Galeria de Resultados</span>
              <h2 className="text-6xl sm:text-8xl font-playfair font-bold text-[#4A3728]">O Impacto da <br/><span className="italic">Naturalidade.</span></h2>
            </div>
          </div>
        </div>
        
        <div className="relative flex overflow-hidden">
          <div className="animate-ticker flex space-x-6 whitespace-nowrap px-6">
            {[...MEDIA.results, ...MEDIA.results].map((url, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(url)}
                className="w-64 sm:w-80 flex-shrink-0 relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 aspect-[3/4]"
              >
                <img src={url} alt={`Resultado ${idx}`} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[#4A3728]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harmonização de 💚 Gallery - Sliding Version */}
      <section id="harmonizacao" className="py-32 bg-[#F9F7F5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-4">
          <h2 className="text-4xl sm:text-6xl font-playfair font-bold text-[#4A3728]">Harmonização de <span className="text-[#8B5E3C]">💚</span></h2>
          <p className="text-[#8B5E3C] text-[10px] uppercase tracking-[0.4em] font-bold">O Estilo de Vida Thirza Flores</p>
          <div className="w-20 h-px bg-[#8B5E3C]/30 mx-auto"></div>
        </div>
        
        <div className="relative flex overflow-hidden">
          <div className="animate-ticker flex space-x-6 whitespace-nowrap px-6" style={{ animationDuration: '30s' }}>
            {[...MEDIA.loveGallery, ...MEDIA.loveGallery].map((url, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveImage(url)}
                className="w-64 sm:w-96 flex-shrink-0 relative group cursor-pointer overflow-hidden rounded-[2.5rem] shadow-lg transition-all duration-700 hover:scale-[1.02] aspect-[4/5]"
              >
                <img 
                  src={url} 
                  alt={`Harmonização Gallery ${idx}`} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3728]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Comments Section - Sliding Version */}
      <section id="depoimentos" className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[#8B5E3C] font-bold text-[10px] uppercase tracking-[0.4em]">Experiências</span>
            <h2 className="text-5xl sm:text-7xl font-playfair font-bold text-[#4A3728]">O que dizem nossas <br/><span className="italic">Pacientes.</span></h2>
          </div>
        </div>

        <div className="relative flex overflow-hidden">
          <div className="animate-ticker flex space-x-8 whitespace-nowrap px-6" style={{ animationDuration: '50s' }}>
            {[...MEDIA.comments, ...MEDIA.comments].map((url, idx) => (
              <div 
                key={idx} 
                className="w-72 sm:w-[450px] flex-shrink-0 group cursor-pointer"
                onClick={() => setActiveImage(url)}
              >
                <div className="bg-[#F9F7F5] p-3 rounded-[3rem] shadow-sm border border-[#4A3728]/5 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  <img 
                    src={url} 
                    alt={`Comentário ${idx}`} 
                    className="w-full h-auto rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-700" 
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center pt-16">
           <a 
             href={EXPERT_INFO.instagram} 
             target="_blank"
             className="text-[#8B5E3C] font-black text-[10px] uppercase tracking-[0.3em] border-b border-[#8B5E3C]/30 pb-2 hover:text-[#4A3728] hover:border-[#4A3728] transition-all"
           >
             Ver mais no Instagram
           </a>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mim" className="py-32 px-6 bg-[#F9F7F5] relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 md:order-1">
             <img src={MEDIA.secondaryHero} alt="Dra. Thirza" className="w-full rounded-[4rem] shadow-2xl grayscale" loading="lazy" />
             <div className="absolute top-10 -right-10 bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#4A3728]/5 hidden lg:block">
                <p className="text-[#4A3728] font-playfair font-bold text-4xl mb-2 italic">A Expert</p>
                <p className="text-[#8B5E3C] text-[10px] uppercase tracking-widest font-bold">Por trás da técnica</p>
             </div>
          </div>
          <div className="space-y-10 order-1 md:order-2">
            <h2 className="text-5xl sm:text-7xl font-playfair font-bold text-[#4A3728]">Quem é a <br/><span className="text-[#8B5E3C] italic">Dra. Thirza?</span></h2>
            <div className="space-y-6 text-[#4A3728]/70 leading-relaxed text-lg">
              <p>Minha abordagem é pautada pelo respeito absoluto à anatomia humana. Acredito que a harmonização facial de sucesso é aquela que ninguém percebe que foi feita, mas todos notam que você está mais radiante.</p>
              <p>Com anos de prática clínica em Belo Horizonte, desenvolvi protocolos exclusivos que unem segurança biológica e visão artística.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6">
               <div className="space-y-2">
                  <p className="text-3xl font-playfair font-bold text-[#4A3728]">1.5k+</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B5E3C]">Vidas Transformadas</p>
               </div>
               <div className="space-y-2">
                  <p className="text-3xl font-playfair font-bold text-[#4A3728]">09</p>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B5E3C]">Anos de Carreira</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Address */}
      <section id="onde-encontrar" className="py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-1/2 space-y-12 text-left">
            <div className="space-y-6">
              <span className="text-[#8B5E3C] font-bold text-[10px] uppercase tracking-[0.4em]">Localização</span>
              <h2 className="text-5xl font-playfair font-bold text-[#4A3728]">Nosso <br/><span className="italic">Santuário.</span></h2>
              <p className="text-[#4A3728]/60 text-lg font-light leading-relaxed max-w-sm">
                Projetado para oferecer o máximo de privacidade e conforto em cada etapa da sua jornada estética.
              </p>
            </div>
            <div className="space-y-8">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-6 border-l-2 border-[#8B5E3C]/20 pl-6 hover:border-[#8B5E3C] transition-all"
              >
                <div>
                  <p className="text-sm text-[#4A3728] leading-loose font-medium group-hover:text-[#8B5E3C] transition-colors">{EXPERT_INFO.address}</p>
                  <p className="text-[9px] uppercase tracking-widest font-bold text-[#8B5E3C]/60 mt-2">Clique para abrir no GPS</p>
                </div>
              </a>
              <div className="flex gap-4">
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  className="inline-block bg-[#F9F7F5] border border-[#4A3728]/10 px-8 py-4 rounded-full text-[#4A3728] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#4A3728] hover:text-white transition-all shadow-sm"
                >
                  Ver no Mapa
                </a>
                <a 
                  href={EXPERT_INFO.whatsapp}
                  target="_blank"
                  className="inline-block text-[#8B5E3C] font-black text-[10px] uppercase tracking-[0.2em] border-b border-[#8B5E3C]/30 pb-2 hover:text-[#4A3728] hover:border-[#4A3728] transition-all self-center ml-4"
                >
                  Solicitar Direções
                </a>
              </div>
            </div>
          </div>
          <a 
            href={googleMapsUrl}
            target="_blank"
            className="w-full md:w-1/2 h-[500px] rounded-[4rem] overflow-hidden shadow-2xl grayscale transition-all duration-1000 hover:grayscale-0 border border-[#4A3728]/10 block"
          >
            <iframe 
              width="100%" height="100%" frameBorder="0" 
              src={`https://maps.google.com/maps?q=${encodeURIComponent(EXPERT_INFO.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              loading="lazy"
              className="pointer-events-none"
            />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="py-32 px-6 text-center bg-[#F9F7F5] border-t border-[#4A3728]/5">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-6">
            <h2 className="text-5xl sm:text-7xl font-playfair font-bold text-[#4A3728]">Inicie seu <br/> <span className="text-[#8B5E3C] italic">Novo Capítulo.</span></h2>
            <p className="text-[#4A3728]/40 text-[11px] uppercase tracking-[0.5em] font-bold">Agenda Aberta | Belo Horizonte</p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            <a 
              href={EXPERT_INFO.whatsapp} 
              className="px-16 py-8 bg-[#4A3728] text-white font-bold text-xs uppercase tracking-[0.4em] rounded-full hover:bg-[#2D1E17] transition-all shadow-xl shadow-[#4A3728]/20"
            >
              Agendar Experiência
            </a>
            <div className="font-dancing text-6xl text-[#8B5E3C] pt-10">Thirza Flores</div>
          </div>

          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 text-[10px] uppercase tracking-[0.3em] font-bold text-[#4A3728]">
            <div className="flex gap-10">
              <a href={EXPERT_INFO.instagram} target="_blank" className="hover:text-[#8B5E3C]">Instagram</a>
              <a href={EXPERT_INFO.whatsapp} target="_blank" className="hover:text-[#8B5E3C]">WhatsApp</a>
            </div>
            <p>© 2024 THIRZA FLORES HARMONIZAÇÃO. ESSÊNCIA & CIÊNCIA.</p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] bg-white/95 flex items-center justify-center p-6 animate-in fade-in duration-500"
          onClick={() => setActiveImage(null)}
        >
          <img src={activeImage} alt="Zoom" className="max-w-full max-h-full rounded-[2rem] shadow-2xl" />
        </div>
      )}
    </div>
  );
};

export default MainSite;