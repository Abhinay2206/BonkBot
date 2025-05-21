import React from 'react';
import { bonkBotData } from '../../data/bonkData';
import * as LucideIcons from 'lucide-react';

const StatisticsSection: React.FC = () => {
  return (
    <section id="statistics" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {bonkBotData.statistics.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Current data on BONK Bot usage and adoption as of {bonkBotData.statistics.updated}.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bonkBotData.statistics.stats.map((stat, index) => {
            // Get the icon component from LucideIcons, fallback to BarChart if not found
            const IconComponent =
              typeof LucideIcons[stat.icon as keyof typeof LucideIcons] === 'function'
                ? (LucideIcons[stat.icon as keyof typeof LucideIcons] as React.ElementType)
                : LucideIcons.BarChart;

            // Parse the change value to determine its direction
            const isPositive = stat.change.startsWith('+');

            return (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </h3>
                    <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm ${
                    isPositive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Additional Performance Metrics
          </h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {bonkBotData.statistics.additionalMetrics.map((metric, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-gray-700 dark:text-gray-300">{metric}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-center h-64 relative overflow-hidden">
              {/* Simple chart visualization */}
              <div className="absolute inset-0 flex items-end justify-around px-4 pb-4">
                {[0.3, 0.5, 0.8, 0.6, 0.9, 0.75, 0.85, 0.95, 0.7, 0.8, 0.9, 1].map((height, i) => (
                  <div
                    key={i}
                    className="w-8 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md"
                    style={{
                      height: `${height * 100}%`,
                      animation: `grow 1s ease-out ${i * 0.1}s forwards`,
                      opacity: 0,
                      transform: 'translateY(20px)',
                    }}
                  ></div>
                ))}
              </div>
              <div className="absolute bottom-0 w-full h-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="absolute left-0 h-full w-px bg-gray-200 dark:bg-gray-700"></div>
              <style>{`
                @keyframes grow {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </div>
            <div className="text-center mt-4">
              <h4 className="font-medium text-gray-900 dark:text-white">
                BONK Bot Monthly Trading Volume (Q1 2025)
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing consistent growth in adoption and usage
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;