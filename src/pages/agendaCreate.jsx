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
    <div className="container">
      <h1>Create Event</h1>
      <form
        onSubmit={handleSubmit}
        className="form-container"
      >
        <label className="label-form">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={agenda.title || ""}
          onChange={handleChange}
          className="input-form"
        />
        <label className="label-form">
          Description:
        </label>
        <input
          type="text"
          name="description"
          value={agenda.description || ""}
          onChange={handleChange}
          className="input-form"
        />
        <label className="label-form">
          Doctor:
        </label>
        <select
          name="owner"
          value={agenda.owner || ""}
          onChange={handleChange}
          className="select-form"
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <label className="label-form">
          Patient:
        </label>
        <select
          name="participants"
          value={agenda.participants.length > 0 ? agenda.participants[agenda.participants.length - 1]._id : ""}
          onChange={handleChange}
          className="select-form"
        >
          <option value="">Select a patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.full_name}
            </option>
          ))}
        </select>
        <div className="secondRow-form">
          <label className="label-form">
            Start Time:
          </label>
          <input
            type="datetime-local"
            name="start_time"
            value={agenda.start_time || ""}
            onChange={handleChange}
            className="input-form"
          />
          <label className="label-form">
            End Time:
          </label>
          <input
            type="datetime-local"
            name="end_time"
            value={agenda.end_time || ""}
            onChange={handleChange}
            className="input-form"
          />
          <Button className="agendaCreate-btn" type="submit" change="green">
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
export default AgendaCreate;