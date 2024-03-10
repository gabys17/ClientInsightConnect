import { useState, useEffect } from "react";
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

  return (
    <div>
      {patients &&
        patients.map((patient) => {
          return (
            <div key={patient.id} className="patient-container">
              <h3>{patient.full_name}</h3>
              <h3>{patient.date_of_birth}</h3>
              <h3>{patient.age}</h3>
              <h3>{patient.insurance_number}</h3>
              <h3>{patient.national_id_number}</h3>
              <h3>{patient.pathology_history}</h3>
              <h3>{patient.medication_adherence}</h3>
              <h3>{patient.consultation}</h3>
              <h3>{patient.treatments_recommendations}</h3>
              <h3>{patient.possible_diagnose}</h3>
              <h3>
                {patient.past_consultations.map((consultation, index) => (
                  <span key={index}>
                    {consultation.date} {consultation.consultation_info}{" "}
                    {consultation.treatments_recommendations}
                  </span>
                ))}
              </h3>
              <div>
                <Button change="red">Delete</Button>
                <Button change="green">Save</Button>
                <Button change="blue">Update</Button>
                <Button change="black">Back</Button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default PatientsList;
