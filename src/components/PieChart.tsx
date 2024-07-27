import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import "./styles.css";

const data = [
  { name: "billdeskCommission", value: 1000 },
  { name: "ImplementFees", value: 200 },
  { name: "BookletCommission", value: 200 },
  { name: "TextLocalCommission", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
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

const CustomTooltip = ({ active, payload }: any) => {
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

export default function PieChartComponent() {
  return (
    <div>
      <h3 style={{ marginTop: "50px" }}>Revenue Breakdown</h3>
      <PieChart width={500} height={600} barSize={1000}>
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="horizontal"
          //   align="center"
          verticalAlign="bottom"
          wrapperStyle={{
            // paddingTop: "20px",
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
}
