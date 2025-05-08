import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const pollutionDataInitial = {
  rivers: [
    { name: "Ganga", data: [{ year: 2020, level: 35 }, { year: 2021, level: 45 }, { year: 2022, level: 60 }, { year: 2023, level: 55 }, { year: 2024, level: 40 }, { year: 2025, level: 42 }] },
    { name: "Yamuna", data: [{ year: 2020, level: 65 }, { year: 2021, level: 70 }, { year: 2022, level: 80 }, { year: 2023, level: 75 }, { year: 2024, level: 68 }, { year: 2025, level: 72 }] },
    { name: "Narmada", data: [{ year: 2020, level: 20 }, { year: 2021, level: 25 }, { year: 2022, level: 30 }, { year: 2023, level: 28 }, { year: 2024, level: 22 }, { year: 2025, level: 26 }] }
  ],
  threshold: 50 // Example threshold for red zone
};

const PollutionChart = () => {
  const chartRef = useRef(null);
  const [pollutionData, setPollutionData] = useState(pollutionDataInitial);
  const [selectedRiver, setSelectedRiver] = useState(pollutionDataInitial.rivers[0].name);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    updateChart(selectedRiver);

    const interval = setInterval(() => {
      setPollutionData(prevData => {
        const newRivers = prevData.rivers.map(river => {
          const lastDataPoint = river.data[river.data.length - 1];
          const change = (Math.random() - 0.5) * 10;
          const newLevel = Math.max(0, lastDataPoint.level + change);
          const newYear = lastDataPoint.year + 1;
          const newData = [...river.data, { year: newYear, level: newLevel }];
          return {
            ...river,
            data: newData.slice(-6)
          };
        });
        return { ...prevData, rivers: newRivers };
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateChart(selectedRiver);
  }, [pollutionData, selectedRiver]);

  const updateChart = (riverName) => {
    const riverData = pollutionData.rivers.find(river => river.name === riverName);
    if (!riverData) return;

    const years = riverData.data.map(item => item.year);
    const levels = riverData.data.map(item => item.level);

    const isRedZone = levels[levels.length - 1] > pollutionData.threshold;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: `${riverName} Pollution Level`,
          data: levels,
          borderColor: isRedZone ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)',
          backgroundColor: isRedZone ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: isRedZone ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Pollution Level (Arbitrary Units)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: `Pollution Trend for ${riverName}`,
            font: {
              size: 16
            }
          },
          legend: {
            display: true
          }
        }
      }
    });
  };

  const currentLevel = pollutionData.rivers.find(r => r.name === selectedRiver).data.slice(-1)[0].level;
  const isRedZone = currentLevel > pollutionData.threshold;

  return (
    <div className="font-sans m-5">
      <h1>River Pollution Levels Over Time</h1>
      <div id="chart-container" className="w-4/5 mx-auto my-5 border border-gray-300 p-4">
        <canvas id="pollutionChart" ref={chartRef}></canvas>
      </div>
      <div id="zone-indicator" className={`mt-2 font-bold ${isRedZone ? 'text-red-600' : 'text-green-600'}`}>
        Current Zone ({selectedRiver}): {isRedZone ? 'Red Zone (Pollution Level High)' : 'Green Zone (Pollution Level Acceptable)'}
      </div>
      <div className="mt-4">
        <label htmlFor="river-select" className="mr-2 font-semibold">Select River:</label>
        <select id="river-select" value={selectedRiver} onChange={e => setSelectedRiver(e.target.value)} className="border rounded p-1">
          {pollutionData.rivers.map(river => (
            <option key={river.name} value={river.name}>{river.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PollutionChart;
