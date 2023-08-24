import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'; 

function CustomMap({ data }) {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState('');
  const [complaintsToShow, setComplaintsToShow] = useState(3); // Initial number of complaints to show

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

    // Limit the number of complaints to show
    filtered = filtered.slice(0, complaintsToShow);

    setFilteredData(filtered);
  }, [selectedLocation, selectedComplaint, data, complaintsToShow]);

  // Get unique location and complaint values for filter options
  const uniqueLocations = Array.from(new Set(data.map(item => item.Location)));
  const uniqueComplaints = Array.from(new Set(data.map(item => item.ComplaintType)));

  // Handle the slider change
  const handleSliderChange = (e) => {
    setComplaintsToShow(e.target.value);
  };

  const markerIcon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

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

      {/* Complaints Slider */}
      <label htmlFor="complaints-slider">Number of Complaints to Show:</label>
      <input
        type="range"
        id="complaints-slider"
        min="1"
        max={data.length}
        value={complaintsToShow}
        onChange={handleSliderChange}
      />
      <span>{complaintsToShow}</span>

      {/* MapContainer */}
      <MapContainer center={[-33.87283933403916, 18.52248797221645]} zoom={12} style={{ height: '500px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Data Representation (Markers) */}
        {filteredData.map((item, index) => (
          <Marker
            key={index}
            position={[item.Latitude, item.Longitude]}
            icon={markerIcon} 
          >
            <Popup>
              <strong>{item.Location}</strong><br />
              Complaint Type: {item.ComplaintType}<br />
              Description: {item.Description}<br />
              Date: {item.Date}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default CustomMap;
