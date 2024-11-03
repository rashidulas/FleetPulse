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

// Types and Interfaces
interface FleetMetrics {
  // Operational Metrics
  totalVehicles: number;
  activeRoutes: number;
  onTimeDeliveries: number;
  utilizationRate: number;

  // Environmental Metrics
  carbonSaved: number;
  fuelEfficiency: number;
  ecoScore: number;
  renewableEnergyUse: number;

  // Financial Metrics
  fuelCosts: number;
  maintenanceCosts: number;
  costPerMile: number;
  savingsThisMonth: number;

  // Safety & Compliance
  safetyScore: number;
  complianceRate: number;
  incidentRate: number;

  // Vehicle Health
  maintenanceDue: number;
  healthScore: number;
  batteryHealth: number;
  tirePressure: number;
}

interface Alert {
  id: number;
  type: string;
  vehicle: string;
  severity: "high" | "medium" | "low";
  message: string;
}

interface PerformanceData {
  month: string;
  efficiency: number;
  emissions: number;
  safety: number;
}

const FleetDashboard: React.FC = () => {
  // Sample fleet metrics
  const fleetMetrics: FleetMetrics = {
    totalVehicles: 48,
    activeRoutes: 35,
    onTimeDeliveries: 94.5,
    utilizationRate: 87,
    carbonSaved: 1240,
    fuelEfficiency: 8.2,
    ecoScore: 92,
    renewableEnergyUse: 35,
    fuelCosts: 12450,
    maintenanceCosts: 8750,
    costPerMile: 1.24,
    savingsThisMonth: 4520,
    safetyScore: 96,
    complianceRate: 99.8,
    incidentRate: 0.5,
    maintenanceDue: 3,
    healthScore: 88,
    batteryHealth: 92,
    tirePressure: 95,
  };

  const recentAlerts: Alert[] = [
    {
      id: 1,
      type: "Maintenance Required",
      vehicle: "FLT-2024-001",
      severity: "high",
      message: "Brake inspection due in 24 hours",
    },
    {
      id: 2,
      type: "Route Optimization",
      vehicle: "FLT-2024-015",
      severity: "medium",
      message: "Alternative route available - 15% fuel saving",
    },
    {
      id: 3,
      type: "Driver Behavior",
      vehicle: "FLT-2024-008",
      severity: "low",
      message: "Excessive idling detected",
    },
  ];

  const performanceData: PerformanceData[] = [
    { month: "Jan", efficiency: 85, emissions: 75, safety: 88 },
    { month: "Feb", efficiency: 88, emissions: 72, safety: 90 },
    { month: "Mar", efficiency: 92, emissions: 68, safety: 92 },
    { month: "Apr", efficiency: 90, emissions: 70, safety: 89 },
    { month: "May", efficiency: 94, emissions: 65, safety: 93 },
    { month: "Jun", efficiency: 91, emissions: 67, safety: 91 },
  ];

  // Helper function for alert severity styling
  const getSeverityStyles = (severity: Alert["severity"]): string => {
    const baseStyles = "px-2 py-1 rounded-full text-xs ";
    switch (severity) {
      case "high":
        return baseStyles + "bg-red-100 text-red-800";
      case "medium":
        return baseStyles + "bg-yellow-100 text-yellow-800";
      default:
        return baseStyles + "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="bg-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">FleetPlus Dashboard</h1>
        {/* < Map/> */}
        <div className="flex space-x-4">
          <Button variant="ghost">Routes</Button>
          <Button variant="ghost">Vehicles</Button>
          <a href="/drivers">
            <Button variant="ghost">Drivers</Button>
          </a>
          <Button variant="ghost">Reports</Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Operational Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Status</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fleetMetrics.activeRoutes}/{fleetMetrics.totalVehicles}
            </div>
            <p className="text-xs text-muted-foreground">Active vehicles</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Utilization</span>
                <span className="font-medium">
                  {fleetMetrics.utilizationRate}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>On-Time Delivery</span>
                <span className="font-medium">
                  {fleetMetrics.onTimeDeliveries}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Environmental Impact
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fleetMetrics.carbonSaved}kg
            </div>
            <p className="text-xs text-muted-foreground">
              Carbon emissions saved
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Eco Score</span>
                <span className="font-medium">{fleetMetrics.ecoScore}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Fuel Efficiency</span>
                <span className="font-medium">
                  {fleetMetrics.fuelEfficiency} km/L
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Financial Overview
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${fleetMetrics.savingsThisMonth}
            </div>
            <p className="text-xs text-muted-foreground">Monthly savings</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Cost per Mile</span>
                <span className="font-medium">${fleetMetrics.costPerMile}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Maintenance Costs</span>
                <span className="font-medium">
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
    <Card>
      <CardHeader>
        <CardTitle>Active Routes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 h-[300px] rounded-lg overflow-hidden">
          <Map/>
        </div>
      </CardContent>
    </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart width={500} height={300} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#8884d8"
                  name="Efficiency"
                />
                <Line
                  type="monotone"
                  dataKey="emissions"
                  stroke="#82ca9d"
                  name="Emissions"
                />
                <Line
                  type="monotone"
                  dataKey="safety"
                  stroke="#ffc658"
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
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            alert.severity === "high"
                              ? "text-red-500"
                              : alert.severity === "medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }`}
                        />
                        <span className="font-medium">{alert.type}</span>
                      </div>
                      <span className={getSeverityStyles(alert.severity)}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{alert.vehicle}</span> -{" "}
                      {alert.message}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Health Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Overall Health</span>
                <span className="font-bold">{fleetMetrics.healthScore}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${fleetMetrics.healthScore}%` }}
                ></div>
              </div>
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Maintenance Due</span>
                  <span className="font-medium">
                    {fleetMetrics.maintenanceDue} vehicles
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Battery Health</span>
                  <span className="font-medium">
                    {fleetMetrics.batteryHealth}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tire Health</span>
                  <span className="font-medium">
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
