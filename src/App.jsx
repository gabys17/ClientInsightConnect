import './App.css'
import { Routes, Route } from 'react-router-dom';
import PatientsListPage from './pages/patientsList';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import PatientDetails from './pages/patientDetails'
import PatientEdit from './pages/patientsEditPage'
import PatientCreate from './pages/patientCreate'
import AgendaList from './pages/agendaList'
import AgendaCreate from './pages/agendaCreate'
import AgendaDetails from './pages/agendaDetails'
import AgendaEdit from './pages/AgendaEditPage'


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patients" element={<PatientsListPage />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/patients/create" element={<PatientCreate />} />
        <Route path="/patients/edit/:id" element={<PatientEdit />} />
        <Route path="/agenda" element={<AgendaList />} />
        <Route path="/agenda/:id" element={<AgendaDetails />} />
        <Route path="/agenda/create" element={<AgendaCreate />} />
        <Route path="/agenda/edit/:id" element={<AgendaEdit />} />

      </Routes>
    </div>
  )
}

export default App
