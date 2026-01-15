
import React from 'react';
import { MEDIA, EXPERT_INFO } from '../constants';

interface ResultViewProps {
  onContinue: () => void;
  answers: string[];
}

const ResultView: React.FC<ResultViewProps> = ({ onContinue, answers }) => {
  const whatsappMsg = encodeURIComponent(
    `Olá Dra. Thirza! Concluí minha análise exclusiva no site.\n\n` +
    `Foco: ${answers[0]}\n` +
    `Preocupação: ${answers[1]}\n` +
    `Experiência: ${answers[2]}\n\n` +
    `Podemos conversar sobre minha avaliação?`
  );
  
  const whatsappLink = `${EXPERT_INFO.whatsapp}&text=${whatsappMsg}`;

  return (
    <div className="fixed inset-0 z-[120] bg-white flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-1000 overflow-y-auto">
      <div className="max-w-md w-full text-center space-y-6 sm:space-y-10 py-8">
        {/* Badge & Title */}
        <div className="space-y-3">
          <span className="inline-block px-4 py-1.5 bg-[#F9F7F5] border border-[#4A3728]/10 rounded-full text-[#8B5E3C] text-[9px] font-black tracking-[0.3em] uppercase">
            Análise Concluída
          </span>
          <h1 className="text-3xl sm:text-6xl font-playfair font-bold text-[#4A3728] leading-tight">
            Perfil <span className="text-[#8B5E3C] italic">Identificado.</span>
          </h1>
        </div>

        {/* Hero Image - More Compact */}
        <div className="relative w-full max-w-[260px] sm:max-w-xs mx-auto aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl editorial-shadow group border-2 border-white">
          <img 
            src={MEDIA.thirdHero} 
            alt={EXPERT_INFO.name} 
            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A3728]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-5 left-0 right-0">
             <p className="text-white text-[9px] font-black uppercase tracking-[0.4em]">Dra. {EXPERT_INFO.name}</p>
          </div>
        </div>

        {/* Text and Actions */}
        <div className="space-y-6 px-2">
          <p className="text-[#4A3728]/70 text-sm sm:text-base leading-relaxed">
            Seu diagnóstico sugere o <strong>Método de Realce Sutil</strong>. O caminho ideal para a naturalidade que você busca.
          </p>

          <div className="flex flex-col gap-3">
            <a 
              href={whatsappLink}
              target="_blank"
              className="w-full py-5 bg-[#4A3728] text-white font-bold rounded-2xl shadow-lg hover:bg-[#2D1E17] transition-all text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <span>1. Enviar para a Dra.</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
            
            <a 
              href={EXPERT_INFO.whatsapp}
              target="_blank"
              className="w-full py-4 border border-[#4A3728]/10 text-[#4A3728] font-bold rounded-2xl hover:bg-[#F9F7F5] transition-all text-[9px] uppercase tracking-[0.15em]"
            >
              2. Falar direto no WhatsApp
            </a>

            <button 
              onClick={onContinue}
              className="pt-2 text-[#4A3728]/40 text-[9px] uppercase tracking-[0.3em] font-bold hover:text-[#4A3728] transition-all"
            >
              3. Ver site completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
