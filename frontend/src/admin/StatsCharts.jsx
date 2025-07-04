import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { fetchStats } from '../utils/api';

const COLORS = ['#00aaff', '#ff9900'];

const StatsCharts = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="text-center py-10 animate-pulse text-gray-600">
        <p>Loading stats...</p>
      </div>
    );
  }

  const barData = [
    { label: 'Today', value: stats.todayTotal },
    { label: 'This Month', value: stats.monthTotal },
    { label: 'This Year', value: stats.yearTotal },
  ];

  const pieData = [
    { name: 'Room', value: stats.roomCount },
    { name: 'Lawn', value: stats.lawnCount },
  ];

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-bold text-center text-teal-600 mb-6">
        Payment & Booking Stats
      </h2>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        {/* Bar Chart */}
        <div className="w-full max-w-md h-64 bg-gray-50 rounded-lg p-4 hover:scale-[1.01] transition-transform duration-300">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#5e72e4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-full max-w-md h-64 bg-gray-50 rounded-lg p-4 hover:scale-[1.01] transition-transform duration-300">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default StatsCharts;
