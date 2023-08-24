import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLegend } from 'victory';

function ChartComponent({ data }) {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Update the filtered data when the selected location changes
  useEffect(() => {
    if (selectedLocation === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(entry => entry.Location === selectedLocation);
      setFilteredData(filtered);
    }
  }, [selectedLocation, data]);

  // Group the filtered data by location and count complaints
  const locationCounts = filteredData.reduce((counts, entry) => {
    const location = entry.Location;
    if (!counts[location]) {
      counts[location] = 0;
    }
    counts[location]++;
    return counts;
  }, {});

  // Prepare data for the bar chart
  const chartData = Object.keys(locationCounts).map(location => ({
    location,
    count: locationCounts[location],
  }));

  return (
    <div className="chart-container">
      <h2>Complaints by Location (Bar Chart)</h2>
      <select onChange={(e) => setSelectedLocation(e.target.value)}>
        <option value="">All Locations</option>
        {Array.from(new Set(data.map(entry => entry.Location))).map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <VictoryChart width={1500} height={400}>
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => tick}
          label="Number of Complaints"
        />
        <VictoryAxis
          tickFormat={(tick) => tick}
          label="Location"
        />
        <VictoryBar
          data={chartData}
          x="location"
          y="count"
          style={{ data: { fill: 'rgba(75,192,192,0.6)' } }}
        />
        <VictoryLegend
          x={300}
          y={30}
          title="Locations"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ title: { fontSize: 16 } }}
          data={Object.keys(locationCounts).map((location) => ({
            name: location,
            symbol: { fill: 'rgba(75,192,192,0.6)' },
          }))}
        />
      </VictoryChart>
    </div>
  );
}

export default ChartComponent;
