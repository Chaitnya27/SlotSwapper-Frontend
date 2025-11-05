import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    
    axios
      .get('https://slotswapper-backend-gmuu.onrender.com/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`https://slotswapper-backend-gmuu.onrender.com/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event._id !== id)); // remove from UI
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Error deleting event. Try again.');
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">My Events</h2>

        

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
          events.map((ev) => (
            <div
              key={ev._id}
              className="mb-4 p-4 border rounded-lg bg-gray-100 shadow-sm"
            >
                <div>
              <h3 className="font-semibold text-lg mb-2">{ev.title}</h3>
              <p>Start Time: {new Date(ev.startTime).toLocaleString()}</p>
              <p>End Time: {new Date(ev.endTime).toLocaleString()}</p>
              <p>Status :{ev.status}</p>
            </div>
            <div className=' flex gap-10'>
                <button
                onClick={() => navigate(`/edit/${ev._id}`)}
                className="bg-green-500 hover:bg-green-600 px-3 py-1 
                rounded  hover:cursor-pointer"
            >
            Edit
            </button>

             <button
                onClick={() => handleDelete(ev._id)}
                className="bg-red-500 hover:bg-red-600
                 text-white py-1 px-3 rounded  hover:cursor-pointer "
              >
                Delete
              </button>

            </div>
            

            </div>
              
            
          ))
        )}
      </div>
    </div>
  );
}
