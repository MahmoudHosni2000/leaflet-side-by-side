import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-side-by-side";
import './finsh';
import './GeoData';
import Data from './finsh'
import Data10 from './GeoData'
const MapWithSplit = ({ layer1, layer2 }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [error, setError] = useState(null);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current).setView([30.0444, 31.2357], 8);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);


      mapRef.current = map;
    }
  }, []);

  useEffect(() => {
      const map = mapRef.current;

      // Define the style for the GeoJSON layer
      const geoJsonStyle = {
        color: "red",
        weight: 2,
        opacity: 0.65,
        fillOpacity: 0.4,
      };

      // Create a GeoJSON layer and add it to the map
      
      const geoJsonLayer = L.geoJSON(Data10, { style: geoJsonStyle }).addTo(map);
console.log(geoJsonLayer,"test");

      
      if (layer1 && layer2) {
        // layer1.addTo(mapRef.current);
        // layer2.addTo(mapRef.current);
        // L.control.sideBySide(layer1, layer2).addTo(mapRef.current);
      } else {
        setError(new Error("One or both layers are undefined"));
      }
    
  }, [geoData, layer1, layer2]);

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{ height: "100vh" }}
    >
      {error && <div className="map-error">Error: {error.message}</div>}
    </div>
  );
};

export default MapWithSplit;
