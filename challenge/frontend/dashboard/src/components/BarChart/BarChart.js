import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ComplaintsBarChart({ data }) {
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Update the filtered data when the selected service type or location changes
  useEffect(() => {
    let filtered = data;

    if (selectedServiceType !== '') {
      filtered = filtered.filter(entry => entry.ServiceType === selectedServiceType);
    }

    if (selectedLocation !== '') {
      filtered = filtered.filter(entry => entry.Location === selectedLocation);
    }

    setFilteredData(filtered);
  }, [selectedServiceType, selectedLocation, data]);

  // Group the filtered data by service type and count complaints
  const serviceTypeCounts = filteredData.reduce((counts, entry) => {
    const serviceType = entry.ServiceType;
    if (!counts[serviceType]) {
      counts[serviceType] = 0;
    }
    counts[serviceType]++;
    return counts;
  }, {});

  // Prepare data for the bar chart
  const chartData = Object.keys(serviceTypeCounts).map(serviceType => ({
    serviceType,
    count: serviceTypeCounts[serviceType],
  }));

  return (
    <div className="chart-container">
      <h2>Complaints by Service Type</h2>
      <div>
        <label htmlFor="serviceTypeSelect">Select Service Type:</label>
        <select
          id="serviceTypeSelect"
          onChange={(e) => setSelectedServiceType(e.target.value)}
          value={selectedServiceType}
        >
          <option value="">All Service Types</option>
          {Array.from(new Set(data.map(entry => entry.ServiceType))).map((serviceType) => (
            <option key={serviceType} value={serviceType}>
              {serviceType}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="locationSelect">Select Location:</label>
        <select
          id="locationSelect"
          onChange={(e) => setSelectedLocation(e.target.value)}
          value={selectedLocation}
        >
          <option value="">All Locations</option>
          {Array.from(new Set(data.map(entry => entry.Location))).map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <br/>
        <br/>
      </div>
      <BarChart width={800} height={500} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="serviceType" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="red" name="Number of Complaints" />
      </BarChart>
    </div>
  );
}

export default ComplaintsBarChart;
