"use client";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, Circle } from "react-leaflet";

function SinglePropertyMap({ coords }: { coords: number[] }) {
  const center = coords as LatLngExpression;
  const fillOptions = { fillColor: "#297160" };

  return (
    <MapContainer
      id="map"
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle center={center} pathOptions={fillOptions} radius={200} />
    </MapContainer>
  );
}

export default SinglePropertyMap;
