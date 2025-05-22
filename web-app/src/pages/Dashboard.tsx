import TopNavigation from '../components/dashboard/TopNavigation';
import LiveChart from '../components/dashboard/LiveChart';
import TokenHoldings from '../components/dashboard/TokenHoldings';
import DcaScheduler from '../components/dashboard/DcaSchedular';
import PriceAlerts from '../components/dashboard/PriceAlerts';
import OpenOrders from '../components/dashboard/OpenOrders';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { mockData } from '../data/mockData';
import Card from '../components/common/Card';
import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    // Check localStorage for theme preference
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navigation */}
        <TopNavigation />
        
        {/* Main content area */}
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Monitor your BONK portfolio and trading activities
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Charts */}
            <div className="xl:col-span-3 space-y-6">
              {/* Live Chart */}
              <Card title="BONK Live Chart">
                <LiveChart />
              </Card>
              
              {/* Recent Transactions and Open Orders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card title="Open Orders">
                  <OpenOrders data={mockData.openOrders} />
                </Card>
                <Card title="Recent Transactions">
                  <RecentTransactions data={mockData.recentTransactions} />
                </Card>
              </div>
            </div>

            {/* Right Column - Trading Tools */}
            <div className="space-y-6">
              <Card title="Token Holdings">
                <TokenHoldings />
              </Card>
              
              <Card title="DCA Scheduler">
                <DcaScheduler data={mockData.dcaSchedules} />
              </Card>
              
              <Card title="Price Alerts">
                <PriceAlerts data={mockData.priceAlerts} />
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
