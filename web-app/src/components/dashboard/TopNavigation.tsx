import { useEffect, useState } from 'react';
import { Bell, Settings, Wallet } from 'lucide-react';

interface TopNavigationProps {
  publicKey: string | null;
  walletType: string | null;
}

const TopNavigation = ({ publicKey, walletType }: TopNavigationProps) => {
  const [bonkBalance, setBonkBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  const netAPY = "5.23%";
  const dailyChange = "+2.14%";

  const displayAddress = publicKey
    ? publicKey.length > 10
      ? `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`
      : publicKey
    : "Not Connected";

  useEffect(() => {
    if (!publicKey) {
      setBonkBalance(null);
      setBalanceError(null);
      return;
    }
    setLoading(true);
    setBalanceError(null);

    const fetchBalanceWithRetry = async (retries = 4, delay = 500) => {
      try {
        const res = await fetch(`http://localhost:4000/api/wallet/balance/${publicKey}`);
        if (res.status === 429) {
          if (retries > 0) {
            setTimeout(() => {
              fetchBalanceWithRetry(retries - 1, delay * 2);
            }, delay);
            return;
          } else {
            throw new Error('Too Many Requests: Please try again later.');
          }
        }
        if (!res.ok) {
          throw new Error('Failed to fetch balance');
        }
        const data = await res.json();
        let bonkAmount: number | undefined = undefined;
        if (
          data &&
          typeof data === 'object' &&
          data.tokens &&
          data.tokens.bonk &&
          typeof data.tokens.bonk.amount === 'number'
        ) {
          bonkAmount = data.tokens.bonk.amount;
        } else if (typeof data.bonkBalance === 'number') {
          bonkAmount = data.bonkBalance;
        }
        if (typeof bonkAmount === 'number') {
          setBonkBalance(
            bonkAmount.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' BONK'
          );
        } else {
          setBonkBalance('--');
        }
      } catch (err: unknown) {
        if (
          typeof err === 'object' &&
          err !== null &&
          'message' in err &&
          typeof (err as { message?: unknown }).message === 'string' &&
          (err as { message: string }).message.includes('Too Many Requests')
        ) {
          setBalanceError('Rate limited. Please try again later.');
        } else {
          setBalanceError('Error fetching balance');
        }
        setBonkBalance(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceWithRetry();
  }, [publicKey]);

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
            <span className="ml-2 font-semibold">
              {loading && publicKey ? 'Loading...' : 
                balanceError ? (
                  <span className="text-red-500">{balanceError}</span>
                ) : bonkBalance !== null ? bonkBalance : '--'}
            </span>
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