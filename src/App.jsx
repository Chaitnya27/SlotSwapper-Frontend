import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';

import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './design/Layout';
import Home from './components/Home';
import EventList from './components/EventList';
import EditTask from './components/EditTask';
import MarketPlace from './components/MarketPlace';
import OutgoingRequests from './components/OutgoingRequests';
import IncomingRequests from './components/IncomingRequests';
import NotFound from './components/NotFound';

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/events'
          element={
            <ProtectedRoute>
              <EventList />
            </ProtectedRoute>
          }
        />

        <Route
          path='/edit/:id'
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />

        <Route
          path='/marketplace'
          element={
            <ProtectedRoute>
              <MarketPlace />
            </ProtectedRoute>
          }
        />

        <Route
          path='/swap/incoming'
          element={
            <ProtectedRoute>
              <IncomingRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path='/swap/outgoing'
          element={
            <ProtectedRoute>
              <OutgoingRequests />
            </ProtectedRoute>
          }
        />

        <Route path='/' element={<Navigate to='/home' />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
