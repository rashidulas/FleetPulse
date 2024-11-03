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
  height: "100%",  // Use 100% to fit within parent container
};

const center = {
  lat: 40.7128,  // Set initial latitude
  lng: -74.0060, // Set initial longitude
};

export default function MapWithDirections() {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originAutocomplete, setOriginAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const handleDirectionsCallback = useCallback((response: google.maps.DirectionsResult | null) => {
    if (response !== null && response.routes && response.routes.length > 0) {
      setDirections(response);
    } else {
      setError("Directions request failed.");
      console.error("Directions request failed:", response);
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

  return (
    <div className="map-container h-full w-full">
      {/* Location Input Fields */}
      <div className="location-inputs mb-2 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
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

      {/* Map with Directions */}
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        {origin && destination && (
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
            }}
            callback={handleDirectionsCallback}
          />
        )}
        {directions && <DirectionsRenderer directions={directions} />}
        {error && <p>{error}</p>}
      </GoogleMap>
    </div>
  );
}
