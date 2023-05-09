"use client";

import "leaflet/dist/leaflet.css";

import { FC, useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import Leaflet from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//@ts-ignore
// delete Leaflet.Icon.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: [number, number];
}

const Map: FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={center ?? [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center} />}
      <AutoRecenter center={center} zoom={center ? 4 : 2} />
    </MapContainer>
  );
};

const AutoRecenter: FC<MapProps & { zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center) map.setView(center, zoom, { animate: true });
  }, [center, zoom]);

  return null;
};

export default Map;
