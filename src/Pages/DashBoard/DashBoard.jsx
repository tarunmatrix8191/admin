import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import HeaderSection from "./components/HeaderSection";
import UserDetails from "../UserDetails/UserDetails";

const data = [
  { name: "Red", value: 300 },
  { name: "Blue", value: 50 },
  { name: "Yellow", value: 100 },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const DashBoard = () => {
  return (
    <div className="">
      <Sidebar />
      <Navbar title="Dashboard" />
      <div className="ml-10 mt-5">
        <div className="grid grid-cols-3 gap-8">
          <div className="grid col-span-1">
            <HeaderSection />
          </div>
          <div className="grid col-span-2">
            <PieChart width={400} height={200}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={(entry) => entry.name}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
        <UserDetails />
      </div>
    </div>
  );
};

export default DashBoard;
