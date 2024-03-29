import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
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

function PatientEditPage() {
  const [patient, setPatient] = useState({ ...DEFAULT_PATIENT_FORM_VALUES });
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...patient };

    setLoading(true);

    patientsService
      .updatePatient(id, requestBody)
      .then(() => {
        navigate(`/patients`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    patientsService
      .deletePatient(id)
      .then(() => {
        navigate(`/patients`);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  useEffect(() => {
    patientsService.getPatient(id).then((response) => {
      setPatient(response.data);
      setLoading(false);
      console.log(response);
    });
  }, [id]);

  return (
    <div className="container">
      <h3 >
        Edit Patient
      </h3>

      {showDeleteConfirmation && (
        <div >

          <div>
            <p>  
              Are you sure you want to delete this patient?
            </p>

            <div className="flex justify-end space-x-4">
              <Button onClick={handleDelete} change="green">
                Yes
              </Button>
              <Button
                onClick={() => setShowDeleteConfirmation(false)}
                change="black"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="form-row"
      >
        <label className="label-form">
          Full Name:
        </label>
        <input
          type="text"
          name="full_name"
          value={patient.full_name || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Birth date:
        </label>
        <input
          type="date"
          name="date_of_birth"
          value={patient.date_of_birth || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Age:
        </label>
        <input
          type="number"
          name="age"
          value={patient.age || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Insurance:
        </label>
        <input
          type="number"
          name="insurance_number"
          value={patient.insurance_number || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Id:
        </label>
        <input
          type="text"
          name="national_id_number"
          value={patient.national_id_number || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Pathology History:
        </label>
        <textarea
          type="text"
          name="pathology_history"
          value={patient.pathology_history || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Medication Adherence:
        </label>
        <textarea
          type="text"
          name="medication_adherence"
          value={patient.medication_adherence || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Consultation:
        </label>
        <textarea
          type="text"
          name="consultation"
          value={patient.consultation || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Treatments recommendations:
        </label>
        <textarea
          type="text"
          name="treatments_recommendations"
          value={patient.treatments_recommendations || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <label className="label-form">
          Possible Diagnose:
        </label>
        <textarea
          type="text"
          name="possible_diagnose"
          value={patient.possible_diagnose || ""}
          onChange={handleChange}
          className="input-form input-size"
        />

        <Button disabled={loading} type="submit" change="green">
          Save
        </Button>
        <Button
          disabled={loading}
          type="button"
          onClick={() => setShowDeleteConfirmation(true)}
          change="red"
        >
          Delete
        </Button>
      </form>
    </div>
  );
}

export default PatientEditPage;
