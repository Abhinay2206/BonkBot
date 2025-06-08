import { useEffect, useState } from 'react';
import { useWallet } from "../../contexts/WalletContext"
import { COIN_DATA } from "../../data/coinData";

interface TokenHolding {
  mintAddress: string;
  amount: number;
  decimals: number;
  symbol?: string;
  name?: string;
}

const getTokenInfo = (mintAddress: string) => {
  return Object.values(COIN_DATA).find(coin => coin.mintAddress === mintAddress);
};

const TokenHoldings = () => {
  const { publicKey } = useWallet();
  const [holdings, setHoldings] = useState<TokenHolding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      if (!publicKey) return;
      
      try {
        const response = await fetch(`http://localhost:4000/api/wallet/holdings/${publicKey}`);
        if (!response.ok) {
          throw new Error('Failed to fetch token holdings');
        }
        const data = await response.json();
        // Ensure data.holdings exists and is an array before setting
        setHoldings(data.success && Array.isArray(data.holdings) ? data.holdings : []);
        setIsLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setIsLoading(false);
      }
    };

    fetchHoldings();
  }, [publicKey]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!holdings || holdings.length === 0) {
    return <div className="text-center text-gray-500">No token holdings found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between font-medium text-sm text-gray-500 dark:text-gray-400">
        <span>Token</span>
        <span>Amount</span>
      </div>
      {holdings.map((token, idx) => {
        const tokenInfo = getTokenInfo(token.mintAddress);
        return (
          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="flex items-center gap-2">
              {tokenInfo?.logoURI && (
                <img 
                  src={tokenInfo.logoURI} 
                  alt={tokenInfo.symbol} 
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span className="font-medium text-gray-900 dark:text-white">
                {tokenInfo?.symbol || token.symbol || tokenInfo?.name || token.name || token.mintAddress}
              </span>
            </div>
            <span className="text-gray-900 dark:text-white">
              {token.amount.toLocaleString(undefined, {
                minimumFractionDigits: token.decimals,
                maximumFractionDigits: token.decimals
              })}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TokenHoldings;