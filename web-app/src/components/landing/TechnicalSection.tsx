import React from 'react';
import { bonkBotData } from '../../data/bonkData';
import { Code } from 'lucide-react';

const TechnicalSection: React.FC = () => {
  return (
    <section id="technical" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {bonkBotData.technicalDetails.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {bonkBotData.technicalDetails.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            {bonkBotData.technicalDetails.keyPoints.map((point, index) => (
              <div 
                key={index} 
                className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {point.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-green-400 rounded-xl blur opacity-25"></div>
              <div className="relative bg-gray-900 dark:bg-gray-950 text-white p-5 rounded-xl shadow-lg overflow-hidden">
                <div className="flex items-center mb-3">
                  <div className="flex gap-1 mr-auto">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-gray-400">bonk_trading_bot.rs</span>
                  </div>
                </div>
                <pre className="text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
                  <code className="text-green-400 font-mono">{bonkBotData.technicalDetails.codeExample}</code>
                </pre>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Technical Implementation Notes
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold text-sm">1</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    BONK Bot is built on Solana's Sealevel runtime, allowing parallel transaction processing for optimal performance.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold text-sm">2</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    All critical functions implement error handling and transaction retry logic to ensure reliability.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold text-sm">3</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Off-chain components use WebSocket connections to Solana RPC nodes for real-time updates and minimal latency.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold text-sm">4</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Trading strategies incorporate MEV (Maximal Extractable Value) protection to prevent frontrunning of user transactions.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSection;