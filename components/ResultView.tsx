
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
    <div className="fixed inset-0 z-[120] bg-white flex flex-col items-center justify-center p-8 animate-in fade-in duration-1000">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-4">
          <span className="inline-block px-5 py-2 bg-[#F9F7F5] border border-[#4A3728]/10 rounded-full text-[#8B5E3C] text-[10px] font-black tracking-[0.4em] uppercase">
            Analise de Harmonia Concluída
          </span>
          <h1 className="text-4xl sm:text-7xl font-playfair font-bold text-[#4A3728] leading-[0.9]">
            Seu perfil é <br/>
            <span className="text-[#8B5E3C] italic">Perfeito.</span>
          </h1>
        </div>

        <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl editorial-shadow group border-4 border-white">
          <img 
            src={MEDIA.thirdHero} 
            alt={EXPERT_INFO.name} 
            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A3728]/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-0 right-0">
             <p className="text-white text-[11px] font-black uppercase tracking-[0.5em]">Dra. {EXPERT_INFO.name}</p>
          </div>
        </div>

        <div className="space-y-8 max-w-lg mx-auto">
          <p className="text-[#4A3728]/70 text-lg leading-relaxed">
            Com base em suas escolhas, identificamos que o <strong>Método de Realce Sutil</strong> é o mais indicado para entregar a naturalidade que você busca.
          </p>

          <div className="flex flex-col gap-4">
            <a 
              href={whatsappLink}
              target="_blank"
              className="w-full py-7 bg-[#4A3728] text-white font-bold rounded-3xl shadow-xl hover:bg-[#2D1E17] transition-all text-xs uppercase tracking-[0.3em]"
            >
              1. Enviar Avaliação para a Dra.
            </a>
            
            <a 
              href={EXPERT_INFO.whatsapp}
              target="_blank"
              className="w-full py-6 border border-[#4A3728]/10 text-[#4A3728] font-bold rounded-3xl hover:bg-[#F9F7F5] transition-all text-[10px] uppercase tracking-[0.2em]"
            >
              2. Falar direto no WhatsApp
            </a>

            <button 
              onClick={onContinue}
              className="pt-4 text-[#4A3728]/30 text-[9px] uppercase tracking-[0.4em] font-black hover:text-[#4A3728] transition-all"
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
