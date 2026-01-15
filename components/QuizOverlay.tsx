
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
      {/* Visual Side */}
      <div className="hidden md:flex w-2/5 bg-[#F9F7F5] flex-col justify-between p-20 border-r border-[#4A3728]/5">
        <div className="space-y-6">
          <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl border border-[#4A3728]/10 rotate-3">
            <img src={MEDIA.secondaryHero} alt="Dra. Thirza" className="w-full h-full object-cover grayscale" />
          </div>
          <h2 className="text-4xl font-playfair font-bold text-[#4A3728]">Análise de <br/>Perfil Facial.</h2>
          <p className="text-[#8B5E3C] text-[10px] uppercase tracking-[0.4em] font-bold">Dra. {EXPERT_INFO.name}</p>
        </div>
        <p className="text-[#4A3728]/40 text-xs italic max-w-xs">"O segredo de uma boa harmonização é a sutileza dos detalhes."</p>
      </div>

      {/* Quiz Side */}
      <div className="flex-1 flex flex-col p-10 sm:p-24 justify-center">
        <div className="max-w-2xl w-full mx-auto space-y-16">
          <div className="flex justify-between items-center">
            <div className="text-[11px] text-[#8B5E3C] font-black uppercase tracking-[0.5em]">Etapa {currentStep + 1} de {steps.length}</div>
            <button onClick={onSkip} className="text-[10px] text-[#4A3728]/30 hover:text-[#4A3728] uppercase tracking-widest font-bold">Pular</button>
          </div>

          <div className="h-[2px] w-full bg-[#4A3728]/5 overflow-hidden">
            <div className="h-full bg-[#4A3728] transition-all duration-1000 ease-in-out" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="space-y-12">
            <h3 className="text-4xl sm:text-6xl font-playfair font-bold text-[#4A3728] leading-[1.1]">
              {steps[currentStep].question}
            </h3>

            <div className="grid gap-4">
              {steps[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full p-8 text-left border border-[#4A3728]/10 rounded-3xl hover:border-[#4A3728] hover:bg-[#F9F7F5] transition-all flex items-center justify-between group"
                >
                  <span className="text-base font-medium text-[#4A3728]/80 group-hover:text-[#4A3728]">{option}</span>
                  <div className="w-8 h-8 rounded-full border border-[#4A3728]/10 flex items-center justify-center text-[10px] text-[#4A3728]/30 group-hover:bg-[#4A3728] group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOverlay;
