"use client"

import type React from "react"
import { ChevronsRight } from "lucide-react"
import { bonkBotData } from "../../data/bonkData"

const EcosystemSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-emerald-400"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-emerald-400 rounded-full blur-sm"></div>
              <span className="relative z-10 px-4 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-gray-700">
                Ecosystem
              </span>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {bonkBotData.ecosystem.title}
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {bonkBotData.ecosystem.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-violet-600/5 to-emerald-400/5 dark:from-violet-900/20 dark:to-emerald-900/20 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-violet-100/50 dark:border-gray-800">
              <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-violet-600 to-emerald-400 bg-clip-text text-transparent">
                Key Integration Points
              </h3>
              <ul className="space-y-4">
                {bonkBotData.ecosystem.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-violet-600/20 to-emerald-400/20 flex items-center justify-center group-hover:from-violet-600 group-hover:to-emerald-400 transition-all duration-300">
                      <ChevronsRight className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative group">
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-violet-600 to-emerald-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse animation-duration-4000"></div>

              <div className="relative bg-white dark:bg-gray-900 rounded-xl p-8 border border-white/50 dark:border-gray-800/50 shadow-xl backdrop-blur-sm">
                <div className="relative h-[300px] overflow-hidden rounded-lg mb-6 bg-gradient-to-br from-violet-600/10 to-emerald-400/10 dark:from-violet-900/20 dark:to-emerald-900/20">
                  {/* Blockchain graphic representation - modernized visualization */}
                  <div className="absolute inset-0 flex flex-wrap gap-2 p-4">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className={`
                          w-16 h-16 rounded-lg flex items-center justify-center text-xs font-mono backdrop-blur-sm
                          ${
                            i % 3 === 0
                              ? "bg-violet-100/80 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-800/50"
                              : i % 3 === 1
                                ? "bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                                : "bg-amber-100/80 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50"
                          }
                        `}
                        style={{
                          transform: `translateY(${Math.sin(i * 0.5) * 20}px)`,
                          animation: `pulse ${2 + (i % 3)}s ease-in-out infinite ${i * 0.1}s, float ${3 + (i % 5)}s ease-in-out infinite ${i * 0.2}s`,
                        }}
                      >
                        {i % 5 === 0 ? "BONK" : i % 7 === 0 ? "SOL" : `#${(1000 + i).toString(16)}`}
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">BONK Token Ecosystem</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The BONK token ecosystem leverages Solana's high-performance blockchain to provide fast, low-cost
                  transactions for users, with BONK Bot acting as an automated intermediary for optimal trading and
                  utility functions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animation-duration-4000 {
          animation-duration: 4s;
        }
      `}</style>
    </section>
  )
}

export default EcosystemSection
