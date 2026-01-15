
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

      {/* Intro Modal */}
      {view === 'intro' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#2D1E17]/10 backdrop-blur-xl">
          <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] text-center space-y-8 editorial-shadow border border-[#4A3728]/5 animate-in zoom-in duration-500">
            <div className="relative mx-auto w-36 h-36 rounded-full overflow-hidden border-2 border-[#4A3728]/20 p-1.5 shadow-xl">
              <img src={MEDIA.mainHero} alt={EXPERT_INFO.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-playfair font-bold text-[#4A3728]">Dra. {EXPERT_INFO.name}</h1>
              <p className="text-[10px] text-[#8B5E3C] uppercase tracking-[0.3em] font-semibold">Harmonização Facial Premium</p>
            </div>
            <p className="text-[#4A3728]/70 text-sm leading-relaxed">Prepare-se para descobrir uma nova perspectiva sobre sua própria beleza.</p>
            <div className="space-y-4 pt-4">
              <button 
                onClick={startQuiz}
                className="w-full py-5 bg-[#4A3728] text-white font-bold rounded-2xl shadow-xl hover:bg-[#2D1E17] transition-all uppercase text-xs tracking-widest"
              >
                Avaliação Exclusiva
              </button>
              <button 
                onClick={skipToSite}
                className="w-full py-4 text-[#4A3728]/60 text-xs font-semibold uppercase tracking-widest hover:text-[#4A3728] transition-all"
              >
                Conhecer o site
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
