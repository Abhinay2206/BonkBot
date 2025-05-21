const Card = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => {
    return (
      <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    );
  }

  export default Card;