import { Clock, Calendar, Plus } from 'lucide-react';

interface DcaSchedule {
  pair: string;
  frequency: string;
  amount: string;
  nextDate: string;
}

const DcaScheduler = ({ data }: { data: DcaSchedule[] }) => {
  return (
    <div className="space-y-4">
      {data.map((schedule, idx) => (
        <div 
          key={idx} 
          className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
        >
          <div className="space-y-1">
            <div className="font-semibold text-gray-900 dark:text-white">{schedule.pair}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Clock size={14} className="mr-2 text-purple-500" /> {schedule.frequency}
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="font-semibold text-gray-900 dark:text-white">{schedule.amount}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-end">
              <Calendar size={14} className="mr-2 text-purple-500" /> {schedule.nextDate}
            </div>
          </div>
        </div>
      ))}
      <button className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 font-medium flex items-center justify-center gap-2 shadow-sm transition-colors">
        <Plus size={18} />
        Add New Schedule
      </button>
    </div>
  );
}

export default DcaScheduler;