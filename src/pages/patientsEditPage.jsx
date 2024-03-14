import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/api/patients/${id}`, requestBody)
      .then(() => {
        navigate(`/api/patients/edit/${id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/api/patients/${id}`)
      .then(() => {
        navigate(`/api/patients`);
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
    patientsService.getPatient(id).then((response)=>{
      setPatient(response.data);
      setLoading(false);
    })
  }, [id]);


  return (
    <div className="p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto bg-white">
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">Edit Patient</h3>

      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute w-full h-full"></div>

          <div className="bg-white w-96 p-6 rounded-lg z-10 shadow-xl relative">
            <p className="text-lg mb-6 text-gray-700 font-semibold">
              Are you sure you want to delete this patient?
            </p>

            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleDelete}
                change="green"
              >
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

<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-6 px-4">
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Full Name:</label>
        <input type="text" name="full_name" value={patient.full_name || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Birth date:</label>
        <input type="date" name="date_of_birth" value={patient.date_of_birth || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Age:</label>
        <input type="number" name="age" value={patient.age || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Insurance:</label>
        <input type="number" name="insurance_number" value={patient.insurance_number || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Id:</label>
        <input type="text" name="national_id_number" value={patient.national_id_number || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>
      
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Pathology History:</label>
        <textarea type="text" name="pathology_history" value={patient.pathology_history || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Medication Adherence:</label>
        <textarea type="text" name="medication_adherence" value={patient.medication_adherence || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Consultation:</label>
        <textarea type="text" name="consultation" value={patient.consultation || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Treatments recommendations:</label>
        <textarea type="text" name="treatents_recommendations" value={patient.treatents_recommendations || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Possible Diagnose:</label>
        <textarea type="text" name="possible_diagnose" value={patient.possible_diagnose || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>


        <Button
          disabled={loading}
          type="submit"
          change="green"
        >
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
