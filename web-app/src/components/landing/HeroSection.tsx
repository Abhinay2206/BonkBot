"use client"

import type React from "react"
import { ArrowDown } from "lucide-react"
import { bonkBotData } from "../../data/bonkData"
import { useNavigate } from "react-router-dom"

const HeroSection: React.FC = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate("/login")
  }

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-400/20 dark:bg-violet-600/10 blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-emerald-300/20 dark:bg-emerald-500/10 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-72 h-72 rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 md:order-1 animate-fadeIn">
            <h1
              id="overview"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
            >
              <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                BONK Bot
              </span>
              <br />
              on Solana Blockchain
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {bonkBotData.introduction.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-violet-500/25 flex items-center justify-center group"
              >
                <span>Get Started</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <a
                href="#how-to-use"
                className="px-8 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-violet-600 dark:text-violet-400 font-medium rounded-full border border-violet-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-800 transition-all shadow-lg hover:shadow-lg flex items-center justify-center"
              >
                Learn How to Use
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-emerald-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-pulse animation-duration-4000"></div>

              {/* Card with glassmorphism effect */}
              <div className="relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl p-6 border border-white/50 dark:border-gray-800/50 shadow-xl">
                <img
                  src={bonkBotData.introduction.image || "/placeholder.svg"}
                  alt="BONK Bot Visual Representation"
                  className="w-full h-auto rounded-xl shadow-lg transform transition-transform hover:scale-105 duration-500"
                />

                {/* Floating stats cards */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-100 dark:border-gray-700 animate-float">
                  <div className="text-sm font-semibold text-violet-600 dark:text-violet-400">Total Volume</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">$4.2M</div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-100 dark:border-gray-700 animate-float animation-delay-1000">
                  <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Active Users</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">12.5K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-violet-600 dark:text-violet-400" />
      </div>

      {/* Add animation keyframes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-duration-4000 {
          animation-duration: 4s;
        }
      `}</style>
    </section>
  )
}

export default HeroSection
