import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-side-by-side';

const MapWithSplit = ({ layer1, layer2 }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [51.505, -0.09],
        zoom: 13,
      });

      try {
        if (layer1 && layer2) {
          layer1.addTo(map);
          layer2.addTo(map);
          L.control.sideBySide(layer1, layer2).addTo(map);
        } else {
          throw new Error("One or both layers are undefined");
        }
      } catch (err) {
        setError(err);
      }
      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); 
        mapRef.current = null; 
      }
    };
  }, [layer1, layer2]);

  return (
    <div
      ref={mapContainerRef} 
      className="map-container"
      style={{ height: '100vh' }}
    >
      {error && <div className="map-error">Error: {error.message}</div>}
    </div>
  );
};

export default MapWithSplit;
