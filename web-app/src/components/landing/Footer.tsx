"use client"

import type React from "react"
import { ArrowUp, Github, Twitter, ExternalLink, Dog } from "lucide-react"

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-emerald-400"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-violet-600/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-emerald-600/10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold mb-4 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-emerald-400 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <Dog className="relative z-10 text-white w-8 h-8 p-1 bg-gradient-to-br from-violet-600 to-emerald-400 rounded-full" />
              </div>
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-emerald-300 bg-clip-text text-transparent font-extrabold">
                BONK Bot
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              The premier trading and utility bot for the BONK token ecosystem on Solana.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-violet-400 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-violet-400 transition-colors p-2 rounded-full hover:bg-gray-800"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#overview"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Overview</span>
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Features</span>
                </a>
              </li>
              <li>
                <a
                  href="#how-to-use"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>How to Use</span>
                </a>
              </li>
              <li>
                <a
                  href="#comparison"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Comparison</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Documentation</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>API Reference</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>BONK Tokenomics</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Solana Developers</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Help Center</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Discord Community</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Report an Issue</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-violet-400 transition-colors flex items-center gap-1 group"
                >
                  <span className="w-0 h-0.5 bg-violet-400 group-hover:w-2 transition-all duration-300"></span>
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 BONK Bot. All rights reserved. Data shown is for demonstration purposes only.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors group"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
