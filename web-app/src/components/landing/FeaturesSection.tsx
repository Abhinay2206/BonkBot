import type React from "react"
import FeatureCard from "./FeatureCard"
import { bonkBotData } from "../../data/bonkData"

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50/50 dark:bg-gray-800/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-400/30 dark:bg-violet-600/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-400/30 dark:bg-emerald-600/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-emerald-400 rounded-full blur-sm"></div>
              <span className="relative z-10 px-4 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-gray-700">
                Powerful Features
              </span>
            </div>
          </div>

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
  )
}

export default FeaturesSection
