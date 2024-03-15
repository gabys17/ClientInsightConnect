import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

/* Import Axios Service */
import patientsService from "../services/patients.service";

function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    patientsService
      .getAllPatients()
      .then((response) => setPatients(response.data))
      .catch((error) => console.log(error));
  }, []);



  return (
    <div className="containerO">
      <Sidebar />

      <Link to="/home">
        <Button change="black">Back</Button>
      </Link>

      <Link to="/patients/create">
        <Button change="blue">Add new patient</Button>
      </Link>

      {patients &&
        patients.map((patient) => (
          <div className="patient-containerO" key={patient.id}>
            <div>
              <div className="patient-infoO" >
                <Link to={`/patients/${patient._id}`}>
                  <div >{patient.full_name}</div>
                </Link>
                <div className="patient-innerInfo">{patient.date_of_birth}</div>
                <div className="patient-innerInfo">{patient.age}</div>
                <div className="patient-innerInfo">{patient.insurance_number}</div>
                <div className="patient-innerInfo">{patient.national_id_number}</div>
                <div className="patient-innerInfo">{patient.pathology_history}</div>
                <div className="patient-innerInfo">{patient.medication_adherence}</div>
                <div className="patient-innerInfo">{patient.consultation}</div>
                <div className="patient-innerInfo">{patient.treatments_recommendations}</div>
                <div className="patient-innerInfo">{patient.possible_diagnose}</div>
              </div>
              <div className="patient-innerInfo">
                {patient.past_consultations.map((consultation, index) => (
                  <div key={index}>
                    {consultation.date} {consultation.consultation_info}{" "}
                    {consultation.treatments_recommendations}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default PatientsList;