import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";


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

  const handleDelete = (patientId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this patient?");
    
    if (isConfirmed) {
      patientsService
        .deletePatient(patientId)
        .then((response) => {
          // Handle success, maybe update the state or UI accordingly
          console.log("Patient deleted successfully");
          // You might want to fetch the updated patient list here
        })
        .catch((error) => console.log(error));
    }
  };

  const handleSave = (patientId) => {
    // Add logic for saving a patient
    console.log("Save button clicked for patient ID:", patientId);
  };

  const handleUpdate = (patientId) => {
    // Add logic for updating a patient
    console.log("Update button clicked for patient ID:", patientId);
  };

  return (
    <div>
      <Link to="/home">
        <Button change="black">Back</Button>
      </Link>

      {patients &&
        patients.map((patient) => (
          <Link key={patient.id} to={`/patients/${patient._id}`}>
            <div className="patient-container">
              <div className="StudentListPage">
                <div className="flex justify-between items-center p-2 font-bold border-b">
                  <span style={{ flexBasis: "20%" }}>{patient.full_name}</span>
                  <span style={{ flexBasis: "5%" }}>{patient.date_of_birth}</span>
                  <span style={{ flexBasis: "5%" }}>{patient.age}</span>
                  <span style={{ flexBasis: "5%" }}>{patient.insurance_number}</span>
                  <span style={{ flexBasis: "5%" }}>{patient.national_id_number}</span>
                  <span style={{ flexBasis: "10%" }}>{patient.pathology_history}</span>
                  <span style={{ flexBasis: "10%" }}>{patient.medication_adherence}</span>
                  <span style={{ flexBasis: "10%" }}>{patient.consultation}</span>
                  <span style={{ flexBasis: "10%" }}>{patient.treatments_recommendations}</span>
                  <span style={{ flexBasis: "10%" }}>{patient.possible_diagnose}</span>
                </div>
                <span style={{ flexBasis: "30%" }}>
                  {patient.past_consultations.map((consultation, index) => (
                    <span key={index}>
                      {consultation.date} {consultation.consultation_info}{" "}
                      {consultation.treatments_recommendations}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default PatientsList;