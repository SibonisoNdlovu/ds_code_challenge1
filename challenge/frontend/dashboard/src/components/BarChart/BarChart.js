import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLegend } from 'victory';

function ChartComponent({ data }) {
  const [selectedSuburb, setSelectedSuburb] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Update the filtered data when the selected suburb changes
  useEffect(() => {
    if (selectedSuburb === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(entry => entry.Location === selectedSuburb);
      setFilteredData(filtered);
    }
  }, [selectedSuburb, data]);

  // Group the filtered data by suburb and count complaints
  const suburbCounts = filteredData.reduce((counts, entry) => {
    const suburb = entry.Location;
    if (!counts[suburb]) {
      counts[suburb] = 0;
    }
    counts[suburb]++;
    return counts;
  }, {});

  // Prepare data for the bar chart
  const chartData = Object.keys(suburbCounts).map(suburb => ({
    suburb,
    count: suburbCounts[suburb],
  }));

  return (
    <div className="chart-container">
      <h2>Complaints by Suburb (Bar Chart)</h2>
      <select onChange={(e) => setSelectedSuburb(e.target.value)}>
        <option value="">All Suburbs</option>
        {Array.from(new Set(data.map(entry => entry.Location))).map((suburb) => (
          <option key={suburb} value={suburb}>
            {suburb}
          </option>
        ))}
      </select>
      <VictoryChart width={1500} height={600}>
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => tick}
          label="Number of Complaints"
        />
        <VictoryAxis
          tickFormat={(tick) => tick}
          label="Suburb"
        />
        <VictoryBar
          data={chartData}
          x="suburb"
          y="count"
          style={{ data: { fill: 'rgba(75,192,192,0.6)' } }}
        />
        <VictoryLegend
          x={300}
          y={30}
          title="Suburbs"
          centerTitle
          orientation="horizontal"
          gutter={20}
          style={{ title: { fontSize: 16 } }}
          data={Object.keys(suburbCounts).map((suburb) => ({
            name: suburb,
            symbol: { fill: 'rgba(75,192,192,0.6)' },
          }))}
        />
      </VictoryChart>
    </div>
  );
}

export default ChartComponent;
