const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const navItems = [
      { name: "Dashboard", active: true },
      { name: "Trade", active: false },
      { name: "Yield", active: false },
      { name: "Alerts", active: false },
      { name: "Portfolio", active: false },
      { name: "Settings", active: false },
      { name: "API / Dev", active: false },
    ];
    
    return (
      <div className={`bg-gray-800 text-white w-64 flex-shrink-0 transition-all duration-300 
                      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                      fixed lg:relative z-40 h-full`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-purple-400 mb-8">BONK Finance</h1>
          <nav>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`flex items-center px-4 py-3 rounded-lg ${
                      item.active ? 'bg-purple-700 text-white' : 'hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
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