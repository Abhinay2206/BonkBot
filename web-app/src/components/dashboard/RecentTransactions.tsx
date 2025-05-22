import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';

interface Transaction {
  type: string;
  token: string;
  time: string;
  amount: string;
  value: string;
}

const RecentTransactions = ({ data }: { data: Transaction[] }) => {
  return (
    <div className="space-y-3">
      {data.map((tx, idx) => (
        <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
          <div className="flex items-center">
            <div className={`p-1 rounded-full mr-3 ${
              tx.type === 'Buy' ? 'bg-green-100 dark:bg-green-900' : 
              tx.type === 'Sell' ? 'bg-red-100 dark:bg-red-900' : 'bg-blue-100 dark:bg-blue-900'
            }`}>
              {tx.type === 'Buy' && <ArrowDown size={16} className="text-green-600 dark:text-green-400" />}
              {tx.type === 'Sell' && <ArrowUp size={16} className="text-red-600 dark:text-red-400" />}
              {tx.type === 'Stake' && <DollarSign size={16} className="text-blue-600 dark:text-blue-400" />}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{tx.type} {tx.token}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{tx.time}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-900 dark:text-white">{tx.amount}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{tx.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentTransactions;