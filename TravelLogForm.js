import React, { useState } from 'react';
import api from '../services/api';

const TravelLogForm = ({ log, onSave }) => {
  const [form, setForm] = useState({
    title: log?.title || '',
    description: log?.description || '',
    start_date: log?.start_date || '',
    end_date: log?.end_date || '',
    tags: log?.tags?.join(', ') || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = form.tags.split(',').map(tag => tag.trim());
      const data = {
        ...form,
        tags: tagsArray
      };

      if (log?.id) {
        await api.put(`/travel-logs/${log.id}`, data);
      } else {
        await api.post('/travel-logs', data);
      }
      onSave();
    } catch (error) {
      console.error('Error saving log:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="travel-log-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({...form, title: e.target.value})}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => setForm({...form, start_date: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => setForm({...form, end_date: e.target.value})}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Tags (comma separated)</label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => setForm({...form, tags: e.target.value})}
        />
      </div>
      <button type="submit" className="save-btn">
        {log?.id ? 'Update' : 'Create'} Log
      </button>
    </form>
  );
};

export default TravelLogForm;