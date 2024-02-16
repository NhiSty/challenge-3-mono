import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

export default function Map({
  height = "500px",
  width = "100%",
  center = [51.505, -0.09],
  markers = [],
}) {
  return (
    <MapContainer style={{ height, width }} center={center} zoom={17}>
      <MapCustomizer />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </MapContainer>
  );
}

function MapCustomizer() {
  const map = useMap();

  useEffect(() => {
    map.zoomControl.setPosition("bottomright");
    //map.addControl(new (window as any).L.Control.Zoom({position: 'bottomright'}));
  });

  return null;
}

Map.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  center: PropTypes.array,
  markers: PropTypes.array,
};
