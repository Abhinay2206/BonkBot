import React from 'react';
import { ChevronsRight } from 'lucide-react';
import { bonkBotData } from '../../data/bonkData';

const EcosystemSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {bonkBotData.ecosystem.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {bonkBotData.ecosystem.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-purple-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-purple-600 dark:text-purple-400">
                Key Integration Points
              </h3>
              <ul className="space-y-4">
                {bonkBotData.ecosystem.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <ChevronsRight className="w-5 h-5 text-green-500 dark:text-green-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="p-1 bg-gradient-to-br from-purple-500 to-green-400 rounded-2xl shadow-lg">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-8">
                <div className="relative h-[300px] overflow-hidden rounded-lg mb-6">
                  {/* Blockchain graphic representation - simplified visualization */}
                  <div className="absolute inset-0 flex flex-wrap gap-2 p-4 animate-[float_10s_ease-in-out_infinite]">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`
                          w-16 h-16 rounded flex items-center justify-center text-xs font-mono
                          ${i % 3 === 0 ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300' : 
                            i % 3 === 1 ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300' : 
                            'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300'}
                        `}
                        style={{
                          transform: `translateY(${Math.sin(i * 0.5) * 20}px)`,
                          animation: `pulse ${2 + (i % 3)}s ease-in-out infinite ${i * 0.1}s`
                        }}
                      >
                        {i % 5 === 0 ? 'BONK' : i % 7 === 0 ? 'SOL' : `#${(1000 + i).toString(16)}`}
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">BONK Token Ecosystem</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The BONK token ecosystem leverages Solana's high-performance blockchain to provide fast, 
                  low-cost transactions for users, with BONK Bot acting as an automated intermediary for 
                  optimal trading and utility functions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;