interface TokenHolding {
  token: string;
  amount: string;
  value: string;
  change: string;
}

const TokenHoldings = ({ data }: { data: TokenHolding[] }) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between font-medium text-sm text-gray-500">
          <span>Token</span>
          <span>Amount</span>
          <span>Value</span>
          <span>24h</span>
        </div>
        {data.map((token, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="font-medium">{token.token}</span>
            <span>{token.amount}</span>
            <span>{token.value}</span>
            <span className={token.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
              {token.change}
            </span>
          </div>
        ))}
      </div>
    );
  }

  export default TokenHoldings;