import './App.css'
import { Routes, Route } from 'react-router-dom';
import PatientsListPage from './pages/patientsList';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/"/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/patients" element={<PatientsListPage />}/>
        <Route path="/agenda"/>
      </Routes>
    </div>
  )
}

export default App
