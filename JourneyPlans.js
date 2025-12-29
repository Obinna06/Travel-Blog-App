import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function JourneyPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/journey-plans');
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="journey-plans">
      <div className="header">
        <h2>My Journey Plans</h2>
        <Link to="/journey-plans/new" className="new-plan-btn">+ New Plan</Link>
      </div>
      <div className="plans-grid">
        {plans.map(plan => (
          <div key={plan.id} className="plan-card">
            <Link to={`/journey-plans/${plan.id}`}>
              <h3>{plan.name}</h3>
              <div className="plan-dates">
                {new Date(plan.start_date).toLocaleDateString()} - {new Date(plan.end_date).toLocaleDateString()}
              </div>
              <div className="plan-locations">
                {plan.locations.slice(0, 3).map(location => (
                  <span key={location} className="location-tag">{location}</span>
                ))}
                {plan.locations.length > 3 && <span>+{plan.locations.length - 3} more</span>}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}