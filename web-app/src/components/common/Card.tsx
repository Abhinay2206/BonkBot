interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      rounded-xl 
      shadow-sm hover:shadow-lg 
      transition-all duration-200 
      border border-gray-100 dark:border-gray-700
      ${className}
    `}>
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export default Card;