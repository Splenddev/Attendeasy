import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AttendanceTrendChart = ({ data }) => {
  // Format data as [{ class: 'Class 1', attendance: 35 }, ...]
  const chartData = data.map((value, index) => ({
    class: `Class ${index + 1}`,
    attendance: value,
  }));

  return (
    <div
      className="chart"
      style={{ width: '100%' }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="class"
            tickMargin={6}
          />
          <YAxis
            label={{
              value: 'Students Present',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Line
            type="linear"
            dataKey="attendance"
            stroke="#25aff3"
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceTrendChart;
