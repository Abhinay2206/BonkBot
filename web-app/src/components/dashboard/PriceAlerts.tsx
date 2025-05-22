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