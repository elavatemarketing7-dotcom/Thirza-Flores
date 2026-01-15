
import React, { useState } from 'react';
import { QuizStep } from '../types';
import { EXPERT_INFO, MEDIA } from '../constants';

interface QuizOverlayProps {
  steps: QuizStep[];
  onComplete: (answers: string[]) => void;
  onSkip: () => void;
}

const QuizOverlay: React.FC<QuizOverlayProps> = ({ steps, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-[110] bg-white flex flex-col md:flex-row animate-in fade-in duration-700">
      {/* Visual Side (Desktop Only) */}
      <div className="hidden md:flex w-2/5 bg-[#F9F7F5] flex-col justify-between p-20 border-r border-[#4A3728]/5">
        <div className="space-y-6">
          <div className="w-48 h-48 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white rotate-2 transition-transform hover:rotate-0 duration-700">
            <img src={MEDIA.mainHero} alt="Dra. Thirza" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <h2 className="text-4xl font-playfair font-bold text-[#4A3728]">Dra. {EXPERT_INFO.name}</h2>
            <p className="text-[#8B5E3C] text-[10px] uppercase tracking-[0.4em] font-bold">Análise Facial Exclusiva</p>
          </div>
        </div>
        <p className="text-[#4A3728]/40 text-xs italic max-w-xs">"O segredo de uma boa harmonização é a sutileza dos detalhes."</p>
      </div>

      {/* Quiz Side */}
      <div className="flex-1 flex flex-col px-6 py-8 sm:p-24 justify-center overflow-y-auto bg-white">
        <div className="max-w-xl w-full mx-auto space-y-8 sm:space-y-12">
          
          {/* Mobile Expert Header - New Element */}
          <div className="flex items-center gap-4 pb-6 border-b border-[#4A3728]/5 sm:hidden">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-[#F9F7F5]">
              <img src={MEDIA.mainHero} alt={EXPERT_INFO.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[#4A3728] font-playfair font-bold text-lg">Dra. {EXPERT_INFO.name}</p>
              <p className="text-[#8B5E3C] text-[8px] uppercase tracking-widest font-black">Sua Avaliação Particular</p>
            </div>
          </div>

          {/* Header Info */}
          <div className="flex justify-between items-center">
            <div className="text-[9px] sm:text-[11px] text-[#8B5E3C] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em]">
              ETAPA {currentStep + 1} / {steps.length}
            </div>
            <button 
              onClick={onSkip} 
              className="text-[9px] sm:text-[10px] text-[#4A3728]/40 hover:text-[#4A3728] uppercase tracking-widest font-bold"
            >
              Pular
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-[1.5px] sm:h-[2px] w-full bg-[#4A3728]/5 overflow-hidden">
            <div 
              className="h-full bg-[#4A3728] transition-all duration-1000 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Question and Options */}
          <div className="space-y-6 sm:space-y-10">
            <h3 className="text-2xl sm:text-5xl font-playfair font-bold text-[#4A3728] leading-[1.2]">
              {steps[currentStep].question}
            </h3>

            <div className="grid gap-3 sm:gap-4">
              {steps[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full p-5 sm:p-7 text-left border border-[#4A3728]/10 rounded-2xl sm:rounded-3xl hover:border-[#4A3728] hover:bg-[#F9F7F5] transition-all flex items-center justify-between group active:scale-[0.98]"
                >
                  <span className="text-sm sm:text-base font-medium text-[#4A3728]/80 group-hover:text-[#4A3728]">
                    {option}
                  </span>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-[#4A3728]/10 flex items-center justify-center text-[8px] sm:text-[10px] text-[#4A3728]/30 group-hover:bg-[#4A3728] group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-center text-[8px] text-[#4A3728]/30 uppercase tracking-widest font-bold sm:pt-4">
            Respostas Seguras e Confidenciais
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizOverlay;
