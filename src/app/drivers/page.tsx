"use client"
import { useEffect, useState } from 'react';
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

  // Cloudflare WorkersAI Setup
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/cloudflare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: driverMetrics.name,
          experience: driverMetrics.experience,
          safetyScore: driverMetrics.safetyScore,
          ecoScore: driverMetrics.ecoScore,
          needsImprovement: driverMetrics.needsImprovement,
          totalTrips: driverMetrics.totalTrips,
          alertsToday: driverMetrics.alertsToday,
        }),
      });
      const data: { suggestions?: string } = await response.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions("No suggestions available.");
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions("Error fetching suggestions.");
    } finally {
      setLoading(false);
    }
  };

  // Function to parse the feedback text and convert to HTML
  const parseFeedback = (text: string) => {
    // Split by new lines and then process each line
    return text.split('\n').map((line, index) => {
      // Replace **bold text** with <strong>bold text</strong>
      const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: processedLine }} className="mb-2" />
      );
    });
  };


  return (
    <div className="bg-[#1B1F2B] text-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold text-gray-100">Driver Analytics</h1>
        <div className="flex space-x-4">
          <a href="/dashboard">
            <Button variant="ghost" className="text-gray-300 hover:text-teal-400">Overview</Button>
          </a>
          <Button variant="ghost" className="text-gray-300 hover:text-teal-400">Performance</Button>
          <Button variant="ghost" className="text-gray-300 hover:text-teal-400">Reports</Button>
          <Button variant="ghost" className="text-gray-300 hover:text-teal-400">Settings</Button>
        </div>
      </div>

      {/* Driver Profile Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="md:col-span-2 bg-[#1E2433] border-[#2D3343]">
        <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#2A2F3B] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-teal-400" />
              </div>
              <div>
              <h2 className="text-xl font-bold text-gray-100">{driverMetrics.name}</h2>
                <p className="text-sm text-gray-400">
                  ID: {driverMetrics.id} • Experience: {driverMetrics.experience} years
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#2A2F3B] p-3 rounded-lg border border-[#3A3F4B]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-300">Safety Rank</span>
                </div>
                <span className="text-xl font-bold text-teal-400">
                  #{driverMetrics.overallRank}
                </span>
              </div>
              <div className="bg-[#2A2F3B] p-3 rounded-lg border border-[#3A3F4B]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-300">Total Trips</span>
                </div>
                <span className="text-xl font-bold text-teal-400">
                  {driverMetrics.totalTrips}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Performance Indicators */}
        <Card className="bg-[#1E2433] border-[#2D3343]">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4 text-gray-300">Performance Scores</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Safety</span>
                  <span className="text-sm font-medium text-teal-400">
                    {driverMetrics.safetyScore}%
                  </span>
                </div>
                <div className="w-full bg-[#1B1F2B] rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{ width: `${driverMetrics.safetyScore}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Eco-Driving</span>
                  <span className="text-sm font-medium text-teal-400">
                    {driverMetrics.ecoScore}%
                  </span>
                </div>
                <div className="w-full bg-[#1B1F2B] rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{ width: `${driverMetrics.ecoScore}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E2433] border-[#2D3343]">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4 text-gray-300">Today's Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">Alerts</span>
                </div>
                <span className="font-medium text-teal-400">{driverMetrics.alertsToday}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-gray-400">Improved</span>
                </div>
                <span className="font-medium text-teal-400">
                  {driverMetrics.improvedMetrics.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-[#1E2433] border-[#2D3343]">
          <CardHeader>
            <CardTitle className="text-gray-100">Weekly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <DriverPerformanceChart data={weeklyTrends} />
          </CardContent>
        </Card>

        <Card className="bg-[#1E2433] border-[#2D3343]">
          <CardHeader>
            <CardTitle className="text-gray-100">Driving Skills Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <DriverSkillsChart data={drivingSkills} />
          </CardContent>
        </Card>
      </div>

      {/* Daily Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-[#1E2433] border-[#2D3343]">
            <CardHeader>
              <CardTitle className="text-gray-100">Today's Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-[#2D3343]">
                {dailyEvents.map((event) => (
                  <div key={event.id} className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            event.severity === "high"
                              ? "text-red-400"
                              : event.severity === "medium"
                              ? "text-yellow-400"
                              : event.severity === "positive"
                              ? "text-teal-400"
                              : "text-blue-400"
                          }`}
                        />
                        <span className="font-medium text-gray-100">{event.type}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {event.time}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <p>{event.location}</p>
                      <p className="mt-1 font-medium text-gray-300">{event.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1E2433] border-[#2D3343]">
          <CardHeader>
            <CardTitle className="text-gray-100">Improvement Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
                <h4 className="font-medium mb-2 flex items-center gap-2 text-gray-100">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {driverMetrics.improvedMetrics.map((metric, index) => (
                    <li key={index} className="text-sm flex items-center gap-2 text-gray-300">
                      <span className="w-2 h-2 bg-teal-400 rounded-full" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
                <h4 className="font-medium mb-2 flex items-center gap-2 text-gray-100">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  Needs Improvement
                </h4>
                <ul className="space-y-2">
                  {driverMetrics.needsImprovement.map((metric, index) => (
                    <li key={index} className="text-sm flex items-center gap-2 text-gray-300">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
                <h4 className="font-medium mb-2 flex items-center gap-2 text-gray-100">
                  <Timer className="w-4 h-4 text-teal-400" />
                  Coaching Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Schedule brake control training</li>
                  <li>Review idle reduction techniques</li>
                  <li>Practice eco-driving scenarios</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Suggestions Section */}
<div className="mt-6">
  <Card className="bg-[#1E2433] border-[#2D3343]">
    <CardHeader>
      <CardTitle className="text-gray-100">Suggestions</CardTitle>
    </CardHeader>
    <CardContent>
      {loading ? (
        <p className="text-gray-400">Loading suggestions...</p>
      ) : (
        <div className="space-y-2 text-gray-300">
          {suggestions ? (
            parseFeedback(suggestions)
          ) : (
            <p className="text-gray-400">No suggestions available.</p>
          )}
        </div>
      )}
      <Button 
        onClick={fetchSuggestions} 
        className="mt-4 bg-teal-500 hover:bg-teal-600 text-white" 
        variant="default"
      >
        Get Suggestions
      </Button>
    </CardContent>
  </Card>
</div>


{/* Driver Leaderboard */}
<div className="mt-6">
  <Card className="bg-[#1E2433] border-[#2D3343]">
    <CardHeader>
      <CardTitle className="text-gray-100">Driver Rankings</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
          <div className="text-sm text-gray-400 mb-1">Safety Score</div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-300">Rank #3</span>
            <span className="text-teal-400">
              {driverMetrics.safetyScore}%
            </span>
          </div>
        </div>
        <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
          <div className="text-sm text-gray-400 mb-1">Eco Score</div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-300">Rank #5</span>
            <span className="text-teal-400">
              {driverMetrics.ecoScore}%
            </span>
          </div>
        </div>
        <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
          <div className="text-sm text-gray-400 mb-1">Efficiency</div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-300">Rank #4</span>
            <span className="text-teal-400">
              {driverMetrics.efficiencyScore}%
            </span>
          </div>
        </div>
        <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
          <div className="text-sm text-gray-400 mb-1">Compliance</div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-300">Rank #2</span>
            <span className="text-teal-400">
              {driverMetrics.complianceScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Monthly Performance Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
          <h4 className="font-medium mb-3 text-gray-100">Monthly Statistics</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Distance</span>
              <span className="font-medium text-teal-400">3,245 km</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fuel Saved</span>
              <span className="font-medium text-teal-400">125 L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">CO2 Reduced</span>
              <span className="font-medium text-teal-400">287 kg</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
          <h4 className="font-medium mb-3 text-gray-100">Safety Records</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Incident-Free Days</span>
              <span className="font-medium text-teal-400">45</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Safety Violations</span>
              <span className="font-medium text-teal-400">0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Perfect Trips</span>
              <span className="font-medium text-teal-400">89%</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B]">
          <h4 className="font-medium mb-3 text-gray-100">Training Status</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Completed Modules</span>
              <span className="font-medium text-teal-400">12/15</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Next Training</span>
              <span className="font-medium text-teal-400">Dec 15</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Certifications</span>
              <span className="font-medium text-teal-400">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mt-6">
        <h4 className="font-medium mb-4 text-gray-100">Recent Achievements</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B] hover:border-teal-500/50 transition-colors duration-200">
            <Award className="w-8 h-8 text-teal-400" />
            <div>
              <div className="font-medium text-gray-100">Eco Master</div>
              <div className="text-sm text-gray-400">
                Top 5% fuel efficiency
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B] hover:border-teal-500/50 transition-colors duration-200">
            <Shield className="w-8 h-8 text-teal-400" />
            <div>
              <div className="font-medium text-gray-100">Safety Champion</div>
              <div className="text-sm text-gray-400">
                30 days perfect safety
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B] hover:border-teal-500/50 transition-colors duration-200">
            <Timer className="w-8 h-8 text-teal-400" />
            <div>
              <div className="font-medium text-gray-100">Time Keeper</div>
              <div className="text-sm text-gray-400">
                100% on-time delivery
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#2A2F3B] rounded-lg border border-[#3A3F4B] hover:border-teal-500/50 transition-colors duration-200">
            <TrendingUp className="w-8 h-8 text-teal-400" />
            <div>
              <div className="font-medium text-gray-100">Top Performer</div>
              <div className="text-sm text-gray-400">
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
