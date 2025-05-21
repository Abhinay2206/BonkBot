const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const navItems = [
      { name: "Dashboard", icon: "📊", active: true },
      { name: "Trade", icon: "💱", active: false },
      { name: "Yield", icon: "📈", active: false }, 
      { name: "Alerts", icon: "🔔", active: false },
      { name: "Portfolio", icon: "💼", active: false },
      { name: "Settings", icon: "⚙️", active: false },
      { name: "API / Dev", icon: "👨‍💻", active: false },
    ];
    
    return (
      <div className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white w-72 flex-shrink-0 transition-all duration-300 
                      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                      fixed lg:relative z-40 h-full shadow-xl`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <img src="/bonk-logo.png" alt="BONK" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              BONK Finance
            </h1>
          </div>
          <nav>
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      item.active 
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30' 
                        : 'hover:bg-gray-700/50 hover:translate-x-1'
                    }`}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  export default Sidebar;