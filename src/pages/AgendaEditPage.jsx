import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import agendaService from "../services/agenda.service";
import patientService from "../services/patients.service";
import userService from "../services/user.service";
import Sidebar from "../components/Sidebar";

const DEFAULT_AGENDA_FORM_VALUES = {
  title: "",
  description: "",
  owner: "",
  participants: "",
  end_time: "",
  start_time: "",
};
function AgendaEdit() {
  const [agenda, setAgenda] = useState({ ...DEFAULT_AGENDA_FORM_VALUES });
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  // Add a state for storing patients
  const [patients, setPatients] = useState([]);
  // Add a state for storing doctors
  const [doctors, setDoctors] = useState([]);
  // Fetch patients in a useEffect
  useEffect(() => {
    patientService.getAllPatients().then((response) => {
      setPatients(response.data);
      console.log(response.data);
    });
  }, []);
  //Fetch doctors in a useEffect
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await userService.getAllDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "participants") {
      const patient = patients.find((p) => p._id === value);
      if (patient) {
        const updatedParticipants =
          value === ""
            ? []
            : agenda.participants.includes(value)
              ? agenda.participants.filter((p) => p !== value)
              : [...agenda.participants, patient._id];
        setAgenda((prevAgenda) => ({
          ...prevAgenda,
          participants: updatedParticipants,
        }));
      }
    } else {
      setAgenda((prevAgenda) => ({
        ...prevAgenda,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...agenda };
    setLoading(true);
    agendaService
      .updateAgenda(id, requestBody)
      .then(() => {
        navigate(`/agenda`);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = () => {
    agendaService
      .deleteAgenda(id)
      .then(() => {
        navigate(`/agenda`);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    agendaService.getAgenda(id).then((response) => {
      setAgenda(response.data);
      setLoading(false);
      console.log(response);
    });
  }, [id]);
  return (
    <div className="container">
      <Sidebar />

      <h1>Edit Appointment</h1>
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute w-full h-full"></div>
          <div className="bg-white w-96 p-6 rounded-lg z-10 shadow-xl relative">
            <p className="text-lg mb-6 text-gray-700 font-semibold">
              Are you sure you want to delete this event?
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
        className="grid grid-cols-1 gap-4 mt-6 px-4"
      >
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={agenda.title || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Description:
        </label>
        <input
          type="text"
          name="description"
          value={agenda.description || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Owner:
        </label>
        <select
          name="owner"
          value={agenda.owner || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        >
          <option value="">Select an owner</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Participants:
        </label>
        <select
          name="participants"
          value={
            agenda.participants.length > 0
              ? agenda.participants[agenda.participants.length - 1]._id
              : ""
          }
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        >
          <option value="">Select a participant</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.full_name}
            </option>
          ))}
        </select>
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Start time:
        </label>
        <input
          type="datetime-local"
          name="start_time"
          value={agenda.start_time || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          End time:
        </label>
        <input
          type="datetime-local"
          name="end_time"
          value={agenda.end_time || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
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
export default AgendaEdit;