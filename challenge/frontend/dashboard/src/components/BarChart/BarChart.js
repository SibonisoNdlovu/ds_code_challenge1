import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLegend, VictoryTooltip } from 'victory';

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
      </div>
      <VictoryChart width={800} height={500} domainPadding={20}>
        <VictoryAxis
          tickFormat={(tick) => tick}
          label="Service Type"
          style={{
            axisLabel: { padding: 30 },
            ticks: { padding: 10 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => tick}
          label="Number of Complaints"
          style={{
            axisLabel: { padding: 40 },
          }}
        />
        <VictoryBar
          data={chartData}
          x="serviceType"
          y="count"
          style={{ data: { fill: 'rgba(7,19,192,0.6)' } }}
          vertical
          labels={({ datum }) => `Count: ${datum.count}`} 
          labelComponent={<VictoryTooltip />} 
        />
        <VictoryLegend
          x={50}
          y={30}
          title="Service Types"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ title: { fontSize: 16 } }}
          data={chartData.map((item) => ({
            name: item.serviceType,
            symbol: { fill: 'rgba(7,19,192,0.6)' },
          }))}
        />
      </VictoryChart>
    </div>
  );
}

export default ComplaintsBarChart;
