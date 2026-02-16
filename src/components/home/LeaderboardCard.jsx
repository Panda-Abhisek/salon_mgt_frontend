const LeaderboardCard = ({ title, items }) => {
  if (!items?.length) return null;

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <h3 className="font-semibold">{title}</h3>

      {items.map((item, i) => (
        <div
          key={i}
          className="flex justify-between text-sm"
        >
          <span>
            {i + 1}. {item.name}
          </span>
          <span className="font-medium">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardCard;
