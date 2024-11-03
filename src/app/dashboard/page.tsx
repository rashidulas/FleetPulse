"use client";
import React, { useEffect, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
import EmissionSummary from "@/components/EmissionSummary";

// Types and Interfaces
interface FleetMetrics {
  activeRoutes: string;
  utilizationRate: string;
  onTimeDeliveries: string;
  carbonSaved: string;
  ecoScore: number;
  fuelEfficiency: string;
  savingsThisMonth: string;
  costPerMile: string;
  maintenanceCosts: string;
  healthScore: string;
  maintenanceDue: string;
  batteryHealth: string;
  tirePressure: string;
  totalVehicles?: string;
}

interface Alert {
  id: number;
  type: string;
  severity: string;
  vehicle: string;
  message: string;
}

const FleetDashboard: React.FC = () => {
  const [fleetMetrics, setFleetMetrics] = useState<FleetMetrics>({
    activeRoutes: "",
    utilizationRate: "",
    onTimeDeliveries: "",
    carbonSaved: "",
    ecoScore: 0,
    fuelEfficiency: "",
    savingsThisMonth: "",
    costPerMile: "",
    maintenanceCosts: "",
    healthScore: "",
    maintenanceDue: "",
    batteryHealth: "",
    tirePressure: "",
  });

  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "Engine Issue",
      severity: "high",
      vehicle: "Truck 1",
      message: "Engine overheating",
    },
    {
      id: 2,
      type: "Low Tire Pressure",
      severity: "medium",
      vehicle: "Truck 2",
      message: "Front left tire pressure low",
    },
    {
      id: 3,
      type: "Battery Low",
      severity: "low",
      vehicle: "Truck 3",
      message: "Battery charge below 20%",
    },
  ]);

  const performanceData = [
    { month: "Jan", efficiency: 85, emissions: 75, safety: 88 },
    { month: "Feb", efficiency: 88, emissions: 72, safety: 90 },
    { month: "Mar", efficiency: 92, emissions: 68, safety: 92 },
    { month: "Apr", efficiency: 90, emissions: 70, safety: 89 },
    { month: "May", efficiency: 94, emissions: 65, safety: 93 },
    { month: "Jun", efficiency: 91, emissions: 67, safety: 91 },
  ];

  interface ApiResponse {
    fleet_metrics: {
      fleet_status: {
        active_vehicles: string;
        utilization: string;
        on_time_delivery: string;
      };
      environmental_impact: {
        carbon_emissions_saved: string;
        eco_score: number;
        fuel_efficiency: string;
      };
      financial_overview: {
        monthly_savings: string;
        cost_per_mile: string;
        maintenance_costs: string;
      };
      vehicle_health: {
        overall_health: string;
        maintenance_due: string;
        battery_health: string;
        tire_health: string;
      };
    };
    drivers_data: Array<{
      driver_id: string;
      driver_name: string;
      experience: number;
      safety_score: { rank: number; value: string };
      eco_score: { rank: number; value: string };
      efficiency: { rank: number; value: string };
      compliance: { rank: number; value: string };
      monthly_statistics: {
        total_trips: number;
        total_distance: string;
        fuel_saved: string;
        co2_reduced: string;
      };
      safety_records: {
        incident_free_days: number;
        safety_violations: number;
        perfect_trips: string;
      };
      training_status: {
        completed_modules: string;
        certifications: number;
      };
      recent_events: Array<{
        event_type: string;
        time: string;
        location: string;
        impact: string;
      }>;
    }>;
  }

  useEffect(() => {
    const fetchFleetData = async () => {
      try {
        const response = await fetch("/api/fleet-metrics");
        const data = (await response.json()) as ApiResponse;

        const apiMetrics = data.fleet_metrics;
        setFleetMetrics({
          activeRoutes:
            apiMetrics?.fleet_status?.active_vehicles ||
            fleetMetrics.activeRoutes,
          utilizationRate:
            apiMetrics?.fleet_status?.utilization ||
            fleetMetrics.utilizationRate,
          onTimeDeliveries:
            apiMetrics?.fleet_status?.on_time_delivery ||
            fleetMetrics.onTimeDeliveries,
          carbonSaved:
            apiMetrics?.environmental_impact?.carbon_emissions_saved ||
            fleetMetrics.carbonSaved,
          ecoScore:
            apiMetrics?.environmental_impact?.eco_score ||
            fleetMetrics.ecoScore,
          fuelEfficiency:
            apiMetrics?.environmental_impact?.fuel_efficiency ||
            fleetMetrics.fuelEfficiency,
          savingsThisMonth:
            apiMetrics?.financial_overview?.monthly_savings ||
            fleetMetrics.savingsThisMonth,
          costPerMile:
            apiMetrics?.financial_overview?.cost_per_mile ||
            fleetMetrics.costPerMile,
          maintenanceCosts:
            apiMetrics?.financial_overview?.maintenance_costs ||
            fleetMetrics.maintenanceCosts,
          healthScore:
            apiMetrics?.vehicle_health?.overall_health ||
            fleetMetrics.healthScore,
          maintenanceDue:
            apiMetrics?.vehicle_health?.maintenance_due ||
            fleetMetrics.maintenanceDue,
          batteryHealth:
            apiMetrics?.vehicle_health?.battery_health ||
            fleetMetrics.batteryHealth,
          tirePressure:
            apiMetrics?.vehicle_health?.tire_health ||
            fleetMetrics.tirePressure,
        });
      } catch (error) {
        console.error("Error fetching fleet data:", error);
      }
    };

    fetchFleetData();
  }, []);

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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-800 bg-clip-text text-transparent">
          FleetPlus Dashboard
        </h1>
        {/* < Map/> */}
        <div className="flex space-x-4">
          {/* <Button variant="ghost">Routes</Button> */}
          {/* <Button variant="ghost">Vehicles</Button> */}
          <a href="/drivers">
            <Button variant="ghost">Drivers</Button>
          </a>
          {/* <Button variant="ghost">Reports</Button> */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Operational Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Status</CardTitle>
            <Truck className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fleetMetrics.activeRoutes}
            </div>
            <p className="text-xs text-muted-foreground">Active vehicles</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Utilization</span>
                <span className="font-medium">
                  {fleetMetrics.utilizationRate}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>On-Time Delivery</span>
                <span className="font-medium">
                  {fleetMetrics.onTimeDeliveries}
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
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900">
              {fleetMetrics.carbonSaved}
            </div>
            <p className="text-xs text-emerald-600">Carbon emissions saved</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Eco Score</span>
                <span className="font-medium">{fleetMetrics.ecoScore}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Fuel Efficiency</span>
                <span className="font-medium">
                  {fleetMetrics.fuelEfficiency}
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
            <DollarSign className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {fleetMetrics.savingsThisMonth}
            </div>
            <p className="text-xs text-muted-foreground">Monthly savings</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Cost per Mile</span>
                <span className="font-medium">{fleetMetrics.costPerMile}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Maintenance Costs</span>
                <span className="font-medium">
                  {fleetMetrics.maintenanceCosts}
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
            <CardTitle>Fuel Efficient Route</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 h-[600px] rounded-lg overflow-hidden">
              <Map />
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px]">
              <LineChart width={500} height={500} data={performanceData}>
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
              <CardTitle>Recent Alerts Based on AI</CardTitle>
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
                <span className="font-bold">{fleetMetrics.healthScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${fleetMetrics.healthScore}` }}
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
                    {fleetMetrics.batteryHealth}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tire Health</span>
                  <span className="font-medium">
                    {fleetMetrics.tirePressure}
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
