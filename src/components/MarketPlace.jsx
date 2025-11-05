import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Marketplace() {
const [slots, setSlots] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:5000/api/marketplace', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setSlots(res.data));
  }, []);

  const handleRequestSwap = async (eventId, ownerId) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/swaps', { eventId, toUserId: ownerId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Swap request sent!');
    } catch {
      alert('Swap request failed');
    }
  };

  return (
   <div className="min-h-screen mx-auto p-4 bg-blue-100 flex flex-col items-center">
  <h2 className="text-2xl font-semibold mb-4">Swap Zone - Swappable Slots</h2>
  {slots.map(slot => (
    <div
      key={slot._id}
      className="border p-4 mb-4 rounded shadow min-h-[220px] flex flex-col justify-between w-full max-w-md"
    >
      <div>
        <div><strong>Title:</strong> {slot.title}</div>
        <div><strong>Owner:</strong> {slot.userId.name} ({slot.userId.email})</div>
        <div><strong>Start:</strong> {new Date(slot.startTime).toLocaleString()}</div>
        <div><strong>End:</strong> {new Date(slot.endTime).toLocaleString()}</div>
      </div>
      <button
        onClick={() => handleRequestSwap(slot._id, slot.userId._id)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:cursor-pointer"
      >
        Request Swap
      </button>
    </div>
  ))}
</div>


  );
}
