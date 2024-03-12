import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import agendaService from "../services/agenda.service";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useNavigate } from "react-router-dom";

function DemoApp() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  async function fetchAgendas() {
    try {
      const response = await agendaService.getAllAgendas();
      const mappedEvents = response.data.map((agenda) => ({
        title: agenda.title,
        start: new Date(agenda.start_time), // Assuming start_time is in ISO format
        end: new Date(agenda.end_time), // Assuming end_time is in ISO format
        description: agenda.description,
        owner: agenda.owner,
        participants: agenda.participants,
        id: agenda._id // Assuming _id is the unique identifier of the event
        // Add other properties as needed
      }));
      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching agendas:", error);
    }
  }

  useEffect(() => {
    async function loadEvents() {
      await fetchAgendas();
    }
    loadEvents();
  }, []);

  const handleDateClick = (arg) => {
    navigate("/agenda/create", { state: { date: arg.date } });
  };

  const handleEventClick = (eventClickInfo) => {
    const eventId = eventClickInfo.event.extendedProps.id;
    navigate(`/agenda/${eventId}`);
  };

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
        eventClick={handleEventClick}
      />
    </div>
  );
}

// Custom render function for event content
function renderEventContent(eventInfo) {
  const { title, description, owner, participants } = eventInfo.event.extendedProps;

  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{title}</i>
      <i>{description}</i>
      <i>{owner}</i>
      <i>{participants}</i>
    </>
  );
}

export default DemoApp;