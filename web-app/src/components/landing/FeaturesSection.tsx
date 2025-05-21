import React from 'react';
import FeatureCard from './FeatureCard';
import { bonkBotData } from '../../data/bonkData';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Key Features and Use Cases
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            BONK Bot provides a comprehensive suite of tools designed to enhance your BONK token experience on Solana.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bonkBotData.features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;