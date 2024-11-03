// types/driver.ts

export interface DriverMetrics {
  id: string;
  name: string;
  experience: number;
  safetyScore: number;
  ecoScore: number;
  totalTrips: number;
  alertsToday: number;
  complianceScore: number;
  efficiencyScore: number;
  overallRank: number;
  improvedMetrics: string[];
  needsImprovement: string[];
  totalDistance: string;
  fuelSaved: string;
  co2Reduced: string;
  incidentFreeDays: number;
  perfectTrips: string;
  completedModules: string;
  certifications: number;
}

export interface DrivingSkill {
  skill: string;
  score: number;
}

export interface DailyEvent {
  id: number;
  time: string;
  type: string;
  location: string;
  impact: string;
  severity: "high" | "medium" | "low" | "positive";
}

export interface PerformanceTrend {
  day: string;
  safetyScore: number;
  ecoScore: number;
  efficiency: number;
}
