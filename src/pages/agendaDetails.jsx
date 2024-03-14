import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import agendaService from "../services/agenda.service";
import userService from "../services/user.service";
import patientService from "../services/patients.service";
function AgendaDetails() {
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    agendaService.getAgenda(id).then((response) => {
      const oneAgenda = response.data;
      setAgenda(oneAgenda);
      setLoading(false);
    });
    userService.getAllDoctors().then(setDoctors);
    patientService.getAllPatients().then((response) => {
      setPatients(response.data);
    });
    // Fetch owner details
    if (agenda && agenda.owner) {
      agendaService.getAgendaOwner(agenda.owner).then((response) => {
        const owner = response.data;
        setAgenda((prevAgenda) => ({
          ...prevAgenda,
          owner: { name: owner.name },
        }));
      });
    }
  }, [id]);
  if (loading) return <div>Loading...</div>;
  const participantNames = agenda.participants.map((participant) => {
    const participantObject = patients.find(
      (patient) => patient._id === participant
    );
    return participantObject ? participantObject.full_name : "Unknown";
  });
  return (
    <div className="agendaDetailsPage bg-gray-100 py-6 px-4">
      <Link to="/agenda">
        <Button change="black">Back</Button>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-md mb-6">
        {agenda && (
          <>
            <h1 className="text-2xl mt-4 font-bold absolute">{agenda.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 mb-4 border-b pb-4">
              <p className="text-left mb-2 border-b pb-2">
                <strong>Description:</strong> {agenda.description}
              </p>
              <p className="mb-2 text-left">
                <strong>Owner:</strong>{" "}
                {agenda.owner ? agenda.owner.name : "Unknown"}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Patient:</strong> {participantNames.join(", ")}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Start time:</strong> {agenda.start_time}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>End time:</strong> {agenda.end_time}
              </p>
            </div>
            <div className="mt-4">
              <Link to={`/agenda/edit/${id}`}>
                <Button change="blue">Edit agenda</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default AgendaDetails;