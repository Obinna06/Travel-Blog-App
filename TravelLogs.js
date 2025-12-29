import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const TravelLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/travel-logs');
        setLogs(response.data);
      } catch (err) {
        setError('Failed to fetch travel logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/travel-logs/${id}`);
      setLogs(logs.filter(log => log.id !== id));
    } catch (err) {
      setError('Failed to delete travel log');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Travel Logs</h1>
      <Link to="/travel-logs/new" className="btn">Add New Log</Link>
      
      <div className="logs-grid">
        {logs.map(log => (
          <div key={log.id} className="log-card">
            <h3>{log.title}</h3>
            <p>{log.description.substring(0, 100)}...</p>
            <div className="log-dates">
              <span>{new Date(log.start_date).toLocaleDateString()}</span>
              <span> to </span>
              <span>{new Date(log.end_date).toLocaleDateString()}</span>
            </div>
            <div className="log-actions">
              <Link to={`/travel-logs/${log.id}`} className="btn">View</Link>
              <Link to={`/travel-logs/${log.id}/edit`} className="btn">Edit</Link>
              <button onClick={() => handleDelete(log.id)} className="btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelLogs;