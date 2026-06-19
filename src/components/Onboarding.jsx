import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Bus, Footprints, Flame, Lightbulb, Pizza, Carrot, Salad, Leaf } from 'lucide-react';

const questions = [
  {
    id: 'transport',
    title: 'How do you usually commute?',
    options: [
      { label: 'Drive Alone (Gas)', score: 300, icon: Car },
      { label: 'Public Transit', score: 100, icon: Bus },
      { label: 'Walk / Bike', score: 0, icon: Footprints },
    ]
  },
  {
    id: 'energy',
    title: 'What best describes your home energy?',
    options: [
      { label: 'High Usage (AC/Heat)', score: 400, icon: Flame },
      { label: 'Average', score: 200, icon: Lightbulb },
      { label: 'Energy Efficient / Solar', score: 50, icon: Leaf },
    ]
  },
  {
    id: 'diet',
    title: 'What is your primary diet?',
    options: [
      { label: 'Heavy Meat', score: 300, icon: Pizza },
      { label: 'Flexitarian / Less Meat', score: 150, icon: Carrot },
      { label: 'Vegetarian / Vegan', score: 50, icon: Salad },
    ]
  }
];

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const progress = ((currentStep) / questions.length) * 100;

  const handleSelect = (option) => {
    const q = questions[currentStep];
    const newAnswers = { ...answers, [q.id]: option.score };
    
    if (currentStep < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      const totalScore = Object.values(newAnswers).reduce((a, b) => a + b, option.score);
      onComplete({
        initialScore: totalScore,
        currentScore: totalScore,
        answers: newAnswers,
        actions: [],
      });
    }
  };

  const currentQ = questions[currentStep];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel p-8 max-w-2xl mx-auto mt-8 md:mt-20 relative overflow-hidden">
      
      {/* Animated Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/10 dark:bg-white/10">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-primary"
        />
      </div>

      <div className="mb-10 text-center mt-4">
        <h2 className="text-3xl font-extrabold mb-2 text-gradient">Let's calculate your baseline</h2>
        <p className="opacity-70 font-medium">Question {currentStep + 1} of {questions.length}</p>
      </div>

      <div className="min-h-[250px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-center">{currentQ.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentQ.options.map((opt, idx) => {
                const Icon = opt.icon;
                return (
                  <motion.button 
                    key={idx}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelect(opt)}
                    className="flex flex-col items-center justify-center p-6 bg-white/60 dark:bg-white/10 border border-white/80 dark:border-white/20 rounded-3xl shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-inner mb-4 group-hover:text-primary transition-colors">
                      <Icon size={32} />
                    </div>
                    <span className="font-bold text-center">{opt.label}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Onboarding;
