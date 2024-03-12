import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
/* Import Axios Service */
import agendaService from "../services/agenda.service";

const DEFAULT_AGENDA_FORM_VALUES = {
  title: "",
  description: "",
  owner: "",
  participants: "",
  end_time: "",
  start_time: "",
};

function AgendaCreate() {
  const [agenda, setAgenda] = useState({ ...DEFAULT_AGENDA_FORM_VALUES });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setAgenda((prevAgenda) => ({
      ...prevAgenda,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      ...agenda,
    };

    agendaService
      .createAgenda(agenda, requestBody)
      .then((response) => {
        const newAgenda = response.data;

        navigate(`/agenda/${newAgenda._id}`);
      })
      .catch((error) => console.log(error));
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
          type="date"
          name="description"
          value={agenda.description || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Owner:
        </label>
        <input
          type="number"
          name="owner"
          value={agenda.owner || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Patient:
        </label>
        <input
          type="number"
          name="participants"
          value={agenda.participants || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          Start Time:
        </label>
        <input
          type="date"
          name="start_time"
          value={agenda.start_time || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full mb-6"
        />

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">
          End Time:
        </label>
        <input
          type="date"
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
