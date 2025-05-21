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
        <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            <div className={`p-1 rounded-full mr-3 ${
              tx.type === 'Buy' ? 'bg-green-100' : 
              tx.type === 'Sell' ? 'bg-red-100' : 'bg-blue-100'
            }`}>
              {tx.type === 'Buy' && <ArrowDown size={16} className="text-green-600" />}
              {tx.type === 'Sell' && <ArrowUp size={16} className="text-red-600" />}
              {tx.type === 'Stake' && <DollarSign size={16} className="text-blue-600" />}
            </div>
            <div>
              <div className="font-medium">{tx.type} {tx.token}</div>
              <div className="text-xs text-gray-500">{tx.time}</div>
            </div>
          </div>
          <div className="text-right">
            <div>{tx.amount}</div>
            <div className="text-sm text-gray-500">{tx.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentTransactions;