import React, { useEffect, useState } from 'react';

const EditableSalaryChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState({ label: '', bad: '', moderate: '', good: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/chart-data');
      const json = await response.json();
      if (response.ok) {
        setChartData(json.data);
      } else {
        console.error('Failed to fetch chart data:', json.error);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    if (id === 'new') {
      setNewData(prev => ({ ...prev, [name]: value }));
    } else {
      setChartData(prev =>
        prev.map(item =>
          item.id === id ? { ...item, [name]: name === 'label' ? value : parseFloat(value) || 0 } : item
        )
      );
    }
  };

  const handleSave = async (id) => {
    const dataToSave = id === 'new' ? newData : chartData.find(item => item.id === id);
    if (!dataToSave.label) {
      setMessage('Label is required.');
      return;
    }
    try {
      const response = await fetch(
        id === 'new' ? 'http://127.0.0.1:5000/chart-data' : `http://127.0.0.1:5000/chart-data/${id}`,
        {
          method: id === 'new' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            label: dataToSave.label,
            bad: parseFloat(dataToSave.bad) || 0,
            moderate: parseFloat(dataToSave.moderate) || 0,
            good: parseFloat(dataToSave.good) || 0,
          }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMessage('Data saved successfully.');
        setNewData({ label: '', bad: '', moderate: '', good: '' });
        fetchChartData();
      } else {
        setMessage(result.error || 'Failed to save data.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/chart-data/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Data deleted successfully.');
        fetchChartData();
      } else {
        const result = await response.json();
        setMessage(result.error || 'Failed to delete data.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Edit Salary Chart Data</h3>
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
      <table className="w-full border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Label</th>
            <th className="border px-2 py-1">Bad</th>
            <th className="border px-2 py-1">Moderate</th>
            <th className="border px-2 py-1">Good</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chartData.map(item => (
            <tr key={item.id}>
              <td className="border px-2 py-1">
                <input
                  type="text"
                  name="label"
                  value={item.label}
                  onChange={e => handleInputChange(e, item.id)}
                  className="w-full border rounded px-1 py-0.5"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  name="bad"
                  value={item.bad}
                  onChange={e => handleInputChange(e, item.id)}
                  className="w-full border rounded px-1 py-0.5"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  name="moderate"
                  value={item.moderate}
                  onChange={e => handleInputChange(e, item.id)}
                  className="w-full border rounded px-1 py-0.5"
                />
              </td>
              <td className="border px-2 py-1">
                <input
                  type="number"
                  name="good"
                  value={item.good}
                  onChange={e => handleInputChange(e, item.id)}
                  className="w-full border rounded px-1 py-0.5"
                />
              </td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => handleSave(item.id)}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="border px-2 py-1">
              <input
                type="text"
                name="label"
                value={newData.label}
                onChange={e => handleInputChange(e, 'new')}
                placeholder="New label"
                className="w-full border rounded px-1 py-0.5"
              />
            </td>
            <td className="border px-2 py-1">
              <input
                type="number"
                name="bad"
                value={newData.bad}
                onChange={e => handleInputChange(e, 'new')}
                placeholder="Bad"
                className="w-full border rounded px-1 py-0.5"
              />
            </td>
            <td className="border px-2 py-1">
              <input
                type="number"
                name="moderate"
                value={newData.moderate}
                onChange={e => handleInputChange(e, 'new')}
                placeholder="Moderate"
                className="w-full border rounded px-1 py-0.5"
              />
            </td>
            <td className="border px-2 py-1">
              <input
                type="number"
                name="good"
                value={newData.good}
                onChange={e => handleInputChange(e, 'new')}
                placeholder="Good"
                className="w-full border rounded px-1 py-0.5"
              />
            </td>
            <td className="border px-2 py-1">
              <button
                onClick={() => handleSave('new')}
                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditableSalaryChart;
