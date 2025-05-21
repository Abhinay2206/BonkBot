interface OpenOrder {
  pair: string;
  type: string;
  price: string;
  amount: string;
  filled: string;
}

const OpenOrders = ({ data }: { data: OpenOrder[] }) => {
    return (
      <div className="space-y-3">
        {data.map((order, idx) => (
          <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <div className="font-medium">{order.pair}</div>
              <div className="text-sm text-gray-500">{order.type} at {order.price}</div>
            </div>
            <div className="text-right">
              <div>{order.amount}</div>
              <div className="text-sm text-gray-500">Filled: {order.filled}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  export default OpenOrders;