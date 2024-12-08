"use client";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
const svgIcon = L.divIcon({
  html: `<svg height="24" viewBox="0 0 64 64" width="24" xmlns="http://www.w3.org/2000/svg"><g id="Map_Pin-2" data-name="Map Pin"><path d="m32 0a24.028 24.028 0 0 0 -24 24c0 16.228 22.342 38.756 23.293 39.707a1 1 0 0 0 1.414 0c.951-.951 23.293-23.479 23.293-39.707a24.028 24.028 0 0 0 -24-24z" fill="#e87827"/><circle cx="32" cy="24" fill="#fff" r="13"/></g></svg>`,
  iconSize: [24, 24],
  className: "bg-transparent, p-0, border-0",
});

const locations: L.LatLngExpression[] = [
  [27.53156486367412, -82.73504734850711],
  [24.551451395971092, -81.80690336163535],
  [30.210400888126753, -85.86890656507559],
];

function PropertiesMap({ propertiesLength }: { propertiesLength: number }) {
  return (
    <MapContainer
      id="map"
      center={[27.53156486367412, -82.73504734850711]}
      zoom={10}
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
      {propertiesLength > 0 &&
        locations.map((location, index) => (
          <Marker key={index} position={location} icon={svgIcon} />
        ))}
    </MapContainer>
  );
}
export default PropertiesMap;
