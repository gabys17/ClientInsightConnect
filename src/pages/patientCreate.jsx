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
    <div className="PatientsCreate p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 pt-8 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 mt-6 px-4"
      >
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Full Name:
        </label>
        <input
          type="text"
          name="full_name"
          value={patient.full_name || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Birth date:
        </label>
        <input
          type="date"
          name="date_of_birth"
          value={patient.date_of_birth || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Age:
        </label>
        <input
          type="number"
          name="age"
          value={patient.age || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Insurance:
        </label>
        <input
          type="number"
          name="insurance_number"
          value={patient.insurance_number || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Id:
        </label>
        <input
          type="text"
          name="national_id_number"
          value={patient.national_id_number || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Pathology History:
        </label>
        <textarea
          type="text"
          name="pathology_history"
          value={patient.pathology_history || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Medication Adherence:
        </label>
        <textarea
          type="text"
          name="medication_adherence"
          value={patient.medication_adherence || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Consultation:
        </label>
        <textarea
          type="text"
          name="consultation"
          value={patient.consultation || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Treatments recommendations:
        </label>
        <textarea
          type="text"
          name="treatments_recommendations"
          value={patient.treatments_recommendations || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Possible Diagnose:
        </label>
        <textarea
          type="text"
          name="possible_diagnose"
          value={patient.possible_diagnose || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <Button type="submit" change="green">
          Save
        </Button>
		<Link to="/home">
        <Button change="black">Back</Button>
      </Link>
      </form>
    </div>
  );
}

export default PatientsCreate;
