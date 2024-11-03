"use client";
import { useEffect, useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  AlertTriangle,
  Award,
  TrendingUp,
  Shield,
  Timer,
} from "lucide-react";
import {
  DriverPerformanceChart,
  DriverSkillsChart,
} from "@/components/DriverCharts";
import type {
  DriverMetrics,
  DrivingSkill,
  DailyEvent,
  PerformanceTrend,
} from "@/types/driver";

export default function DriversPage() {
  const [drivers, setDrivers] = useState<
    { driver_id: string; driver_name: string }[]
  >([]);
  const [selectedDriverId, setSelectedDriverId] = useState("DR-2024-001");
  const [driverMetrics, setDriverMetrics] = useState<DriverMetrics | null>(
    null
  );
  const [drivingSkills, setDrivingSkills] = useState<DrivingSkill[]>([]);
  const [dailyEvents, setDailyEvents] = useState<DailyEvent[]>([]);
  const [weeklyTrends, setWeeklyTrends] = useState<PerformanceTrend[]>([]);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of drivers
    const fetchDrivers = async () => {
      try {
        const response = await fetch("/api/fleet-metrics");
        const data: any = await response.json();
        setDrivers(
          data.drivers_data.map((driver: any) => ({
            driver_id: driver.driver_id,
            driver_name: driver.driver_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching drivers list:", error);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    if (!selectedDriverId) return;

    const fetchDriverData = async () => {
      try {
        const response = await fetch("/api/fleet-metrics");
        const data: any = await response.json();

        const driverData = data.drivers_data.find(
          (driver: { driver_id: string }) =>
            driver.driver_id === selectedDriverId
        );

        if (driverData) {
          setDriverMetrics({
            id: driverData.driver_id,
            name: driverData.driver_name,
            experience: driverData.experience,
            safetyScore: parseFloat(driverData.safety_score?.value || "0"),
            ecoScore: parseFloat(driverData.eco_score?.value || "0"),
            totalTrips: driverData.monthly_statistics?.total_trips || 0,
            totalDistance:
              driverData.monthly_statistics?.total_distance || "0 km",
            fuelSaved: driverData.monthly_statistics?.fuel_saved || "0 L",
            co2Reduced: driverData.monthly_statistics?.co2_reduced || "0 kg",
            alertsToday: driverData.safety_records?.safety_violations || 0,
            complianceScore: parseFloat(driverData.compliance?.value || "0"),
            efficiencyScore: parseFloat(driverData.efficiency?.value || "0"),
            overallRank: driverData.safety_score?.rank || 0,
            improvedMetrics: driverData.improvedMetrics || [],
            needsImprovement: driverData.needsImprovement || [],
            incidentFreeDays:
              driverData.safety_records?.incident_free_days || 0,
            perfectTrips: driverData.safety_records?.perfect_trips || "0%",
            completedModules:
              driverData.training_status?.completed_modules || "0/0",
            certifications: driverData.training_status?.certifications || 0,
          });

          setDailyEvents(
            driverData.recent_events.map((event: any, index: any) => ({
              id: index + 1,
              time: event.time,
              type: event.event_type,
              location: event.location,
              impact: event.impact,
              severity:
                event.event_type === "Harsh Braking" ||
                event.event_type === "Excessive Idling"
                  ? "medium"
                  : "positive",
            }))
          );

          setDrivingSkills([
            {
              skill: "Acceleration",
              score: driverData.acceleration_score || 85,
            },
            { skill: "Braking", score: driverData.braking_score || 75 },
            { skill: "Cornering", score: driverData.cornering_score || 90 },
            {
              skill: "Speed Control",
              score: driverData.speed_control_score || 88,
            },
            {
              skill: "Following Distance",
              score: driverData.following_distance_score || 92,
            },
            { skill: "Eco-Driving", score: driverData.eco_driving_score || 86 },
          ]);

          setWeeklyTrends([
            { day: "Mon", safetyScore: 88, ecoScore: 85, efficiency: 90 },
            { day: "Tue", safetyScore: 92, ecoScore: 87, efficiency: 88 },
            { day: "Wed", safetyScore: 90, ecoScore: 88, efficiency: 92 },
            { day: "Thu", safetyScore: 91, ecoScore: 90, efficiency: 89 },
            { day: "Fri", safetyScore: 89, ecoScore: 86, efficiency: 87 },
          ]);
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

    fetchDriverData();
  }, [selectedDriverId]);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cloudflare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: driverMetrics?.name,
          experience: driverMetrics?.experience,
          safetyScore: driverMetrics?.safetyScore,
          ecoScore: driverMetrics?.ecoScore,
          needsImprovement: driverMetrics?.needsImprovement,
          totalTrips: driverMetrics?.totalTrips,
          alertsToday: driverMetrics?.alertsToday,
        }),
      });
      const data: { suggestions?: string } = await response.json();
      setSuggestions(data.suggestions || "No suggestions available.");
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions("Error fetching suggestions.");
    } finally {
      setLoading(false);
    }
  };

  const parseFeedback = (text: string) =>
    text.split("\n").map((line, index) => (
      <div
        key={index}
        dangerouslySetInnerHTML={{
          __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
        }}
        className="mb-2"
      />
    ));

  return (
    <div className="bg-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-800 bg-clip-text text-transparent">
          Driver Analytics
        </h1>
        <div className="flex space-x-4">
          <a href="/dashboard">
            <Button variant="ghost">Overview</Button>
          </a>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Driver Selector */}
      <div className="mb-6">
        <Select
          onValueChange={setSelectedDriverId}
          defaultValue={selectedDriverId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Driver" />
          </SelectTrigger>
          <SelectContent>
            {drivers.map((driver) => (
              <SelectItem key={driver.driver_id} value={driver.driver_id}>
                {driver.driver_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {driverMetrics ? (
        <>
          {/* Driver Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{driverMetrics.name}</h2>
                    <p className="text-sm text-gray-600">
                      ID: {driverMetrics.id} • Experience:{" "}
                      {driverMetrics.experience} years
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Safety Rank</span>
                    </div>
                    <span className="text-xl font-bold text-green-700">
                      #{driverMetrics.overallRank}
                    </span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Total Trips</span>
                    </div>
                    <span className="text-xl font-bold text-blue-700">
                      {driverMetrics.totalTrips}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Performance Indicators */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Performance Scores</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Safety</span>
                      <span className="text-sm font-medium">
                        {driverMetrics.safetyScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${driverMetrics.safetyScore}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Eco-Driving</span>
                      <span className="text-sm font-medium">
                        {driverMetrics.ecoScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${driverMetrics.ecoScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Today&apos;s Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Alerts</span>
                    </div>
                    <span className="font-medium">
                      {driverMetrics.alertsToday}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Improved</span>
                    </div>
                    <span className="font-medium">
                      {driverMetrics.improvedMetrics.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <DriverPerformanceChart data={weeklyTrends} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Driving Skills Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <DriverSkillsChart data={drivingSkills} />
              </CardContent>
            </Card>
          </div>

          {/* Daily Events */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {dailyEvents.map((event) => (
                      <div key={event.id} className="py-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle
                              className={`h-4 w-4 ${
                                event.severity === "high"
                                  ? "text-red-500"
                                  : event.severity === "medium"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                            />
                            <span className="font-medium">{event.type}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {event.time}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>{event.location}</p>
                          <p className="mt-1 font-medium">{event.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {driverMetrics.improvedMetrics.map((metric, index) => (
                        <li
                          key={index}
                          className="text-sm flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Needs Improvement
                    </h4>
                    <ul className="space-y-2">
                      {driverMetrics.needsImprovement.map((metric, index) => (
                        <li
                          key={index}
                          className="text-sm flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Section */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Loading suggestions...</p>
                ) : (
                  <div className="space-y-2">
                    {suggestions ? (
                      parseFeedback(suggestions)
                    ) : (
                      <p>No suggestions available.</p>
                    )}
                  </div>
                )}
                <Button
                  onClick={fetchSuggestions}
                  className="mt-4"
                  variant="default"
                >
                  Get Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Monthly Performance Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-3">Monthly Statistics</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Distance</span>
                  <span className="font-medium">
                    {driverMetrics.totalDistance}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fuel Saved</span>
                  <span className="font-medium">{driverMetrics.fuelSaved}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>CO2 Reduced</span>
                  <span className="font-medium">
                    {driverMetrics.co2Reduced}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium mb-3">Safety Records</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Incident-Free Days</span>
                  <span className="font-medium">
                    {driverMetrics.incidentFreeDays}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Safety Violations</span>
                  <span className="font-medium">
                    {driverMetrics.alertsToday}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Perfect Trips</span>
                  <span className="font-medium">
                    {driverMetrics.perfectTrips}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium mb-3">Training Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed Modules</span>
                  <span className="font-medium">
                    {driverMetrics.completedModules}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Certifications</span>
                  <span className="font-medium">
                    {driverMetrics.certifications}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-6">
            <h4 className="font-medium mb-4">Recent Achievements</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Award className="w-8 h-8 text-purple-500" />
                <div>
                  <div className="font-medium">Eco Master</div>
                  <div className="text-sm text-gray-600">
                    Top 5% fuel efficiency
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="font-medium">Safety Champion</div>
                  <div className="text-sm text-gray-600">
                    30 days perfect safety
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Timer className="w-8 h-8 text-green-500" />
                <div>
                  <div className="font-medium">Time Keeper</div>
                  <div className="text-sm text-gray-600">
                    100% on-time delivery
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="font-medium">Top Performer</div>
                  <div className="text-sm text-gray-600">
                    Quarterly best driver
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No driver data available.</p>
      )}
    </div>
  );
}
