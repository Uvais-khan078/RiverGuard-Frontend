import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const SalaryChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/chart-data');
        const json = await response.json();
        if (response.ok) {
          const labels = json.data.map(item => item.label);
          const badData = json.data.map(item => item.bad);
          const moderateData = json.data.map(item => item.moderate);
          const goodData = json.data.map(item => item.good);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Bad',
                data: badData,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              },
              {
                label: 'Moderate',
                data: moderateData,
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              },
              {
                label: 'Good',
                data: goodData,
                backgroundColor: 'rgba(255, 206, 86, 0.8)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
              }
            ]
          });
          setLoading(false);
        } else {
          console.error('Failed to fetch chart data:', json.error);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };

    fetchChartData();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!loading && chartRef.current && chartData) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } else {
        console.error('Failed to get 2D context from canvas');
      }
    }
  }, [loading, chartData]);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="w-4/5 max-w-3xl bg-white p-5 rounded-lg shadow-md mx-auto">
      <canvas ref={chartRef} />
    </div>
  );
};

export default SalaryChart;
