interface Props {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

export default function CardStat({
  title,
  value,
  icon,
  color = "blue",
}: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-white mt-1">{value}</h2>
      </div>
      <div
        className={`p-3 rounded-lg bg-${color}-600/20 text-${color}-400 text-xl`}
      >
        {icon}
      </div>
    </div>
  );
}
