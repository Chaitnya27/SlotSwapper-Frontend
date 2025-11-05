import './index.css'
import './App.css'
import SignUp from './components/SignUp'
import { Route, Routes,Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Layout from './design/Layout'
import Home from './components/Home'
import Eventlist from './components/EventList'
import Edittask from './components/EditTask'
import Marketplace from './components/Marketplace.jsx'
import Outgoingrequests from './components/Outgoingrequests.jsx'
import Incomingrequests from './components/IncomingRequests.jsx'



function App() {
 const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token'); // or localStorage
  return token ? children : <Navigate to="/login" replace />;
};

  return (
    <>
    <Routes>
      <Route element={<Layout/>}>
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route 
      path='/dashboard'
      element={
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
      }
       />

       <Route
        path="/events" 
        element={
        <ProtectedRoute>
          <Eventlist/>
          </ProtectedRoute>
        } />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <Edittask />
            </ProtectedRoute>
          }/>

           <Route
      path="/marketplace"
      element={
        <ProtectedRoute>
          <Marketplace />
        </ProtectedRoute>
      }
    />

          <Route
      path="/swap/incoming"
      element={
        <ProtectedRoute>
          <Incomingrequests />
        </ProtectedRoute>
      }
    />
    <Route
      path="/swap/outgoing"
      element={
        <ProtectedRoute>
          <Outgoingrequests />
        </ProtectedRoute>
      }
    />

        
        <Route path="/" element={<Navigate to="/login" />} />
        </Route>
   
    </Routes>
     
    </>
  )
}

export default App
