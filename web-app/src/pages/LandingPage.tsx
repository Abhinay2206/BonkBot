"use client"

import { ParallaxProvider } from "react-scroll-parallax"
import Header from "../components/landing/Header"
import HeroSection from "../components/landing/HeroSection"
import EcosystemSection from "../components/landing/EcosystemSection"
import FeaturesSection from "../components/landing/FeaturesSection"
import InteractionSection from "../components/landing/InteractionSection"
import TechnicalSection from "../components/landing/TechnicalSection"
import RisksSection from "../components/landing/RisksSection"
import StatisticsSection from "../components/landing/StatisticsSection"
import Footer from "../components/landing/Footer"

const LandingPage = () => {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          
          .animate-pulse {
            animation: pulse 3s infinite;
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
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
        <Header />
        <main className="relative">
          <HeroSection />
          <EcosystemSection />
          <FeaturesSection />
          <InteractionSection />
          <TechnicalSection />
          <RisksSection />
          <StatisticsSection />
        </main>
        <Footer />
      </div>
    </ParallaxProvider>
  )
}

export default LandingPage
