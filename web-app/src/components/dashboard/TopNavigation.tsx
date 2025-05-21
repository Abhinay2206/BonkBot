import { Bell, Settings, Wallet } from 'lucide-react';

interface TopNavigationProps {
  data: {
    walletAddress: string;
    bonkBalance: string;
    netAPY: string;
    dailyChange: string;
  }
}

const TopNavigation = ({ data }: TopNavigationProps) => {
  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Wallet size={16} className="text-gray-500 mr-2" />
            <span className="text-sm font-medium">{data.walletAddress}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-sm text-gray-500">BONK Balance:</span>
            <span className="ml-2 font-semibold">{data.bonkBalance}</span>
          </div>
          
          <div>
            <span className="text-sm text-gray-500">Net APY:</span>
            <span className="ml-2 font-semibold text-green-500">{data.netAPY}</span>
          </div>
          
          <div>
            <span className="text-sm text-gray-500">24h:</span>
            <span className={`ml-2 font-semibold ${
              data.dailyChange.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>{data.dailyChange}</span>
          </div>
          
          <div className="flex space-x-4">
            <button className="text-gray-500 hover:text-gray-800">
              <Bell size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-800">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopNavigation;