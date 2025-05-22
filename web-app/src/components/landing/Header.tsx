"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dog, Menu, X, Moon, Sun } from "lucide-react"

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Load dark mode preference on initial render
  useEffect(() => {
    const savedPreference = localStorage.getItem("darkMode")
    if (savedPreference !== null) {
      setDarkMode(savedPreference === "true")
    } else {
      // Use system preference if no user preference is saved
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }
  }, [])

  // Apply dark mode class & save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const navItems = [
    { name: "Overview", href: "#overview" },
    { name: "Features", href: "#features" },
    { name: "How to Use", href: "#how-to-use" },
    { name: "Comparison", href: "#comparison" },
    { name: "Technical", href: "#technical" },
    { name: "Risks", href: "#risks" },
    { name: "Statistics", href: "#statistics" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-2xl font-bold group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-emerald-400 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
            <Dog className="relative z-10 text-white w-8 h-8 p-1 bg-gradient-to-br from-violet-600 to-emerald-400 rounded-full group-hover:animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-emerald-400 bg-clip-text text-transparent font-extrabold">
            BONK Bot
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-violet-600 after:to-emerald-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-violet-600" />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-violet-600" />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg animate-fadeIn">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block py-2 font-medium text-gray-700 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
