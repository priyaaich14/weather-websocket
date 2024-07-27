import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css'; // Make sure you have App.css for styling

export default function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000')

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(currentData => [...currentData, message])
    }

    return () => ws.close()
  }, [])

  return (
    <div className="app-container">
      <h1>Sensor Data</h1>
      <div className="timestamp">Current Time: {data.length > 0 ? data[data.length - 1].timestamp : 'Loading...'}</div>
      <div className="data-labels">
        <span className="label humidity-label">Humidity &#x1F4A7;</span>
        <span className="label temperature-label">Temperature &#x1F321;</span>
      </div>
      <div className="charts-container">
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </LineChart>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="temperature" fill="#8884d8" />
          <Bar dataKey="humidity" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  )
}


