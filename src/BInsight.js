import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, Cell
} from 'recharts';
import './BInsight.css';
import binsightImage from './assets/binsight.png'; // Import the image

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Color palette for pie chart
 
function BInsight() {
  const [timeframe, setTimeframe] = useState('daily');
  const [chartType, setChartType] = useState('pie'); // Pie chart for emotion
  const [activityData, setActivityData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [emotionData, setEmotionData] = useState([]);

  // Generate simulated data every 30 seconds
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const res = await fetch('/api/live-data'); // Your backend endpoint
        const data = await res.json();

        setActivityData(data.activity); // [{time, walking, resting, ...}]
        setSleepData([
          { type: 'Deep Sleep', value: data.sleep.deep },
          { type: 'Light Sleep', value: data.sleep.light },
          { type: 'Awake', value: data.sleep.awake }
        ]);
        setEmotionData([
          { type: 'Relaxed', value: data.emotion.relaxed },
          { type: 'Stressed', value: data.emotion.stressed },
          { type: 'Motivated', value: data.emotion.motivated },
          { type: 'Anxious', value: data.emotion.anxious }
        ]);
      } catch (error) {
        console.error("Error fetching live data:", error);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []); // Empty dependency to run only once when the component mounts

  return (
    <div className="binsight-container">
      <h2>Behavioral Insight ({timeframe.toUpperCase()})</h2>

      {/* Adding Image to BInsight */}
      <div className="binsight-image">
        <img src={binsightImage} alt="Behavioral Insights" />
      </div>

      <div className="toggle-buttons">
        <button onClick={() => setTimeframe('daily')} className={timeframe === 'daily' ? 'active' : ''}>Daily</button>
        <button onClick={() => setTimeframe('weekly')} className={timeframe === 'weekly' ? 'active' : ''}>Weekly</button>
      </div>

      {/* 📈 Daily Activity Timeline */}
      <div className="chart-card">
        <h3>📈 Daily Activity Timeline</h3>
        <LineChart width={600} height={300} data={activityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="walking" stroke="#0088FE" />
          <Line type="monotone" dataKey="resting" stroke="#00C49F" />
          <Line type="monotone" dataKey="falling" stroke="#FFBB28" />
          <Line type="monotone" dataKey="exercising" stroke="#FF8042" />
        </LineChart>
      </div>

      {/* 📊 Emotion Distribution (Pie chart) */}
      <div className="chart-card">
        <h3>📊 Emotion Distribution</h3>
        <button onClick={() => setChartType(chartType === 'pie' ? 'radar' : 'pie')}>
          Switch to {chartType === 'pie' ? 'Radar' : 'Pie'}
        </button>
        {chartType === 'pie' ? (
          <PieChart width={400} height={300}>
            <Pie
              data={emotionData}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {emotionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <RadarChart outerRadius={100} width={500} height={300} data={emotionData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="type" />
            <PolarRadiusAxis />
            <Radar name="Emotion" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Tooltip />
            <Legend />
          </RadarChart>
        )}
      </div>

      {/* 🌙 Sleep Summary (Bar chart) */}
      <div className="chart-card">
        <h3>🌙 Sleep Summary</h3>
        <BarChart width={600} height={300} data={sleepData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {sleepData.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
}

export default BInsight;
