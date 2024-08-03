import React from 'react';
import MapWithSplit from './MapWithSplit';
import L from 'leaflet';

const App = () => {
  const layer1 = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  });

  const layer2 = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap contributors',
  });

  return (
    <div className="App">
      <MapWithSplit layer1={layer1} layer2={layer2} />
    </div>
  );
};

export default App;
