import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
/* Import Axios Service */
import agendaService from "../services/agenda.service";
import patientService from "../services/patients.service";
import userService from "../services/user.service";
const DEFAULT_AGENDA_FORM_VALUES = {
  title: "",
  description: "",
  owner: "",
  participants: "",
  end_time: "",
  start_time: "",
};
function AgendaCreate() {
  const [agenda, setAgenda] = useState({
    ...DEFAULT_AGENDA_FORM_VALUES,
    participants: [],
  });
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
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, typeof value);
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

    const requestBody = {
      ...agenda,
    };
    agendaService
      .createAgenda(requestBody)
      .then((response) => {
        const newAgenda = response.data;
        console.log()
        navigate(`/agenda`);
      })
      .catch((error) => {
        console.log(error);
        alert("There was an error creating the agenda. Please try again later.");
      });
  };
  return (
    <div className="AgendaCreate p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto">
      <div className="flex justify-center bg-white items-center mb-4 pt-8 absolute top-0 left-0 right-0 py-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-b border-gray-300 shadow-sm"></div>
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
          Doctor:
        </label>
        <select
          name="owner"
          value={agenda.owner || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Patient:
        </label>
        <select
          name="participants"
          value={agenda.participants.length > 0 ? agenda.participants[agenda.participants.length - 1]._id : ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.full_name}
            </option>
          ))}
        </select>
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Start Time:
        </label>
        <input
          type="datetime-local"
          name="start_time"
          value={agenda.start_time || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          End Time:
        </label>
        <input
          type="datetime-local"
          name="end_time"
          value={agenda.end_time || ""}
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
export default AgendaCreate;