import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { bonkBotData } from '../../data/bonkData';

const InteractionSection: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<number>(0);

  const toggleMethod = (index: number) => {
    setActiveMethod(index === activeMethod ? -1 : index);
  };

  return (
    <section id="how-to-use" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {bonkBotData.interaction.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Choose from multiple ways to interact with BONK Bot based on your preferences and needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {bonkBotData.interaction.methods.map((method, index) => (
            <div 
              key={index} 
              className={`mb-4 rounded-xl overflow-hidden border ${
                activeMethod === index 
                  ? 'border-purple-200 dark:border-purple-800 shadow-lg' 
                  : 'border-gray-200 dark:border-gray-700'
              } transition-all duration-300`}
            >
              <button 
                className={`w-full px-6 py-4 flex justify-between items-center text-left ${
                  activeMethod === index 
                    ? 'bg-purple-50 dark:bg-gray-800' 
                    : 'bg-white dark:bg-gray-900'
                }`}
                onClick={() => toggleMethod(index)}
                aria-expanded={activeMethod === index}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{method.title}</h3>
                {activeMethod === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              {activeMethod === index && (
                <div className="px-6 py-5 bg-white dark:bg-gray-900 animate-fadeIn">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{method.description}</p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Steps to Get Started:</h4>
                    <ul className="space-y-3">
                      {method.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractionSection;