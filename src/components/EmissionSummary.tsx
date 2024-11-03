import React from "react";

// Assuming fuel efficiency in km per liter and carbon factor for diesel
const FUEL_EFFICIENCY_KM_PER_LITER = 2; // Example fuel efficiency (km/liter)
const CARBON_FACTOR_KG_CO2_PER_LITER = 2.68; // Diesel carbon factor (kg CO₂ per liter)

function calculateEmissions(distanceMeters: number) {
  const distanceKm = distanceMeters / 1000; // Convert meters to kilometers
  const fuelConsumed = distanceKm / FUEL_EFFICIENCY_KM_PER_LITER;
  return fuelConsumed * CARBON_FACTOR_KG_CO2_PER_LITER;
}

interface Directions {
  routes: {
    legs: {
      distance: {
        value: number;
      };
    }[];
  }[];
}

export default function EmissionSummary({ ecoFriendlyDirections, alternativeDirections }: { ecoFriendlyDirections: Directions; alternativeDirections: Directions }) {
  if (!ecoFriendlyDirections || !alternativeDirections) return null;

  // Get distance from Directions API result
  const ecoDistanceMeters = ecoFriendlyDirections.routes[0].legs.reduce((sum, leg) => sum + leg.distance.value, 0);
  const altDistanceMeters = alternativeDirections.routes[0].legs.reduce((sum, leg) => sum + leg.distance.value, 0);

  // Calculate emissions for each route
  const ecoEmissions = calculateEmissions(ecoDistanceMeters);
  const altEmissions = calculateEmissions(altDistanceMeters);
  const savings = altEmissions - ecoEmissions;
  const reductionPercentage = ((savings / altEmissions) * 100).toFixed(1);

  return (
    <div className="emission-summary mt-4 p-4 bg-gray-100 rounded-lg text-center">
      <h3 className="text-lg font-bold">Emission Savings Summary</h3>
      <p>Eco-Friendly Route Distance: <strong>{(ecoDistanceMeters / 1000).toFixed(2)} km</strong></p>
      <p>Alternative Route Distance: <strong>{(altDistanceMeters / 1000).toFixed(2)} km</strong></p>
      <p>Eco-Friendly Route Emissions: <strong>{ecoEmissions.toFixed(2)} kg CO₂</strong></p>
      <p>Alternative Route Emissions: <strong>{altEmissions.toFixed(2)} kg CO₂</strong></p>
      <p>CO₂ Savings: <strong>{savings.toFixed(2)} kg CO₂</strong></p>
      <p>Reduction Percentage: <strong>{reductionPercentage}%</strong></p>
    </div>
  );
}
