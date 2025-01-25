import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Home.css';

// Function to get the current greeting based on the time of day
const getCurrentGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return 'GOOD MORNING! 😊';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'GOOD AFTERNOON! 😊';
  } else if (currentHour >= 17 && currentHour < 21) {
    return 'GOOD EVENING! 😊';
  } else {
    return 'GOOD NIGHT! 😊';
  }
};

const Home = () => {
  // Chart data
  const [data] = useState([
    { name: 'Registered Students', value: 40.5 },
    { name: 'Placed Students', value: 35.0 },
    { name: 'Not Placed Students', value: 18.2 },
    { name: 'NIP', value: 6.3 },
  ]);

  return (
    <div className="home">
      <h1>{getCurrentGreeting()}</h1>
      <div className="chart-container">
        <h2>Students Activities</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4CAF50" stopOpacity={1} />
                <stop offset="100%" stopColor="#81C784" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tick={{ fill: '#000' }} /> {/* Specify default props explicitly */}
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="url(#gradient)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
