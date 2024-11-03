"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Leaf,
  DollarSign,
  AlertTriangle,
  Battery,
  ThermometerSun,
  Link,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Map from "@/components/Map";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Keep existing interfaces and data...

const performanceData = [
  { month: "Jan", efficiency: 80, emissions: 20, safety: 90 },
  { month: "Feb", efficiency: 85, emissions: 18, safety: 92 },
  { month: "Mar", efficiency: 78, emissions: 22, safety: 88 },
  // Add more data as needed
];

const FleetDashboard: React.FC = () => {
  // Define recentAlerts array
  const recentAlerts = [
    { id: 1, type: "Engine Issue", severity: "high", vehicle: "Truck 1", message: "Engine overheating" },
    { id: 2, type: "Low Tire Pressure", severity: "medium", vehicle: "Truck 2", message: "Front left tire pressure low" },
    { id: 3, type: "Battery Low", severity: "low", vehicle: "Truck 3", message: "Battery charge below 20%" },
  ];

  // Define fleetMetrics object
  const fleetMetrics = {
    activeRoutes: 12,
    totalVehicles: 20,
    utilizationRate: 85,
    onTimeDeliveries: 90,
    carbonSaved: 1500,
    ecoScore: 75,
    fuelEfficiency: 12,
    savingsThisMonth: 5000,
    costPerMile: 0.5,
    maintenanceCosts: 300,
    healthScore: 80,
    maintenanceDue: 5,
    batteryHealth: 90,
    tirePressure: 95,
  };


  // Keep existing data and helper functions...
  function getSeverityStyles(severity: string) {
    switch (severity) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-teal-400";
      default:
        return "text-gray-400";
    }
  }

  const router = useRouter();

  const handleNavigation = () => {
    router.push("/"); // Route to the main page
  };

  return (
    <div className="bg-[#1B1F2B] text-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button className="text-4xl font-semibold text-gray-100" onClick={handleNavigation}>FleetPulse</Button>
        <h1 className="text-4xl font-semibold text-gray-100"> Dashboard</h1>
        <div className="flex space-x-4">
          {/* <Button variant="ghost" className="text-gray-300 hover:text-teal-400">Routes</Button> */}
          {/* <Button variant="ghost" className="text-gray-300 hover:text-teal-400">Vehicles</Button> */}
          <a href="/drivers">
            <Button variant="ghost" className="text-gray-300 hover:text-teal-400">Drivers</Button>
          </a>
          {/* <Button variant="ghost" className="text-gray-300 hover:text-teal-400">Reports</Button> */}
          <div>
          <SignedOut>
              <SignInButton>
                <button className="px-6 py-2 bg-transparent border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500/10 transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {/* <button className="px-6 py-2 bg-transparent border border-teal-500 text-teal-500 rounded-md hover:bg-teal-500/10 transition-colors duration-200">
              Sign In
            </button> */}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-[#1E2433] border-[#2D3343] hover:border-teal-500/50 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Fleet Status</CardTitle>
            <Truck className="h-4 w-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              {fleetMetrics.activeRoutes}/{fleetMetrics.totalVehicles}
            </div>
            <p className="text-xs text-gray-400">Active vehicles</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Utilization</span>
                <span className="font-medium text-teal-400">
                  {fleetMetrics.utilizationRate}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">On-Time Delivery</span>
                <span className="font-medium text-teal-400">
                  {fleetMetrics.onTimeDeliveries}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="bg-[#1E2433] border-[#2D3343] hover:border-teal-500/50 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Environmental Impact
            </CardTitle>
            <Leaf className="h-4 w-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              {fleetMetrics.carbonSaved}kg
            </div>
            <p className="text-xs text-gray-400">Carbon emissions saved</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Eco Score</span>
                <span className="font-medium text-teal-400">{fleetMetrics.ecoScore}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Fuel Efficiency</span>
                <span className="font-medium text-teal-400">
                  {fleetMetrics.fuelEfficiency} km/L
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card className="bg-[#1E2433] border-[#2D3343] hover:border-teal-500/50 transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Financial Overview
            </CardTitle>
            <DollarSign className="h-4 w-4 text-teal-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">
              ${fleetMetrics.savingsThisMonth}
            </div>
            <p className="text-xs text-gray-400">Monthly savings</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Cost per Mile</span>
                <span className="font-medium text-teal-400">${fleetMetrics.costPerMile}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Maintenance Costs</span>
                <span className="font-medium text-teal-400">
                  ${fleetMetrics.maintenanceCosts}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Route Optimization Map */}
        <Card className="bg-[#1E2433] border-[#2D3343]">
          <CardHeader>
            <CardTitle className="text-gray-100">Active Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#1B1F2B] h-[600px] rounded-lg overflow-hidden flex items-center justify-center">
              <Map />
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card className="bg-[#1E2433] border-[#2D3343]">
          <CardHeader>
            <CardTitle className="text-gray-100">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px]">
              <LineChart width={500} height={500} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3343" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E2433',
                    border: '1px solid #2D3343',
                    borderRadius: '6px',
                    color: '#E2E8F0'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#2DD4BF"
                  name="Efficiency"
                />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#14B8A6"
                  name="Emissions"
                />
                <Line
                  type="monotone"
                  dataKey="safety"
                  stroke="#0D9488"
                  name="Safety"
                />
              </LineChart>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Vehicle Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="col-span-2">
          <Card className="bg-[#1E2433] border-[#2D3343]">
            <CardHeader>
              <CardTitle className="text-gray-100">Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-[#2D3343]">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            alert.severity === "high"
                              ? "text-red-400"
                              : alert.severity === "medium"
                              ? "text-yellow-400"
                              : "text-teal-400"
                          }`}
                        />
                        <span className="font-medium text-gray-100">{alert.type}</span>
                      </div>
                      <span className={`${getSeverityStyles(alert.severity)} bg-opacity-20`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium text-gray-300">{alert.vehicle}</span> -{" "}
                      {alert.message}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Health Summary */}
        <Card className="bg-[#1E2433] border-[#2D3343]">
          <CardHeader>
            <CardTitle className="text-gray-100">Vehicle Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Overall Health</span>
                <span className="font-bold text-teal-400">{fleetMetrics.healthScore}%</span>
              </div>
              <div className="w-full bg-[#1B1F2B] rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: `${fleetMetrics.healthScore}%` }}
                ></div>
              </div>
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Maintenance Due</span>
                  <span className="font-medium text-teal-400">
                    {fleetMetrics.maintenanceDue} vehicles
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Battery Health</span>
                  <span className="font-medium text-teal-400">
                    {fleetMetrics.batteryHealth}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Tire Health</span>
                  <span className="font-medium text-teal-400">
                    {fleetMetrics.tirePressure}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FleetDashboard;