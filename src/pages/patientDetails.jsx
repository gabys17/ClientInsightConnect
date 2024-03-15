import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import patientsService from "../services/patients.service";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getPatient = () => {
    axios
      .get(`${API_URL}/api/patients/${id}`)
      .then((response) => {
        const onePatient = response.data;
        setPatient(onePatient);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    patientsService.getPatient(id).then((response) => {
      setPatient(response.data);
      setLoading(false);
      console.log(response)
    })
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="containera ">
      <Link to="/patients">
        <Button change="black">Back</Button>
      </Link>
      <div>
        {patient && (
          <>
            <p>
              <strong>Name:</strong>{patient.full_name}
            </p>
            <div>
              <p>
                <strong>Birth-date:</strong> {patient.date_of_birth}
              </p>
              <p>
                <strong>Age:</strong> {patient.age}
              </p>
              <p>
                <strong>Insurance Number:</strong> {patient.insurance_number}
              </p>
              <p>
                <strong>Id Number:</strong> {patient.national_id_number}
              </p>
              <p>
                <strong>Pathology History:</strong> {patient.pathology_history}
              </p>
              <p>
                <strong>Medication:</strong> {patient.medication_adherence}
              </p>
              <p>
                <strong>Consultation:</strong> {patient.consultation}
              </p>
              <p>
                <strong>Treatment Recommendations:</strong>{" "}
                {patient.treatments_recommendations}
              </p>
              <p>
                <strong>Possible Diagnose:</strong> {patient.possible_diagnose}
              </p>
              <p>
                <strong>Past Consultations:</strong>
                {/* You need to define these variables */}
                {patient.past_consultations.map((consultation) => {
                  <strong>Date:</strong>
                  { consultation.date }
                  <strong>Consultation Info:</strong>
                  { consultation.consultation_info }
                  <strong>Treatment Recommendations:</strong>
                  { consultation.treatments_recommendations }
                })}
              </p>
            </div>
            <div>
              <Link to={`/patients/edit/${id}`}><Button change="blue">
                Edit patient
              </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default PatientDetails;