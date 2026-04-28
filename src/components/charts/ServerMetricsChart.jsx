import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../../config/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function ServerMetricsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/charts/bar-data`);
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch server metrics from backend API', err);
        setError('Could not connect to the backend API. Check the Railway backend URL or local server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="h-64 flex items-center justify-center text-gray-500">Loading metrics...</div>;
  }

  if (error) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-red-500 text-sm p-4 text-center">
        <p>{error}</p>
        <p className="mt-2 text-gray-500">Showing mock data instead:</p>
        <div className="mt-4 w-full h-40 opacity-50">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { label: 'Port 80', value: 120.0 },
              { label: 'Port 443', value: 450.0 },
              { label: 'Port 8080', value: 300.0 },
              { label: 'Port 3306', value: 80.0 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} fontSize={12} dy={10} />
          <YAxis axisLine={false} tickLine={false} fontSize={12} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            cursor={{ fill: '#f3f4f6' }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
