import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { bonkBotData } from '../../data/bonkData';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Abstract background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-400 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-green-300 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute top-2/3 right-1/4 w-72 h-72 rounded-full bg-orange-300 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div 
            className="order-2 md:order-1 animate-fadeIn"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <h1 id="overview" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-green-400 bg-clip-text text-transparent">BONK Bot</span>
              <br />on Solana Blockchain
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {bonkBotData.introduction.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGetStarted}
                className="px-8 py-3 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Get Started
              </button>
              <a 
                href="#how-to-use" 
                className="px-8 py-3 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 font-medium rounded-full border border-purple-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-gray-600 transition-all shadow-lg hover:shadow-lg flex items-center justify-center"
              >
                Learn How to Use
              </a>
            </div>
          </div>
          <div 
            className="order-1 md:order-2"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          >
            <div className="relative">
              <div 
                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-green-400/20 rounded-2xl blur-xl transform rotate-3"
                style={{ transform: `translateY(${scrollY * 0.15}px) rotate(3deg)` }}
              ></div>
              <img
                src={bonkBotData.introduction.image}
                alt="BONK Bot Visual Representation"
                className="w-full h-auto rounded-2xl shadow-xl transform transition-transform hover:scale-105 duration-500 relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <ArrowDown className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      </div>
    </section>
  );
};

export default HeroSection;