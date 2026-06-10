// components/FrequencyBarChart.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  rolls: number[];
}

function FrequencyBarChart({
  rolls,
}: Props) {
  const data = [1, 2, 3, 4, 5, 6].map(
    (value) => ({
      outcome: value,
      frequency: rolls.filter(
        (r) => r === value
      ).length,
    })
  );

  return (
    <ResponsiveContainer
      width="100%"
      height={500}
    >
      <BarChart data={data}>
        <CartesianGrid
  stroke="#E5E7EB"
  strokeDasharray="3 3"
/>

        <XAxis dataKey="outcome" />

        <YAxis />

       <Tooltip
  cursor={{
    fill: "#F3F4F6",
    opacity: 0.6,
  }}
/>

  <Bar
  dataKey="frequency"
  fill="#93C5FD"
  radius={[10, 10, 0, 0]}
/>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default FrequencyBarChart;