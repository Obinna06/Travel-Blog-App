import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Navbar() {
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Travel Blog</Link>
      </div>
      <div className="navbar-links">
        <Link to="/travel-logs">Travel Logs</Link>
        <Link to="/journey-plans">Journey Plans</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}