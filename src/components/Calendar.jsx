import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import agendaService from "../services/agenda.service";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Link } from "react-router-dom/dist";
import Button from "./Button";

function DemoApp() {
  const [events, setEvents] = useState([]);

  async function fetchAgendas() {
    try {
      const response = await agendaService.getAllAgendas();
      setEvents(response.data);
      console.log(response.data)

      /* return events.map((agenda) => {
        
          return {
            title: agenda.title,
            description: agenda.description,
            owner: agenda.owner,
            participants: agenda.participants,
            when: {
              start_time: agenda.when.start_time,
              object: agenda.when.object,
              end_time: agenda.when.end_time,
            },
          };
        } */
        /* return {
          title: agenda.title,
          description: agenda.description,
          owner: agenda.owner,
          participants: agenda.participants,
          when: {
            object: agenda.when.object,
            full_day: agenda.when.full_day,
          },
        }; */
      } catch (error) {
      console.error("Error fetching agendas:", error);
      return [];
    }
  }

  useEffect(() => {
    async function loadEvents() {
/*       const fetchedEvents = await fetchAgendas();
      setEvents(fetchedEvents); */
      await fetchAgendas();
    }

    loadEvents();
  }, []);

  const handleDateClick = () => {
     <Link to="/agenda/:id"><Button change="blue">Create appointment</Button></Link>;
  };

/*   function handleEvents(events) {
    setCurrentEvents(events);
  } */

  return (
    <div>
      <h1>Appointments</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventContent={renderEventContent}
        events={events}
        select={handleDateClick}

      />
    </div>
  )}
  // a custom render function
  function renderEventContent(eventInfo) {
    /*const { start_time, end_time } = eventInfo.event.extendedProps.when;*/ 
     return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <i>{eventInfo.event.title}</i>
        <i>{eventInfo.event.title}</i>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  export default DemoApp;
