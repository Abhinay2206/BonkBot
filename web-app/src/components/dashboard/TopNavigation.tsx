"use client"

import { useEffect, useState } from "react"
import { Bell, Settings, Wallet, LogOut, Home, TrendingUp, Briefcase, Code, ChevronDown, Menu, Sun, Moon, StepBack, Dog } from "lucide-react"
import { useWallet } from "../../contexts/WalletContext"
import { useNavigate } from "react-router-dom"
import NotificationPopup from "../NotificationPopup"

const TopNavigation = () => {
  const navigate = useNavigate()
  const { publicKey, disconnect } = useWallet()
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [bonkBalance, setBonkBalance] = useState("0")
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme')
      return savedMode ? savedMode === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const navItems = [
    { name: "Dashboard", icon: <Home size={20} strokeWidth={1.5} />, path: "/dashboard" },
    { name: "Trade", icon: <TrendingUp size={20} strokeWidth={1.5} />, path: "/trade" },
    { name: "Portfolio", icon: <Briefcase size={20} strokeWidth={1.5} />, path: "/portfolio" },
    { name: "API", icon: <Code size={20} strokeWidth={1.5} />, path: "/api" },
  ]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', isDarkMode)
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    }
  }, [isDarkMode])

  useEffect(() => {
    const fetchBonkBalance = async () => {
      if (!publicKey) return

      try {
        const maxRetries = 3;
        let retryCount = 0;
        let delay = 1000;

        while (retryCount < maxRetries) {
          try {
            const response = await fetch(`http://localhost:4000/api/wallet/balance/${publicKey}`)
            if (response.status === 429) {
              await new Promise(resolve => setTimeout(resolve, delay));
              delay *= 2;
              retryCount++;
              continue;
            }
            if (!response.ok) throw new Error('Network response was not ok')
            const data = await response.json()
            setBonkBalance(data.balance || "0")
            break;
          } catch (error) {
            if (retryCount === maxRetries - 1) throw error;
            delay *= 2;
            retryCount++;
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      } catch (error) {
        console.error("Failed to fetch BONK balance:", error)
        setBonkBalance("0")
      }
    }

    fetchBonkBalance()
  }, [publicKey])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate('/')
  }

  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="relative cursor-pointer" onClick={handleLogoClick}>
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50"></div>
                <Dog className="h-10 w-10 relative z-10 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">BONK</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all"
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all relative"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2">
                  <NotificationPopup colorTheme={isDarkMode ? 'dark' : 'light'} />
                </div>
              )}
            </div>

            {/* Settings */}
            <button 
              onClick={() => navigate('/settings')}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all"
            >
              <Settings size={20} />
            </button>

            {/* Wallet */}
            {publicKey ? (
              <div className="relative">
                <button
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-400/20 dark:to-blue-400/20 text-gray-900 dark:text-white hover:from-purple-500/20 hover:to-blue-500/20 transition-all"
                >
                  <Wallet size={20} className="text-purple-500 dark:text-purple-400" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{`${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`}</span>
                    <span className="text-xs text-purple-600 dark:text-purple-400">{bonkBalance} BONK</span>
                  </div>
                  <ChevronDown size={16} />
                </button>

                {showWalletMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <button
                      onClick={disconnect}
                      className="flex items-center gap-2 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={16} />
                      <span className="font-medium">Disconnect</span>
                    </button>
                    <button
                      onClick={disconnect}
                      className="flex items-center gap-2 w-full px-4 py-3 text-black-600 dark:text-black-400 hover:bg-gray-200 dark:hover:bg-black-900/20 transition-colors"
                    >
                      <StepBack size={16} />
                      <span className="font-medium">change wallet</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/wallet')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/20"
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path)
                  setShowMobileMenu(false)
                }}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default TopNavigation
