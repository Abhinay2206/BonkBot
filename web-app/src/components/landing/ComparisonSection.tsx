import React, { useState } from 'react';
import { ArrowUpDown, Info } from 'lucide-react';
import { bonkBotData } from '../../data/bonkData';

type SortField = 'name' | 'specialization' | 'rating';
type SortDirection = 'asc' | 'desc';

const ComparisonSection: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [tooltipVisible, setTooltipVisible] = useState<number | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedBots = [...bonkBotData.comparison.bots].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === 'specialization') {
      return sortDirection === 'asc' 
        ? a.specialization.localeCompare(b.specialization) 
        : b.specialization.localeCompare(a.specialization);
    } else {
      // rating
      return sortDirection === 'asc' 
        ? a.rating - b.rating 
        : b.rating - a.rating;
    }
  });

  return (
    <section id="comparison" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {bonkBotData.comparison.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            See how BONK Bot compares to other trading bots in the Solana ecosystem.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-100 dark:bg-purple-900/30">
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-2">
                    <span>Bot Name</span>
                    {sortField === 'name' && (
                      <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('specialization')}>
                  <div className="flex items-center gap-2">
                    <span>Specialization</span>
                    {sortField === 'specialization' && (
                      <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left">Trading Pairs</th>
                <th className="px-4 py-3 text-left">Fees</th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <span>Special Features</span>
                    <div className="relative">
                      <Info 
                        className="w-4 h-4 text-purple-600 dark:text-purple-400 cursor-help"
                        onMouseEnter={() => setTooltipVisible(1)}
                        onMouseLeave={() => setTooltipVisible(null)}
                      />
                      {tooltipVisible === 1 && (
                        <div className="absolute z-10 w-48 p-2 mt-1 text-sm text-white bg-gray-800 rounded shadow-lg -left-24">
                          Unique capabilities offered by each bot
                        </div>
                      )}
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">Interface</th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('rating')}>
                  <div className="flex items-center gap-2">
                    <span>Rating</span>
                    {sortField === 'rating' && (
                      <ArrowUpDown className={`w-4 h-4 ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBots.map((bot, index) => (
                <tr 
                  key={index} 
                  className={`
                    ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}
                    ${bot.name === 'BONK Bot' ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
                  `}
                >
                  <td className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 font-medium">
                    {bot.name === 'BONK Bot' ? (
                      <span className="text-purple-600 dark:text-purple-400">{bot.name}</span>
                    ) : (
                      bot.name
                    )}
                  </td>
                  <td className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    {bot.specialization}
                  </td>
                  <td className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    {bot.tradingPairs}
                  </td>
                  <td className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    {bot.fees}
                  </td>
                  <td className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    {bot.specialFeatures}
                  </td>
                  <td className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    {bot.userInterface}
                  </td>
                  <td className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            bot.name === 'BONK Bot' 
                              ? 'bg-purple-600 dark:bg-purple-500' 
                              : 'bg-green-500 dark:bg-green-400'
                          }`}
                          style={{ width: `${(bot.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2">{bot.rating}/5</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;