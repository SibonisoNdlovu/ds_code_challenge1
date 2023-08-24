import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './LineChartComponent.css'; // Import your CSS file for styling

const LineChartComponent = ({ data }) => {
  // Group the data by location and date
  const groupedData = data.reduce((acc, entry) => {
    const location = entry.Location;
    const date = new Date(entry.OpeningDate).toLocaleDateString(); // Convert opening date to a readable date format

    if (!acc[location]) {
      acc[location] = {};
    }

    if (!acc[location][date]) {
      acc[location][date] = 0;
    }

    acc[location][date]++;

    return acc;
  }, {});

  // Convert the grouped data into an array of objects for Recharts
  const chartData = Object.entries(groupedData).map(([location, counts]) => ({
    location,
    ...counts,
  }));

  return (
    <div className="line-chart-container">
      <h2>Complaints Over Time by Location</h2>
{/* 
      <LineChart width={600} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        
        {Object?.keys(chartData[0])
          .filter((key) => key !== 'date')
          .map((location) => (
            <Line
              key={location}
              type="monotone"
              dataKey={location}
              name={location}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each location
            />
          ))}
      </LineChart> */}
    </div>
  );
};

export default LineChartComponent;
