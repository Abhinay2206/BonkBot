import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, TrendingUp, Briefcase, Settings, Code, LogOut, HelpCircle, FileText, Lock } from "lucide-react";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const navItems = [
    { name: "Dashboard", icon: <Home size={20} strokeWidth={1.5} />, active: true },
    { name: "Trade", icon: <TrendingUp size={20} strokeWidth={1.5} />, active: false },
    { name: "Portfolio", icon: <Briefcase size={20} strokeWidth={1.5} />, active: false },
    { name: "Settings", icon: <Settings size={20} strokeWidth={1.5} />, active: false },
    { name: "API / Dev", icon: <Code size={20} strokeWidth={1.5} />, active: false },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      className={`backdrop-blur-md bg-gray-900/90 text-white w-72 flex-shrink-0 transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        fixed lg:relative z-40 h-full shadow-2xl border-r border-gray-800/50`}
    >
      <div className="p-6 flex flex-col h-full relative">
        {/* Logo and branding */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50"></div>
            <img
              src="/bonk-logo.png"
              alt="BONK"
              className="w-12 h-12 rounded-full border border-gray-700/50 shadow-lg relative z-10"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              BONK
            </h1>
            <p className="text-xs font-medium text-gray-400 tracking-wider">FINANCE DASHBOARD</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium backdrop-blur-sm group
                    ${item.active
                      ? "bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white shadow-lg shadow-blue-900/20"
                      : "hover:bg-gray-800/50 text-gray-300 hover:text-white"
                    }`}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className={`transition-transform duration-200 ${hoveredItem === index ? 'scale-110' : ''}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {item.active && (
                    <div className="ml-auto w-1.5 h-4 bg-gradient-to-b from-blue-300 to-indigo-400 rounded-full"></div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User profile section */}
        <div 
          onClick={() => navigate('/profile')}
          className="mt-6 mb-6 bg-gradient-to-r from-gray-800/50 to-gray-700/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-lg ring-2 ring-blue-400/20">
              BF
            </div>
            <div>
              <p className="text-sm font-medium text-white">BONK Trader</p>
              <p className="text-xs bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold">Premium Account</p>
            </div>
          </div>
        </div>
        
        {/* Logout button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600/80 to-red-700/80 text-white font-medium hover:from-red-500 hover:to-red-600 transition-all duration-200 shadow-lg shadow-red-900/20 hover:scale-[1.02]"
          >
            <LogOut size={18} strokeWidth={1.5} />
            <span>Logout</span>
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-auto pt-6 text-xs text-gray-400">
          <div className="flex justify-center items-center space-x-4 mb-2">
            <span className="hover:text-white cursor-pointer transition-colors duration-200 flex items-center gap-1">
              <FileText size={12} /> Terms
            </span>
            <span className="hover:text-white cursor-pointer transition-colors duration-200 flex items-center gap-1">
              <Lock size={12} /> Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors duration-200 flex items-center gap-1">
              <HelpCircle size={12} /> Help
            </span>
          </div>
          <p className="text-center opacity-60">&copy; {new Date().getFullYear()} BONK Finance</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;