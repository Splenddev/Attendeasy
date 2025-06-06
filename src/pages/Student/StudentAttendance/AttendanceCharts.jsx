import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const AttendanceCharts = ({ summary }) => {
  const [colors, setColors] = useState(['#3576ec', '#ff9800', '#f44336']); //

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setColors([
      rootStyles.getPropertyValue('--main-color').trim(),
      rootStyles.getPropertyValue('--late').trim(),
      rootStyles.getPropertyValue('--absent').trim(),
    ]);
  }, []);

  const data = [
    { name: 'On Time', value: summary.onTime },
    { name: 'Late', value: summary.late },
    { name: 'Absent', value: summary.absent },
  ];

  return (
    <div className="attendance-chart">
      <h4>Attendance Summary</h4>
      <ResponsiveContainer
        width="100%"
        height={250}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="value"
            radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceCharts;
