import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import "./styles.css";

// Define the data type
interface DataType {
  name: string;
  value: number;
}

// Define the props for the customized label
interface RenderCustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

// Define the props for the custom tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
  label?: string;
}

// Data for the Pie chart
const data: DataType[] = [
  { name: "billdeskCommission", value: 1000 },
  { name: "ImplementFees", value: 200 },
  { name: "BookletCommission", value: 200 },
  { name: "TextLocalCommission", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

// Customized label renderer
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: RenderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip renderer
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <p className="label" style={{ margin: 0 }}>{`${name} : ${value}`}</p>
      </div>
    );
  }

  return null;
};

const PieChartComponent: React.FC = () => {
  return (
    <div>
      <h3 style={{ marginTop: "50px" }}>Revenue Breakdown</h3>
      <PieChart width={500} height={600}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          //   outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          wrapperStyle={{
            top: 400,
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
          payload={data.map((entry, index) => ({
            value: entry.name,
            type: "square",
            color: COLORS[index % COLORS.length],
          }))}
        />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
