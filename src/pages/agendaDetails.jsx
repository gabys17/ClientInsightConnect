import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import agendaService from "../services/agenda.service";

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = import.meta.env.VITE_SERVER_URL;

function AgendaDetails() {
  const [agenda, setAgenda] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getAgenda = () => {
    axios
      .get(`${API_URL}/api/agenda/${id}`)
      .then((response) => {
        const oneAgenda = response.data;
        setAgenda(oneAgenda);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    agendaService.getAgenda(id).then((response)=>{
      setAgenda(response.data);
      setLoading(false);
      console.log(response)
    })
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="agendaDetailsPage bg-gray-100 py-6 px-4">
      <Link to="/agenda">
        <Button change="black">Back</Button>
      </Link>
      <div className="bg-white p-8 rounded-lg shadow-md mb-6">
        {agenda && (
          <>
            <h1 className="text-2xl mt-4 font-bold absolute">
              {agenda.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 mb-4 border-b pb-4">
              <p className="text-left mb-2 border-b pb-2">
                <strong>Description:</strong> {agenda.description}
              </p>
              <p className="mb-2 text-left">
                <strong>Owner:</strong> {agenda.owner}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>Patient:</strong> {agenda.participants}
              </p>
              <p className="text-left mb-2 border-b pb-2">
                <strong>When:</strong>
                <ul>
                  {agenda.when.map((event, index) => (
                    <li key={index}>
                      <strong>End time:</strong> {event.end_time}
                      <strong>Object:</strong> {event.object}
                      <strong>Start time:</strong> {event.start_time}
                      <strong>Full day:</strong> {event.full_day}
                    </li>
                  ))}
                </ul>
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
