import React from 'react';
import { bonkBotData } from '../../data/bonkData';
import { AlertTriangle, AlertCircle, AlertOctagon } from 'lucide-react';

const RisksSection: React.FC = () => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High':
        return <AlertOctagon className="w-6 h-6 text-red-500" />;
      case 'Medium':
        return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      case 'Low':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'Medium':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'Low':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <section id="risks" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {bonkBotData.risks.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {bonkBotData.risks.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {bonkBotData.risks.items.map((risk, index) => (
            <div 
              key={index}
              className={`rounded-xl border p-6 transition-all duration-300 ${getSeverityColor(risk.severity)}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getSeverityIcon(risk.severity)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {risk.title}
                    </h3>
                    <span className={`
                      text-xs font-medium px-2 py-0.5 rounded-full
                      ${risk.severity === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 
                        risk.severity === 'Medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' : 
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}
                    `}>
                      {risk.severity} Risk
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {risk.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
            Risk Mitigation Recommendations
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="inline-block w-6 h-6 rounded-full bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold text-sm">1</span>
              <p className="text-gray-700 dark:text-gray-300">
                Start with small positions when first using BONK Bot to understand its behavior.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-6 h-6 rounded-full bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold text-sm">2</span>
              <p className="text-gray-700 dark:text-gray-300">
                Set conservative stop-loss parameters to protect against extreme market volatility.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-6 h-6 rounded-full bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold text-sm">3</span>
              <p className="text-gray-700 dark:text-gray-300">
                Regularly review and update your trading strategies as market conditions change.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-6 h-6 rounded-full bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 flex items-center justify-center font-semibold text-sm">4</span>
              <p className="text-gray-700 dark:text-gray-300">
                Never invest more than you can afford to lose, especially in meme coins like BONK.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RisksSection;