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
        <CartesianGrid strokeDasharray="3 3" stroke="#2D3343" />
        <XAxis 
          dataKey="day" 
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <YAxis 
          domain={[0, 100]} 
          stroke="#94A3B8"
          tick={{ fill: '#94A3B8' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1E2433',
            border: '1px solid #2D3343',
            borderRadius: '6px',
            color: '#E2E8F0'
          }}
          labelStyle={{ color: '#94A3B8' }}
        />
        <Legend 
          wrapperStyle={{
            color: '#94A3B8'
          }}
        />
        <Line
          type="monotone"
          dataKey="safetyScore"
          stroke="#2DD4BF"
          name="Safety"
          dot={{ fill: '#2DD4BF' }}
        />
        <Line
          type="monotone"
          dataKey="ecoScore"
          stroke="#14B8A6"
          name="Eco Score"
          dot={{ fill: '#14B8A6' }}
        />
        <Line
          type="monotone"
          dataKey="efficiency"
          stroke="#0D9488"
          name="Efficiency"
          dot={{ fill: '#0D9488' }}
        />
      </LineChart>
    </div>
  );
};

export const DriverSkillsChart: React.FC<SkillsChartProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((skill) => (
        <div key={skill.skill} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">{skill.skill}</span>
            <span className="font-medium text-teal-400">{skill.score}%</span>
          </div>
          <div className="w-full bg-[#1B1F2B] rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${skill.score}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};