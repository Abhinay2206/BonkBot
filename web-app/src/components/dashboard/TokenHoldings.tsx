import { useEffect, useState } from 'react';
import { useWallet } from "../../contexts/WalletContext"

interface TokenHolding {
  mintAddress: string;
  amount: number;
}

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
        // Ensure data is an array before setting
        setHoldings(Array.isArray(data) ? data : []);
        setIsLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setIsLoading(false);
      }
    };

    fetchHoldings();
  }, [publicKey]); // Add publicKey as dependency

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
      {Array.isArray(holdings) && holdings.map((token, idx) => (
        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <span className="font-medium text-gray-900 dark:text-white">{token.mintAddress}</span>
          <span className="text-gray-900 dark:text-white">{token.amount}</span>
        </div>
      ))}
    </div>
  );
};

export default TokenHoldings;