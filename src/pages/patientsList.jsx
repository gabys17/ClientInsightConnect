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


  return (
    <div>
      <Link to="/home">
        <Button change="black">Back</Button>
      </Link>
  
      {patients &&
        patients.map((patient) => (
          <div className="patient-container" key={patient.id}>
            <div className="StudentListPage">
              <div className="flex justify-between items-center p-2 font-bold border-b" >
                <Link  to={`/patients/${patient._id}`}>
                  <span style={{ flexBasis: "20%" }}>{patient.full_name}</span>
                </Link>
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
        ))}
    </div>
  );
}

export default PatientsList;