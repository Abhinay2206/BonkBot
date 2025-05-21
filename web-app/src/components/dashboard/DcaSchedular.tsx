import { Clock, Calendar } from 'lucide-react';

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
        <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <div>
            <div className="font-medium">{schedule.pair}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" /> {schedule.frequency}
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{schedule.amount}</div>
            <div className="text-sm text-gray-500 flex items-center justify-end">
              <Calendar size={14} className="mr-1" /> {schedule.nextDate}
            </div>
          </div>
        </div>
      ))}
      <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        Add Schedule
      </button>
    </div>
  );
}

export default DcaScheduler;