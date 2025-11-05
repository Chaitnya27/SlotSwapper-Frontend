import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditTask() {
   const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
     title: '',
      startTime: '',
    endTime: '',
    status:'busy',
    });

  useEffect(() => {
    const fetchTask = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const res = await axios.get(`https://slotswapper-backend-gmuu.onrender.com/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ev = res.data;
        setForm({
          title: ev.title,
          startTime: new Date(ev.startTime).toISOString().slice(0, 16),
          endTime: new Date(ev.endTime).toISOString().slice(0, 16),
        });
      } catch (err) {
        alert('Failed to fetch event');
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    try {
      await axios.put(`https://slotswapper-backend-gmuu.onrender.com/api/events/${id}`, {
        title: form.title,
        startTime: new Date(form.startTime).toISOString(),
        endTime: new Date(form.endTime).toISOString(),
        status: form.status,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Event updated successfully');
      navigate('/events'); // or the dashboard route
    } catch (err) {
      alert('Failed to update event');
    }
  };

  return (
    
    <div className='bg-blue-100 min-h-screen flex justify-center items-start'>
  <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-2xl mt-10">
    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Event</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium text-gray-700">Event Title</label>
        <input
        name='title'
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter event title"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Start Time</label>
        <input
        name='startTime'
          type="datetime-local"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">End Time</label>
        <input
        name='endTime'
          type="datetime-local"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        className="w-full bg-blue-600
         hover:bg-blue-700 text-white font-semibold py-3 
         rounded-lg shadow-md transition duration-200 hover:cursor-pointer"
      >
        Update Event
      </button>
    </form>
  </div>
   </div>
    
);

};
