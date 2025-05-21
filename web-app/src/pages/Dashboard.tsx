import { useState } from 'react';
import Sidebar from '../components/dashboard/SideBar';
import TopNavigation from '../components/dashboard/TopNavigation';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import TokenHoldings from '../components/dashboard/TokenHoldings';
import DcaScheduler from '../components/dashboard/DcaSchedular';
import PriceAlerts from '../components/dashboard/PriceAlerts';
import OpenOrders from '../components/dashboard/OpenOrders';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { mockData } from '../data/mockData';
import Card from '../components/common/Card';
import { useWallet } from '../contexts/WalletContext';

export default function Dashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { publicKey, walletType } = useWallet();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button 
        className="lg:hidden fixed z-50 bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? "✕" : "☰"}
      </button>
      
      {/* Sidebar */}
      <Sidebar isOpen={isMobileSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <TopNavigation publicKey={publicKey} walletType={walletType} />
        
        {/* Main content scrollable area */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Portfolio Summary Chart */}
            <Card title="BONK Portfolio Summary" className="xl:col-span-2">
              <PortfolioSummary data={mockData.portfolioData} />
            </Card>
            
            {/* Token Holdings */}
            <Card title="Token Holdings">
              <TokenHoldings data={mockData.tokenHoldings} />
            </Card>
            
            {/* DCA Scheduler */}
            <Card title="DCA Scheduler">
              <DcaScheduler data={mockData.dcaSchedules} />
            </Card>
            
            {/* Price Alerts */}
            <Card title="Price Alerts">
              <PriceAlerts data={mockData.priceAlerts} />
            </Card>
            
            {/* Open Orders */}
            <Card title="Open Orders">
              <OpenOrders data={mockData.openOrders} />
            </Card>
            
            {/* Recent Transactions */}
            <Card title="Recent Transactions">
              <RecentTransactions data={mockData.recentTransactions} />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
