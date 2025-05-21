interface PortfolioDataPoint {
  value: number;
  date: string;
}

const PortfolioSummary = ({ data }: { data: PortfolioDataPoint[] }) => {
    const max = Math.max(...data.map((d: PortfolioDataPoint) => d.value));
    const min = Math.min(...data.map((d: PortfolioDataPoint) => d.value));
    
    return (
      <div className="h-48 flex items-end space-x-1">
        {data.map((item: PortfolioDataPoint, i: number) => {
          const height = ((item.value - min) / (max - min)) * 100;
          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-purple-500 rounded-t"
                style={{ height: `${height}%` }}
              ></div>
              <div className="text-xs mt-1">{item.date}</div>
            </div>
          );
        })}
      </div>
    );
  }

  export default PortfolioSummary;