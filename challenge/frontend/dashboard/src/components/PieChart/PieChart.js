import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';
import './PieChart.css';

// Legend component
function PieLegend({ data, colorScale }) {
  return (
    <div className="legend-container">
      <h3>Legend</h3>
      <ul>
        {data.map((datum, index) => (
          <li key={index}>
            <span className="legend-color" style={{ backgroundColor: colorScale[index] }}></span>
            {datum.x} - {datum.y} ({datum.percent.toFixed(2)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}

function PieChartComponent({ data }) {
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

  // Prepare data for the pie chart
  const pieData = Object.keys(locationCounts).map(location => ({
    x: location,
    y: locationCounts[location],
  }));

  // Calculate the total count of complaints
  const totalCount = filteredData.length;

    // Generate colors for the pie chart, setting red for the most complaints and green for the least
    const generateColors = (numColors) => {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const hue = (360 / numColors) * i;
        colors.push(`hsl(${hue}, 70%, 50%)`);
      }
      return colors;
    };

  // Check if the data is empty before generating colors
  const areaColors = pieData.length > 0 ? generateColors(pieData.length) : [];

  // Calculate percentages for each data point
  pieData.forEach(datum => {
    datum.percent = (datum.y / totalCount) * 100;
  });

  // Sort the pieData array by percentage in descending order
  pieData.sort((a, b) => b.percent - a.percent);

  return (
    <div className="chart-container">
      <h2>Complaints by Location</h2>
      <select onChange={(e) => setSelectedLocation(e.target.value)}>
        <option value="">All Locations</option>
        {Array.from(new Set(data.map(entry => entry.Location))).map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <div className="pie-chart-container">
        <VictoryPie
          data={pieData}
          colorScale={areaColors}
          labels={({ datum }) => `${datum.x}: ${datum.y} (${datum.percent.toFixed(2)}%)`}
          labelComponent={
            <VictoryTooltip
              style={{ fontSize: 10 }}
              cornerRadius={5}
              flyoutStyle={{ fill: 'white', stroke: 'gray', strokeWidth: 0.5 }}
            />
          }
          width={400}
          height={300}
        />
        <PieLegend data={pieData} colorScale={areaColors} />
      </div>
    </div>
  );
}

export default PieChartComponent;
