import { Bell, Settings, Wallet } from 'lucide-react';

interface TopNavigationProps {
  publicKey: string | null;
  walletType: string | null;
}

const TopNavigation = ({ publicKey, walletType }: TopNavigationProps) => {
  const bonkBalance = "123,456.78 BONK";
  const netAPY = "5.23%";
  const dailyChange = "+2.14%";

  const displayAddress = publicKey
    ? publicKey.length > 10
      ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
      : publicKey
    : "Not Connected";

  return (
    <header className="bg-white shadow">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Wallet size={16} className="text-gray-500 mr-2" />
            <span className="text-sm font-medium">
              {displayAddress}
              {walletType ? (
                <span className="ml-2 text-xs text-gray-400">({walletType})</span>
              ) : null}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div>
            <span className="text-sm text-gray-500">BONK Balance:</span>
            <span className="ml-2 font-semibold">{bonkBalance}</span>
          </div>
          
          <div>
            <span className="text-sm text-gray-500">Net APY:</span>
            <span className="ml-2 font-semibold text-green-500">{netAPY}</span>
          </div>
          
          <div>
            <span className="text-sm text-gray-500">24h:</span>
            <span className={`ml-2 font-semibold ${
              dailyChange.startsWith('+') ? 'text-green-500' : 'text-red-500'
            }`}>{dailyChange}</span>
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