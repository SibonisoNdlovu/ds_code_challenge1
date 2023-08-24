import React, { useState, useEffect } from 'react';
import { VictoryPie } from 'victory';

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
  const totalCount = pieData.reduce((total, entry) => total + entry.y, 0);

  // Generate a unique color for each area dynamically
  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = (360 / numColors) * i;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const areaColors = generateColors(pieData.length);

  return (
    <div className="chart-container">
      <h2>Complaints by Location (Pie Chart)</h2>
      <select onChange={(e) => setSelectedLocation(e.target.value)}>
        <option value="">All Locations</option>
        {Array.from(new Set(data.map(entry => entry.Location))).map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
      <VictoryPie
        data={pieData}
        colorScale={areaColors}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        style={{ labels: { fontSize: 6, fill: 'black' } }}
        width={400}
        height={300}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: 'data',
                    mutation: (props) => {
                      return { style: { fill: 'lightgray' } };
                    },
                  },
                ];
              },
              onMouseOut: () => {
                return [
                  {
                    target: 'data',
                    mutation: () => {},
                  },
                ];
              },
            },
          },
        ]}
      />
    </div>
  );
}

export default PieChartComponent;
