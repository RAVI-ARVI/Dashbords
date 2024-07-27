import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./styles.css";

// Define the data type
interface DataType {
  name: string;
  awsbill: number;
  salarys?: number;
  creditcardbill: number;
  billdeskCommission: number;
  ImplementFees?: number;
  BookletCommission?: number;
  TextLocalCommission?: number;
}

// Calculate total expenses and income
const calculateTotals = (data: DataType[]) => {
  return data.map((item) => {
    const totalExpenses =
      (item.awsbill || 0) + (item.salarys || 0) + (item.creditcardbill || 0);
    const totalIncome =
      (item.billdeskCommission || 0) +
      (item.ImplementFees || 0) +
      (item.BookletCommission || 0) +
      (item.TextLocalCommission || 0);

    return {
      ...item,
      totalExpenses,
      totalIncome,
    };
  });
};

// Sample data
const rawData: DataType[] = [
  {
    name: "January",
    awsbill: 4000,
    salarys: 10000,
    creditcardbill: 2400,
    billdeskCommission: 5000,
    ImplementFees: 1500,
    BookletCommission: 2000,
    TextLocalCommission: 1000,
  },
  {
    name: "February",
    awsbill: 3000,
    salarys: 11000,
    creditcardbill: 1398,
    billdeskCommission: 7000,
    ImplementFees: 2000,
    BookletCommission: 2500,
    TextLocalCommission: 1500,
  },
  {
    name: "March",
    awsbill: 2000,
    salarys: 12000,
    creditcardbill: 9800,
    billdeskCommission: 7800,
    ImplementFees: 2200,
    BookletCommission: 2300,
    TextLocalCommission: 1300,
  },
  {
    name: "April",
    awsbill: 2780,
    salarys: 12500,
    creditcardbill: 3908,
    billdeskCommission: 6000,
    ImplementFees: 1800,
    BookletCommission: 2100,
    TextLocalCommission: 1400,
  },
  {
    name: "May",
    awsbill: 1890,
    salarys: 13000,
    creditcardbill: 4800,
    billdeskCommission: 6700,
    ImplementFees: 1900,
    BookletCommission: 2200,
    TextLocalCommission: 1200,
  },
  {
    name: "June",
    awsbill: 2390,
    salarys: 13500,
    creditcardbill: 3800,
    billdeskCommission: 6900,
    ImplementFees: 2100,
    BookletCommission: 2400,
    TextLocalCommission: 1600,
  },
  {
    name: "July",
    awsbill: 3490,
    salarys: 14000,
    creditcardbill: 4300,
    billdeskCommission: 8000,
    ImplementFees: 2500,
    BookletCommission: 2600,
    TextLocalCommission: 1700,
  },
];

const data = calculateTotals(rawData);

// Function to format numbers with commas and rupee symbol
const formatNumber = (num: number) => `₹${num.toLocaleString()}`;

// Customized tooltip component
const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const totalExpenses = payload
      .filter((item: any) => item.stackId === "expenses")
      .reduce((acc: number, item: any) => acc + item.value, 0);

    const totalIncome = payload
      .filter((item: any) => item.stackId === "income")
      .reduce((acc: number, item: any) => acc + item.value, 0);

    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        {payload.map((item: any, index: number) => (
          <p className="intro" key={index} style={{ color: item.color }}>
            {`${item.name}: ${formatNumber(item.value)}`}
          </p>
        ))}
        <p className="intro" style={{ color: "#FF5733" }}>
          Total Expenses: {formatNumber(totalExpenses)}
        </p>
        <p className="intro" style={{ color: "#28B463" }}>
          Total Income: {formatNumber(totalIncome)}
        </p>
      </div>
    );
  }
  return null;
};

const BarChartComponent: React.FC = () => {
  return (
    <div>
      <h2>Office Expenses and Income</h2>
      <BarChart
        width={1000}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="awsbill" stackId="expenses" fill="#FF5733">
          <LabelList dataKey="awsbill" position="top" />
        </Bar>
        <Bar dataKey="salarys" stackId="expenses" fill="#C70039">
          <LabelList dataKey="salarys" position="top" />
        </Bar>
        <Bar dataKey="creditcardbill" stackId="expenses" fill="#900C3F">
          <LabelList dataKey="creditcardbill" position="top" />
        </Bar>
        <Bar dataKey="billdeskCommission" stackId="income" fill="#28B463">
          <LabelList dataKey="billdeskCommission" position="top" />
        </Bar>
        <Bar dataKey="ImplementFees" stackId="income" fill="#1F618D">
          <LabelList dataKey="ImplementFees" position="top" />
        </Bar>
        <Bar dataKey="BookletCommission" stackId="income" fill="#8E44AD">
          <LabelList dataKey="BookletCommission" position="top" />
        </Bar>
        <Bar dataKey="TextLocalCommission" stackId="income" fill="#F39C12">
          <LabelList dataKey="TextLocalCommission" position="top" />
        </Bar>
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
