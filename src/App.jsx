import './App.css'
import { Routes, Route } from 'react-router-dom';
import PatientsListPage from './pages/patientsList';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Agenda from './pages/Agenda';
import HomePage from './pages/HomePage';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/patients" element={<PatientsListPage />}/>
        <Route path="/agenda" element={<Agenda />}/>
      </Routes>
    </div>
  )
}

export default App
