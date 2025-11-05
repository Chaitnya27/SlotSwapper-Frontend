import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function IncomingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    axios.get('http://localhost:5000/api/swaps/incoming', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setRequests(res.data));
  }, []);

  const respondToRequest = async (id, decision) => {
    const token = sessionStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/swaps/${id}`, { status: decision }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRequests(requests.filter(req => req._id !== id));
  };

  return (
    <div className="min-h-screen mx-auto p-4 bg-blue-100 flex justify-center items-center flex-col">
      <h2 className="text-2xl font-semibold mb-4">Incoming Swap Requests</h2>
      {requests.length === 0 && <div>No requests</div>}
      {requests.map(req => (
        <div key={req._id} className="border p-4 mb-4 rounded shadow">
          <div><strong>From:</strong> {req.fromUserId.name} ({req.fromUserId.email})</div>
          <div><strong>Event:</strong> {req.eventId.title}</div>
          <button
            onClick={() => respondToRequest(req._id, 'accepted')}
            className="mr-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Accept
          </button>
          <button
            onClick={() => respondToRequest(req._id, 'rejected')}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}
