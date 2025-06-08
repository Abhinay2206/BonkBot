import { useEffect, useState } from 'react';
import axios from 'axios';

interface PriceAlert {
  token: string;
  condition: string;
  price: string;
  status: string;
}

const PriceAlerts = ({ data }: { data: PriceAlert[] }) => {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const getBonkPrice = async () => {
    try {
      const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
        params: {
          symbol: 'BONK',
        },
        headers: {
          'X-CMC_PRO_API_KEY': 'c7e61f32-eb88-46ce-9adb-588d0f1aca45',
          'Accept': 'application/json',
        },
      });
      
      const price = response.data.data.BONK.quote.USD.price;
      setCurrentPrice(price);
    } catch (error) {
      console.error('Error fetching BONK price:', error);
    }
  };

  useEffect(() => {
    getBonkPrice();
    // Fetch price every 5 minutes
    const interval = setInterval(getBonkPrice, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {currentPrice && (
        <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
          <p className="text-purple-800 dark:text-purple-200">
            Current BONK Price: ${currentPrice.toFixed(8)}
          </p>
        </div>
      )}
      {data.map((alert, idx) => (
        <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{alert.token}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {alert.condition} {alert.price}
            </div>
          </div>
          <div>
            <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
              {alert.status}
            </span>
          </div>
        </div>
      ))}
      <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800">
        Create Alert
      </button>
    </div>
  );
}

export default PriceAlerts;