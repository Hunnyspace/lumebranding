import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ChevronRight, RefreshCw, Star, Shield, Zap, Heart } from 'lucide-react';

interface GameStep {
  id: number;
  text: string;
  note?: string;
  options: {
    text: string;
    points: number;
    nextId: number;
    icon: React.ReactNode;
    feedback?: string;
  }[];
}

const gameSteps: GameStep[] = [
  {
    id: 1,
    text: "You've identified a massive gap in the premium branding market. Your first potential client offers a huge contract, but they want you to compromise your 'LUME' aesthetic for their outdated vision. What's your move?",
    note: "Entrepreneurship is often about the tension between cash flow and brand integrity.",
    options: [
      { text: "Take the contract; cash is king for a startup", points: 10, nextId: 2, icon: <Zap className="text-yellow-500" />, feedback: "You secured the funds, but your portfolio now has a 'weak' link." },
      { text: "Reject it; brand integrity is non-negotiable", points: 40, nextId: 2, icon: <Shield className="text-blue-500" />, feedback: "You're broke, but your reputation for 'uncompromising quality' starts here." }
    ]
  },
  {
    id: 2,
    text: "Your team is exhausted. You have a deadline for a high-profile project. You can either push them to the limit for a 'perfect' result or deliver 'good enough' to save their morale. Which do you choose?",
    note: "Managing human capital is the hardest part of scaling.",
    options: [
      { text: "Push for perfection; excellence is our only filter", points: 30, nextId: 3, icon: <Trophy className="text-platinum" />, feedback: "The result is stunning, but two key designers are looking for new jobs." },
      { text: "Deliver 'good enough'; the team's health comes first", points: 20, nextId: 3, icon: <Heart className="text-red-500" />, feedback: "The client is satisfied, not thrilled. The team is loyal, but the bar has dropped." }
    ]
  },
  {
    id: 3,
    text: "A competitor just launched a similar service at half your price. They're stealing your mid-tier clients. How do you pivot?",
    note: "Price wars are a race to the bottom. Value is the only escape.",
    options: [
      { text: "Lower your prices to compete directly", points: -20, nextId: 4, icon: <RefreshCw className="text-gray-500" />, feedback: "You've commoditized yourself. You're now fighting for scraps." },
      { text: "Double down on 'Premium'; raise your prices further", points: 50, nextId: 4, icon: <Star className="text-purple-500" />, feedback: "Bold move. You've signaled that you are in a different league entirely." }
    ]
  },
  {
    id: 4,
    text: "You have $50,000 in excess profit. Do you invest it in a flashy new office to impress clients, or in a proprietary AI tool that automates your workflow?",
    note: "Assets vs. Liabilities. Perception vs. Efficiency.",
    options: [
      { text: "The Office; perception is reality in branding", points: 20, nextId: 5, icon: <Shield className="text-green-500" />, feedback: "Clients love the vibe, but your margins remain the same." },
      { text: "The AI Tool; efficiency is the ultimate leverage", points: 60, nextId: 5, icon: <Zap className="text-orange-500" />, feedback: "Your output tripled. You're now a tech-enabled powerhouse." }
    ]
  },
  {
    id: 5,
    text: "A PR crisis hits. A former employee claims LUME is 'all smoke and mirrors'. The story is gaining traction. How do you handle the narrative?",
    note: "Perception engineering is most critical when the perception is under attack.",
    options: [
      { text: "Ignore it; the work speaks for itself", points: 10, nextId: 6, icon: <Shield className="text-gray-500" />, feedback: "The silence is interpreted as guilt. The 'smoke' is getting thicker." },
      { text: "Own the narrative; turn the 'mirrors' into a masterclass", points: 40, nextId: 6, icon: <Zap className="text-yellow-500" />, feedback: "You explained that 'mirrors' are how you reflect a client's true potential. Genius." }
    ]
  },
  {
    id: 6,
    text: "You've reached the top. Anuroop, you are now a 'Committed CEO'. What is your final act of leadership?",
    note: "The ultimate goal of entrepreneurship is to build something that outlasts you.",
    options: [
      { text: "Sell the company and retire to an island", points: 30, nextId: 7, icon: <Star className="text-blue-500" />, feedback: "You're rich, but the legacy ends with the wire transfer." },
      { text: "Mentor the next generation; build a self-sustaining culture", points: 100, nextId: 7, icon: <Trophy className="text-platinum" />, feedback: "LUME is now an institution. You are immortal." }
    ]
  },
  {
    id: 7,
    text: "GAME COMPLETE. Your mindset has been mapped.",
    options: []
  }
];

export default function GamePage({ onBack }: { onBack: () => void }) {
  const [currentStepId, setCurrentStepId] = useState(1);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentStep = gameSteps.find(s => s.id === currentStepId) || gameSteps[0];
  const progress = (currentStepId / (gameSteps.length - 1)) * 100;

  const handleOptionClick = (points: number, nextId: number, optionFeedback?: string) => {
    setScore(prev => prev + points);
    setFeedback(optionFeedback || null);
    
    setTimeout(() => {
      if (nextId === 7) {
        setIsFinished(true);
      }
      setCurrentStepId(nextId);
      setFeedback(null);
    }, 2000);
  };

  const resetGame = () => {
    setCurrentStepId(1);
    setScore(0);
    setIsFinished(false);
    setFeedback(null);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Header - Always Visible */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onBack}
            className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ChevronRight className="rotate-180" size={16} /> Exit Game
          </button>
          
          <div className="flex items-center gap-3 glass px-4 py-2 rounded-full border border-white/10">
            <Trophy size={16} className="text-yellow-500" />
            <span className="text-white font-bold tracking-wider">{score} MP</span>
          </div>
        </div>

        {/* Progress Bar */}
        {!isFinished && (
          <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-white/40"
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentStepId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              {feedback ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="text-white/40 text-xs uppercase tracking-widest">Outcome</div>
                  <p className="text-2xl font-heading font-bold text-white italic">"{feedback}"</p>
                </motion.div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/30">Chapter {currentStepId}</span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">
                      {currentStep.text}
                    </h2>
                    {currentStep.note && (
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 italic text-sm text-white/40">
                        <span className="font-bold text-white/60 not-italic mr-2">Note:</span>
                        {currentStep.note}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4">
                    {currentStep.options.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionClick(option.points, option.nextId, option.feedback)}
                        className="glass p-6 rounded-2xl border border-white/10 text-left flex items-center justify-between group hover:border-white/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            {option.icon}
                          </div>
                          <span className="text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                            {option.text}
                          </span>
                        </div>
                        <ChevronRight className="text-white/20 group-hover:text-white transition-colors" size={20} />
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 relative">
                <Trophy size={64} className="text-yellow-500" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl"
                ></motion.div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-heading font-bold platinum-text-shift">
                  Mindset Mapped
                </h2>
                <p className="text-white/60 text-xl max-w-md mx-auto">
                  You've earned <span className="text-white font-bold">{score} Motivation Points</span>. Your choices reveal a <span className="text-white font-bold">{score > 250 ? 'Visionary' : score > 150 ? 'Strategic' : 'Pragmatic'}</span> entrepreneurial DNA.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button 
                  onClick={resetGame}
                  className="px-8 py-4 glass rounded-2xl font-bold text-white flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                >
                  <RefreshCw size={20} /> Recalibrate
                </button>
                <button 
                  onClick={onBack}
                  className="px-8 py-4 platinum-btn rounded-2xl font-bold text-black flex items-center justify-center gap-2"
                >
                  Return to LUME
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
