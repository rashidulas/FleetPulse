import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  // Sample data
  const driverMetrics: DriverMetrics = {
    id: "DR-2024-001",
    name: "John Anderson",
    experience: 5,
    safetyScore: 92,
    ecoScore: 88,
    totalTrips: 145,
    alertsToday: 2,
    complianceScore: 95,
    efficiencyScore: 90,
    overallRank: 3,
    improvedMetrics: ["Acceleration", "Fuel Efficiency"],
    needsImprovement: ["Braking", "Idling Time"],
  };

  const drivingSkills: DrivingSkill[] = [
    { skill: "Acceleration", score: 85 },
    { skill: "Braking", score: 75 },
    { skill: "Cornering", score: 90 },
    { skill: "Speed Control", score: 88 },
    { skill: "Following Distance", score: 92 },
    { skill: "Eco-Driving", score: 86 },
  ];

  const dailyEvents: DailyEvent[] = [
    {
      id: 1,
      time: "08:23",
      type: "Harsh Braking",
      location: "Main St.",
      impact: "Safety score -2",
      severity: "medium",
    },
    {
      id: 2,
      time: "10:45",
      type: "Excessive Idling",
      location: "Delivery Point B",
      impact: "Fuel waste: 0.5L",
      severity: "low",
    },
    {
      id: 3,
      time: "13:15",
      type: "Optimal Route Followed",
      location: "Route C",
      impact: "Efficiency score +3",
      severity: "positive",
    },
  ];

  const weeklyTrends: PerformanceTrend[] = [
    { day: "Mon", safetyScore: 88, ecoScore: 85, efficiency: 90 },
    { day: "Tue", safetyScore: 92, ecoScore: 87, efficiency: 88 },
    { day: "Wed", safetyScore: 90, ecoScore: 88, efficiency: 92 },
    { day: "Thu", safetyScore: 91, ecoScore: 90, efficiency: 89 },
    { day: "Fri", safetyScore: 89, ecoScore: 86, efficiency: 87 },
  ];

  return (
    <div className="bg-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">Driver Analytics</h1>
        <div className="flex space-x-4">
          <a href="/dashboard">
            <Button variant="ghost">Overview</Button>
          </a>
          <Button variant="ghost">Performance</Button>
          <Button variant="ghost">Reports</Button>
          <Button variant="ghost">Settings</Button>
        </div>
      </div>

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
            <h3 className="font-medium mb-4">Today's Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Alerts</span>
                </div>
                <span className="font-medium">{driverMetrics.alertsToday}</span>
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
              <CardTitle>Today's Events</CardTitle>
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
                              : event.severity === "positive"
                              ? "text-green-500"
                              : "text-blue-500"
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
                    <li key={index} className="text-sm flex items-center gap-2">
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
                    <li key={index} className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-blue-500" />
                  Coaching Tips
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>Schedule brake control training</li>
                  <li>Review idle reduction techniques</li>
                  <li>Practice eco-driving scenarios</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Driver Leaderboard */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Driver Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Safety Score</div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Rank #3</span>
                  <span className="text-green-600">
                    {driverMetrics.safetyScore}%
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Eco Score</div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Rank #5</span>
                  <span className="text-green-600">
                    {driverMetrics.ecoScore}%
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Efficiency</div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Rank #4</span>
                  <span className="text-green-600">
                    {driverMetrics.efficiencyScore}%
                  </span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Compliance</div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Rank #2</span>
                  <span className="text-green-600">
                    {driverMetrics.complianceScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Monthly Performance Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-3">Monthly Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Distance</span>
                    <span className="font-medium">3,245 km</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fuel Saved</span>
                    <span className="font-medium">125 L</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>CO2 Reduced</span>
                    <span className="font-medium">287 kg</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium mb-3">Safety Records</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Incident-Free Days</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Safety Violations</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Perfect Trips</span>
                    <span className="font-medium">89%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-medium mb-3">Training Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completed Modules</span>
                    <span className="font-medium">12/15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Next Training</span>
                    <span className="font-medium">Dec 15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Certifications</span>
                    <span className="font-medium">4</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
