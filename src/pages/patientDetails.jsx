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
    patientsService.getPatient(id).then((response)=>{
      setPatient(response.data);
      setLoading(false);
      console.log(response)
    })
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="patientDetailsPage bg-gray-100 py-6 px-4">
      <Link to="/patients">
        <Button change="black">Back</Button>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-md mb-6">
        {patient && (
          <>
            <h1 className="text-2xl mt-4 font-bold absolute">
              {patient.full_name}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 mb-4 border-b pb-4">
              <p className="text-left mb-2 border-b pb-2">
                <strong>Birth-date:</strong> {patient.date_of_birth}
              </p>
              <p className="mb-2 text-left">
                <strong>Age:</strong> {patient.age}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Insurance Number:</strong> {patient.insurance_number}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Id Number:</strong> {patient.national_id_number}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Pathology History:</strong> {patient.pathology_history}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Medication:</strong> {patient.medication_adherence}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Consultation:</strong> {patient.consultation}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Treatment Recommendations:</strong>{" "}
                {patient.treatments_recommendations}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Possible Diagnose:</strong> {patient.possible_diagnose}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Past Consultations:</strong>
                {/* You need to define these variables */}
                {patient.past_consultations.map((consultation)=>{
                  <strong>Date:</strong>
                  {consultation.date}
                  <strong>Consultation Info:</strong>
                  {consultation.consultation_info}
                  <strong>Treatment Recommendations:</strong>
                  {consultation.treatments_recommendations}
                })}
              </p>
            </div>
            <div className="mt-4">
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
