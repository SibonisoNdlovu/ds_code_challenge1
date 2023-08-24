import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'; // Import your CSS file for styling

function CustomMap({ data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState('');

  // Update the filtered data when the selected location or complaint changes
  useEffect(() => {
    let filtered = data;

    // Filter by selected location
    if (selectedLocation !== '') {
      filtered = filtered.filter(item => item.Location === selectedLocation);
    }

    // Filter by selected complaint
    if (selectedComplaint !== '') {
      filtered = filtered.filter(item => item.ComplaintType === selectedComplaint);
    }

    setFilteredData(filtered);
  }, [selectedLocation, selectedComplaint, data]);

  // Get unique location and complaint values for filter options
  const uniqueLocations = Array.from(new Set(data.map(item => item.Location)));
  const uniqueComplaints = Array.from(new Set(data.map(item => item.ComplaintType)));

  return (
    <div className="map-container">
      <h2>Custom Map</h2>

      {/* Location filter */}
      <label htmlFor="location-filter">Filter by Location:</label>
      <select
        id="location-filter"
        onChange={(e) => setSelectedLocation(e.target.value)}
        value={selectedLocation}
      >
        <option value="">All Locations</option>
        {uniqueLocations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      {/* Complaint filter */}
      <label htmlFor="complaint-filter">Filter by Complaint:</label>
      <select
        id="complaint-filter"
        onChange={(e) => setSelectedComplaint(e.target.value)}
        value={selectedComplaint}
      >
        <option value="">All Complaints</option>
        {uniqueComplaints.map((complaint) => (
          <option key={complaint} value={complaint}>
            {complaint}
          </option>
        ))}
      </select>

      <MapContainer center={[-33.87283933403916, 18.52248797221645]} zoom={12} style={{ height: '50%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {filteredData.map((item, index) => (
          <Marker
            key={index}
            position={[item.Latitude, item.Longitude]}
          >
            <Popup>{item.Location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CustomMap;
