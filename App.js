import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import TravelLogs from './pages/TravelLogs/TravelLogs';
import TravelLogDetail from './pages/TravelLogs/TravelLogDetail';
import JourneyPlans from './pages/JourneyPlans/JourneyPlans';
import JourneyPlanDetail from './pages/JourneyPlans/JourneyPlanDetail';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/travel-logs" element={<PrivateRoute><TravelLogs /></PrivateRoute>} />
          <Route path="/travel-logs/:id" element={<PrivateRoute><TravelLogDetail /></PrivateRoute>} />
          <Route path="/journey-plans" element={<PrivateRoute><JourneyPlans /></PrivateRoute>} />
          <Route path="/journey-plans/:id" element={<PrivateRoute><JourneyPlanDetail /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><TravelLogs /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;