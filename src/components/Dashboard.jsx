import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [form, setForm] = useState({ title: '', startTime: '', endTime: '',status:'busy' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    await axios.post('https://slow-swaaper-backend.vercel.app/api/events', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate('/events'); // redirect to event list page
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <div className=" max-w-md w-full bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Event Title */}
          <div>
            <label className="block font-semibold mb-1">Event Title</label>
            <input
              type="text"
              name='title'
              placeholder="Enter event name"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Start Date */}
          
            <div className="flex-1">
            <label className="block font-semibold mb-1">Start Date</label>
            <input
            name='startTime'
            type="datetime-local"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
             required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block font-semibold mb-1">End Time</label>
            <input
            name='endTime'
              type="datetime-local"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <select
             name="status"
             value={form.status || 'busy'} 
             onChange={(e)=> setForm({...form,status:e.target.value })}
             className='w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300'
             >
              <option value="busy">Busy</option>
                <option value="swappable">Swappable</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded
             hover:bg-blue-700 transition hover:cursor-pointer"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}
