import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";

type GoogleMapProps = {
  directionsResponse: google.maps.DirectionsResult | null;
  markers: { lat: number; lng: number }[];
};

const GoogleMapComponent = ({
  directionsResponse,
  markers,
}: GoogleMapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCis70LPEX-XRlVaTc5JSVPNJzxDnpHp1E",
    libraries: ["places"],
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={10}
      center={markers[0] || { lat: -3.777031, lng: -49.663575 }}
      onLoad={(mapInstance) => setMap(mapInstance)}
    >
      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} label={index === 0 ? "A" : "B"} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMapComponent;
