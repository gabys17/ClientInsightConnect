import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_API_URL;

const DEFAULT_PATIENT_FORM_VALUES = {
  full_name: "",
  date_of_birth: "",
  age: "",
  insurance_number: "",
  national_id_number: "",
  pathology_history: [],
  medication_adherence: "",
  consultation: "",
  treatments_recommendations: "",
  possible_diagnose: "",
  past_consultations: [
    {
      date: "",
      consultation_info: "",
      treatments_recommendations: "",
    },
  ],
};

function PatientEditPage() {
  const [patient, setPatient] = useState({ ...DEFAULT_PATIENT_FORM_VALUES });
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { patientId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...patient };

    setLoading(true);

    axios
      .put(`${API_URL}/api/patients/${patient._id}`, requestBody)
      .then(() => {
        navigate(`/patients/details/${patient._id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/api/patients/${patient._id}`)
      .then(() => {
        navigate(`/patients`);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, options, multiple } = e.target;

    let inputValue = type === "checkbox" ? checked : value;

    if (multiple && options) {
      inputValue = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          inputValue.push(options[i].value);
        }
      }
    }

    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: inputValue,
    }));
  };

  useEffect(() => {
    const getPatient = () => {
      axios
        .get(`${API_URL}/api/patients/${patientId}`)
        .then((response) => {
          const patientData = response.data;
          setPatient(patientData);
        })
        .catch((error) => console.log(error));
    };

    getPatient();
    setLoading(false);
  }, [patientId]);

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
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition ease-in-out duration-150"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-400 hover:bg-gray-500 text-black font-semibold py-2 px-4 rounded-md transition ease-in-out duration-150"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-6 px-4">
        {/* Add your form fields here */}
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Save
        </button>
        <button
          disabled={loading}
          type="button"
          onClick={() => setShowDeleteConfirmation(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

export default PatientEditPage;
