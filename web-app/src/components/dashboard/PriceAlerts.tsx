interface PriceAlert {
  token: string;
  condition: string;
  price: string;
  status: string;
}

const PriceAlerts = ({ data }: { data: PriceAlert[] }) => {
    return (
      <div className="space-y-4">
        {data.map((alert, idx) => (
          <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div>
              <div className="font-medium">{alert.token}</div>
              <div className="text-sm text-gray-500">
                {alert.condition} {alert.price}
              </div>
            </div>
            <div>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                {alert.status}
              </span>
            </div>
          </div>
        ))}
        <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Create Alert
        </button>
      </div>
    );
  }

  export default PriceAlerts;