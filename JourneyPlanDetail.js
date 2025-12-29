import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function JourneyPlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await api.get(`/journey-plans/${id}`);
        setPlan(response.data);
      } catch (error) {
        console.error('Error fetching plan:', error);
        navigate('/journey-plans');
      }
    };
    fetchPlan();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await api.delete(`/journey-plans/${id}`);
      navigate('/journey-plans');
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  if (!plan) return <div>Loading...</div>;

  return (
    <div className="plan-detail">
      <div className="plan-header">
        <h2>{plan.name}</h2>
        <div className="plan-dates">
          {new Date(plan.start_date).toLocaleDateString()} - {new Date(plan.end_date).toLocaleDateString()}
        </div>
      </div>
      
      <div className="plan-section">
        <h3>Locations</h3>
        <ul className="locations-list">
          {plan.locations.map(location => (
            <li key={location}>{location}</li>
          ))}
        </ul>
      </div>

      <div className="plan-section">
        <h3>Activities</h3>
        <ul className="activities-list">
          {plan.activities.map(activity => (
            <li key={activity}>{activity}</li>
          ))}
        </ul>
      </div>

      {plan.description && (
        <div className="plan-section">
          <h3>Description</h3>
          <p>{plan.description}</p>
        </div>
      )}

      <div className="plan-actions">
        <button onClick={() => navigate(`/journey-plans/${id}/edit`)}>Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}