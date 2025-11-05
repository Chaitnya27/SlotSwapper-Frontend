import React from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('https://slow-swaaper-backend.vercel.app/api/auth/login', formData);
      

      sessionStorage.setItem('token', res.data.token);
      alert("Login Sucessfully");
      setMessage('Login successful!');
      navigate('/dashboard');
     
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred during login');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-10">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Log In</h2>
        {message && (
          <p className={`mb-4 text-center ${message === 'Login successful!' ? 'text-green-600' : 'text-red-600'}`}>
             {message}
           </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition hover:cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}
