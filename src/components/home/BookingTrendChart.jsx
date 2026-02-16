import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const BookingTrendChart = ({ data, metric = "bookings" }) => {
  if (!data?.length) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
        No data yet
      </div>
    );
  }

  const formatValue = (val) =>
    metric === "revenue" ? `₹${val}` : val;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            allowDecimals={false}
            tickFormatter={formatValue}
          />
          <Tooltip
            formatter={(val) => formatValue(val)}
          />
          <Line
            type="monotone"
            dataKey="value"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingTrendChart;
