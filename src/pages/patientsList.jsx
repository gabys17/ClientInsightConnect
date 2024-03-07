import { useState, useEffect } from "react";
import axios from "axios";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = "http://localhost:5005";

function PatientsListPage() {
  const [patients, setPatients] = useState([]);

  const getAllPatients = () => {
    axios
      .get(`${API_URL}/patients`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <div className="PatientsListPage">
      {patients &&
        patients.map((patient) => {
          return (
            <div key={patient.id}>
              <div className="cardAdoption" >
                <div className="cardsText">
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
                    <h3>{patient.past_consultations}</h3>
                  </div>
              </div>
            </div>
          );
        })}
        </div>
  );
}

export default PatientsListPage;