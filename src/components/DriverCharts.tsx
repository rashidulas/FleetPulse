"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceTrend, DrivingSkill } from "@/types/driver";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface PerformanceChartProps {
  data: PerformanceTrend[];
}

interface SkillsChartProps {
  data: DrivingSkill[];
}

export const DriverPerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
}) => {
  return (
    <div className="h-[300px]">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="safetyScore"
          stroke="#8884d8"
          name="Safety"
        />
        <Line
          type="monotone"
          dataKey="ecoScore"
          stroke="#82ca9d"
          name="Eco Score"
        />
        <Line
          type="monotone"
          dataKey="efficiency"
          stroke="#ffc658"
          name="Efficiency"
        />
      </LineChart>
    </div>
  );
};

// Using a simple bar-like visualization for skills since we can't use RadarChart
export const DriverSkillsChart: React.FC<SkillsChartProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((skill) => (
        <div key={skill.skill} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{skill.skill}</span>
            <span className="font-medium">{skill.score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${skill.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
