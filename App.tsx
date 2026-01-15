
import React, { useState, useEffect, useCallback } from 'react';
import { AppView } from './types';
import { MEDIA, EXPERT_INFO, QUIZ_STEPS } from './constants';
import MainSite from './components/MainSite';
import QuizOverlay from './components/QuizOverlay';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('intro');
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startQuiz = () => setView('quiz');
  const skipToSite = () => setView('main');

  const handleQuizComplete = (answers: string[]) => {
    setQuizAnswers(answers);
    setView('analyzing');
    
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setView('result'), 500);
      }
    }, 100);
  };

  const handleGoToMain = () => setView('main');

  return (
    <div className="min-h-screen bg-white text-[#2D1E17]">
      {/* Background site effect */}
      <div className={`${view === 'quiz' || view === 'analyzing' || view === 'intro' ? 'opacity-40 blur-md pointer-events-none' : 'opacity-100'} transition-all duration-1000`}>
        <MainSite />
      </div>

      {/* Intro Modal - Compact Version */}
      {view === 'intro' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2D1E17]/15 backdrop-blur-md">
          <div className="max-w-sm w-full bg-white p-8 rounded-[2rem] text-center space-y-6 shadow-2xl border border-[#4A3728]/5 animate-in zoom-in duration-500">
            <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-[#4A3728]/10 p-1 shadow-md">
              <img src={MEDIA.mainHero} alt={EXPERT_INFO.name} className="w-full h-full object-cover rounded-full" />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl font-playfair font-bold text-[#4A3728]">Dra. {EXPERT_INFO.name}</h1>
              <p className="text-[9px] text-[#8B5E3C] uppercase tracking-[0.4em] font-bold">Essência & Naturalidade</p>
            </div>

            <p className="text-[#4A3728]/70 text-xs leading-relaxed px-2">
              Análise personalizada para elevar sua beleza com sofisticação.
            </p>
            
            <div className="space-y-3 pt-2">
              <button 
                onClick={startQuiz}
                className="w-full py-4 bg-[#4A3728] text-white font-bold rounded-xl shadow-lg hover:bg-[#2D1E17] transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
              >
                <span>Avaliação Exclusiva</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>

              <a 
                href={EXPERT_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-white text-[#4A3728] border border-[#4A3728]/10 font-bold rounded-xl hover:bg-[#F9F7F5] transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.319 1.592 5.548 0 10.061-4.512 10.063-10.062.001-2.69-1.048-5.219-2.953-7.124s-4.434-2.952-7.125-2.952c-5.549 0-10.06 4.515-10.063 10.065-.001 2.12.586 3.733 1.681 5.62l-.924 3.371 3.402-.892zm10.363-7.601c-.066-.113-.241-.181-.506-.314s-1.577-.777-1.82-.864-.419-.13-.594.135-.68.864-.833 1.041-.306.201-.571.067-.113-.042-.113-.042c-.265-.134-1.114-.411-2.122-1.309-.785-.699-1.314-1.562-1.469-1.827s-.017-.408.116-.541c.12-.12.264-.313.397-.47s.176-.268.265-.446.044-.335-.022-.469-.594-1.432-.813-1.961-.429-.444-.59-.452c-.156-.007-.334-.008-.513-.008s-.469.067-.714.334c-.246.267-.938.917-.938 2.237s.959 2.599 1.092 2.778c.133.179 1.888 2.883 4.574 4.041.64.276 1.139.44 1.526.563.642.204 1.227.175 1.688.107.514-.076 1.577-.643 1.8-1.233s.222-1.094.156-1.201z"/></svg>
                <span>WhatsApp</span>
              </a>

              <button 
                onClick={skipToSite}
                className="w-full pt-1 text-[#4A3728]/40 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#4A3728] transition-all"
              >
                Pular Introdução
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Overlay */}
      {view === 'quiz' && (
        <QuizOverlay 
          steps={QUIZ_STEPS} 
          onComplete={handleQuizComplete} 
          onSkip={skipToSite}
        />
      )}

      {/* Analyzing Screen */}
      {view === 'analyzing' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-white/95">
          <div className="text-center w-full max-w-sm space-y-8">
            <div className="relative inline-block">
               <div className="w-28 h-28 border-[1px] border-[#4A3728]/10 border-t-[#4A3728] rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center font-playfair font-bold text-[#4A3728] text-xl">
                {progress}%
               </div>
            </div>
            <div>
              <h2 className="text-3xl font-playfair font-bold text-[#4A3728] mb-2">Analisando Perfil</h2>
              <p className="text-[#8B5E3C] text-xs uppercase tracking-widest">Aguarde um momento...</p>
            </div>
          </div>
        </div>
      )}

      {/* Result Page */}
      {view === 'result' && (
        <ResultView 
          onContinue={handleGoToMain} 
          answers={quizAnswers}
        />
      )}
    </div>
  );
};

export default App;
