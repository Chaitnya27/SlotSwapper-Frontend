import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OutgoingRequests() {
   const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:5000/api/swaps/outgoing', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setRequests(res.data));
  }, []);

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center p-4 bg-blue-100">
      <h2 className="text-2xl font-semibold mb-4">Outgoing Swap Requests</h2>
      {requests.length === 0 && <div>No requests sent</div>}
      {requests.map(req => (
        <div key={req._id} className="border p-4 mb-4 rounded shadow">
          <div><strong>To:</strong> {req.toUserId.name} ({req.toUserId.email})</div>
          <div><strong>Event:</strong> {req.eventId.title}</div>
          <div><strong>Status:</strong> {req.status}</div>
        </div>
      ))}
    </div>
  );
};

