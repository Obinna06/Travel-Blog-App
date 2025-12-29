import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import TravelLogForm from '../components/TravelLogForm';

export default function TravelLogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const response = await api.get(`/travel-logs/${id}`);
        setLog(response.data);
      } catch (error) {
        console.error('Error fetching log:', error);
        navigate('/travel-logs');
      }
    };
    fetchLog();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await api.delete(`/travel-logs/${id}`);
      navigate('/travel-logs');
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    navigate('/travel-logs');
  };

  if (!log) return <div>Loading...</div>;

  return (
    <div className="log-detail">
      {editMode ? (
        <TravelLogForm log={log} onSave={handleSave} />
      ) : (
        <>
          <div className="log-header">
            <h2>{log.title}</h2>
            <div className="log-dates">
              {new Date(log.start_date).toLocaleDateString()} - {new Date(log.end_date).toLocaleDateString()}
            </div>
          </div>
          <p className="log-description">{log.description}</p>
          {log.tags && log.tags.length > 0 && (
            <div className="log-tags">
              {log.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <div className="log-actions">
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        </>
      )}
    </div>
  );
}