import { useState, useEffect } from "react";

/* Import Axios Service */
import agendaService from "../services/agenda.service";

function Agenda() {
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    agendaService
      .getAllAgendas()
      .then((response) => setAgendas(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {agendas &&
        agendas.map((agenda) => {
          return (
            <div key={agenda.id} className="agenda-container">
              <h3>{agenda.title}</h3>
              <h3>{agenda.description}</h3>
              <h3>{agenda.owner}</h3>
              <h3>{agenda.participants}</h3>
              <h3>
                {agenda.when &&
                  Array.isArray(agenda.when) &&
                  agenda.when.map((properties, index) => (
                    <span key={index}>
                      {properties.end_time} {properties.object}
                      {properties.start_time}
                      {properties.full_day}
                    </span>
                  ))}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default Agenda;
