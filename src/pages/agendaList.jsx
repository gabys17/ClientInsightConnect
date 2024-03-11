import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";


/* Import Axios Service */
import agendaService from "../services/agenda.service";

function AgendaList() {
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    agendaService
      .getAllAgendas()
      .then((response) => setAgendas(response.data))
      .catch((error) => console.log(error));
  }, []);

  

  return (
    <div>
      <Link to="/home">
        <Button change="black">Back</Button>
      </Link>
      
      <Link to="/agenda/create">
        <Button change="blue">Add new agenda</Button>
      </Link>
  
      {agendas &&
        agendas.map((agenda) => (
          <div className="agenda-container" key={agenda.id}>
            <div className="StudentListPage">
              <div className="flex justify-between items-center p-2 font-bold border-b" >
                <Link  to={`/agenda/${agenda._id}`}>
                  <span style={{ flexBasis: "20%" }}>{agenda.title}</span>
                </Link>
                <span style={{ flexBasis: "10%" }}>{agenda.description}</span>
                <span style={{ flexBasis: "10%" }}>{agenda.owner}</span>
                <span style={{ flexBasis: "10%" }}>{agenda.participants}</span>
              </div>
              <span style={{ flexBasis: "50%" }}>
                {agenda.when.map((event, index) => (
                  <span key={index}>
                    {event.end_time} {event.object}
                    {event.start_time}{event.full_day}
                  </span>
                ))}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AgendaList;