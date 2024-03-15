import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
/* Import Axios Service */
import patientsService from "../services/patients.service";

const DEFAULT_PATIENT_FORM_VALUES = {
  full_name: "",
  date_of_birth: "",
  age: "",
  insurance_number: "",
  national_id_number: "",
  pathology_history: "",
  medication_adherence: "",
  consultation: "",
  treatments_recommendations: "",
  possible_diagnose: "",
};

function PatientsCreate() {
  const [patient, setPatient] = useState({ ...DEFAULT_PATIENT_FORM_VALUES });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...patient,
    };

    patientsService
      .createPatient(patient, requestBody)
      .then((response) => {
        const newPatient = response.data;

        navigate(`/patients/${newPatient._id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1>Add Patient</h1>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-row">
          <label className="label-form">Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={patient.full_name || ""}
            onChange={handleChange}
            className="input-form"
          />

          <label className="label-form">Birth date:</label>
          <input
            type="date"
            name="date_of_birth"
            value={patient.date_of_birth || ""}
            onChange={handleChange}
            className="input-form"
          />

          <label className="label-form">Age:</label>
          <input
            type="number"
            name="age"
            value={patient.age || ""}
            onChange={handleChange}
            className="input-form input-size"
          />

          <label className="label-form">Insurance:</label>
          <input
            type="number"
            name="insurance_number"
            value={patient.insurance_number || ""}
            onChange={handleChange}
            className="input-form input-size"
          />

          <label className="label-form">Id:</label>
          <input
            type="text"
            name="national_id_number"
            value={patient.national_id_number || ""}
            onChange={handleChange}
            className="input-form input-size"
          />
        </div>

        <div className="form-row">
          <label className="label-form">Pathology History:</label>
          <textarea
            type="text"
            name="pathology_history"
            value={patient.pathology_history || ""}
            onChange={handleChange}
            className="input-form textArea-size-md"
          />

          <label className="label-form">Medication Adherence:</label>
          <textarea
            type="text"
            name="medication_adherence"
            value={patient.medication_adherence || ""}
            onChange={handleChange}
            className="input-form textArea-size-md"
          />
        </div>
        <div className="form-row">
          <label className="label-form">Consultation:</label>
          <textarea
            type="text"
            name="consultation"
            value={patient.consultation || ""}
            onChange={handleChange}
            className="input-form textArea-size-lg"
          />
        </div>
        <div className="form-row">
          <label className="label-form">Treatments recommendations:</label>
          <textarea
            type="text"
            name="treatments_recommendations"
            value={patient.treatments_recommendations || ""}
            onChange={handleChange}
            className="input-form textArea-size-md"
          />

          <label className="label-form">Possible Diagnose:</label>
          <textarea
            type="text"
            name="possible_diagnose"
            value={patient.possible_diagnose || ""}
            onChange={handleChange}
            className="input-form textArea-size-md"
          />
        </div>
        <div className="patientCreate-btn">
          <Button type="submit" change="green">
            Save
          </Button>
          <Link to="/home">
            <Button change="black">Back</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PatientsCreate;
