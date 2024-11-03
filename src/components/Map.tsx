import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 40.7128,
  lng: -74.0060,
};

// Constants for average truck fuel efficiency and diesel CO₂ factor
const FUEL_EFFICIENCY_KM_PER_LITER = 2.5; // in km per liter
const CARBON_FACTOR_KG_CO2_PER_LITER = 2.68; // in kg CO₂ per liter

// Calculate emissions based on distance
const calculateEmissions = (distanceKm: number): number => {
  const fuelConsumed = distanceKm / FUEL_EFFICIENCY_KM_PER_LITER;
  return fuelConsumed * CARBON_FACTOR_KG_CO2_PER_LITER;
};

export default function MapWithSideBySideRoutes() {
  const [ecoFriendlyDirections, setEcoFriendlyDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [alternativeDirections, setAlternativeDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [ecoRouteDistance, setEcoRouteDistance] = useState<number | null>(null);
  const [altRouteDistance, setAltRouteDistance] = useState<number | null>(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originAutocomplete, setOriginAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const handleEcoFriendlyDirectionsCallback = useCallback((result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
    if (status === google.maps.DirectionsStatus.OK && result && result.routes.length > 0) {
      setEcoFriendlyDirections(result);
      const distance = result.routes[0].legs.reduce((sum, leg) => sum + (leg.distance?.value || 0), 0);
      setEcoRouteDistance(distance / 1000); // Convert meters to kilometers
    }
  }, []);

  const handleAlternativeDirectionsCallback = useCallback((result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
    if (status === google.maps.DirectionsStatus.OK && result && result.routes.length > 0) {
      setAlternativeDirections(result);
      const distance = result.routes[0].legs.reduce((sum, leg) => sum + (leg.distance?.value || 0), 0);
      setAltRouteDistance(distance / 1000); // Convert meters to kilometers
    }
  }, []);

  const onLoadOrigin = (autocomplete: google.maps.places.Autocomplete) => {
    setOriginAutocomplete(autocomplete);
  };

  const onLoadDestination = (autocomplete: google.maps.places.Autocomplete) => {
    setDestinationAutocomplete(autocomplete);
  };

  const onOriginPlaceChanged = () => {
    if (originAutocomplete) {
      const originPlace = originAutocomplete.getPlace();
      if (originPlace && originPlace.formatted_address) {
        setOrigin(originPlace.formatted_address);
      }
    }
  };

  const onDestinationPlaceChanged = () => {
    if (destinationAutocomplete) {
      const destinationPlace = destinationAutocomplete.getPlace();
      if (destinationPlace && destinationPlace.formatted_address) {
        setDestination(destinationPlace.formatted_address);
      }
    }
  };

  if (!isLoaded) return <div>Loading Maps...</div>;

  // Calculate emissions
  const ecoEmissions = ecoRouteDistance ? calculateEmissions(ecoRouteDistance) : null;
  const altEmissions = altRouteDistance ? calculateEmissions(altRouteDistance) : null;

  // Determine which route is "eco-friendly" based on emissions
  const ecoDistance = ecoEmissions !== null && altEmissions !== null && ecoEmissions <= altEmissions ? ecoRouteDistance : altRouteDistance;
  const altDistance = ecoEmissions !== null && altEmissions !== null && ecoEmissions > altEmissions ? ecoRouteDistance : altRouteDistance;
  const ecoFriendlyEmissions = ecoEmissions !== null && altEmissions !== null && ecoEmissions <= altEmissions ? ecoEmissions : altEmissions;
  const alternativeEmissions = ecoEmissions !== null && altEmissions !== null && ecoEmissions > altEmissions ? ecoEmissions : altEmissions;
  const emissionsSavings = alternativeEmissions && ecoFriendlyEmissions ? alternativeEmissions - ecoFriendlyEmissions : null;
  const reductionPercentage = emissionsSavings && alternativeEmissions ? ((emissionsSavings / alternativeEmissions) * 100).toFixed(1) : null;

  return (
    <div>
      {/* Location Input Fields */}
      <div className="location-inputs mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onOriginPlaceChanged}>
          <input
            type="text"
            placeholder="Enter origin"
            className="input-field p-2 border border-gray-300 rounded-md w-full"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </Autocomplete>
        <Autocomplete onLoad={onLoadDestination} onPlaceChanged={onDestinationPlaceChanged}>
          <input
            type="text"
            placeholder="Enter destination"
            className="input-field p-2 border border-gray-300 rounded-md w-full"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Autocomplete>
      </div>

      {/* Maps Container */}
      <div className="flex flex-row space-x-4 w-full max-w-6xl mx-auto">
        {/* Eco-Friendly Route Map */}
        <div className="flex-1">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
            {origin && destination && (
              <DirectionsService
                options={{
                  origin,
                  destination,
                  travelMode: google.maps.TravelMode.DRIVING,
                  avoidHighways: true,
                }}
                callback={handleEcoFriendlyDirectionsCallback}
              />
            )}
            {ecoFriendlyDirections && (
              <DirectionsRenderer
                directions={ecoFriendlyDirections}
                options={{
                  polylineOptions: {
                    strokeColor: "green",
                    strokeOpacity: 0.6,
                    strokeWeight: 6,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>

        {/* Alternative Route Map */}
        <div className="flex-1">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
          >
            {origin && destination && (
              <DirectionsService
                options={{
                  origin,
                  destination,
                  travelMode: google.maps.TravelMode.DRIVING,
                  avoidHighways: false,
                }}
                callback={handleAlternativeDirectionsCallback}
              />
            )}
            {alternativeDirections && (
              <DirectionsRenderer
                directions={alternativeDirections}
                options={{
                  polylineOptions: {
                    strokeColor: "red",
                    strokeOpacity: 0.6,
                    strokeWeight: 6,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>

      {/* Emission Savings Summary */}
      {ecoDistance !== null && altDistance !== null && (
        <div className="emission-summary mt-4 p-4 bg-[#1B1F2B] rounded-lg w-full max-w-2xl mx-auto text-center">
          <h3 className="text-lg text-white font-bold">Emission Savings Summary</h3>
          <p>Eco-Friendly Route Distance: <strong>{ecoDistance.toFixed(2)} km</strong></p>
          <p>Alternative Route Distance: <strong>{altDistance.toFixed(2)} km</strong></p>
          <p>Eco-Friendly Route Emissions: <strong>{ecoFriendlyEmissions !== null ? ecoFriendlyEmissions.toFixed(2) : "N/A"} kg CO₂</strong></p>
          <p>Alternative Route Emissions: <strong>{alternativeEmissions !== null ? alternativeEmissions.toFixed(2) : "N/A"} kg CO₂</strong></p>
          <p>CO₂ Savings: <strong>{emissionsSavings !== null ? emissionsSavings.toFixed(2) : "N/A"} kg CO₂</strong></p>
          <p>Reduction Percentage: <strong>{reductionPercentage}%</strong></p>
        </div>
      )}
    </div>
  );
}
