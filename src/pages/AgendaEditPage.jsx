import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import agendaService from "../services/agenda.service";


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

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...agenda };

    setLoading(true);

    agendaService.updateAgenda(id, requestBody)
      .then(() => {
        navigate(`/agenda`);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    
      agendaService.deleteAgenda(id)
      .then(() => {
        navigate(`/agenda`);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setAgenda((pevAgenda) => ({
      ...pevAgenda,
      [name]: value,
    }));
  };

  useEffect(() => {
    agendaService.getAgenda(id).then((response)=>{
      setAgenda(response.data);
      setLoading(false);
      console.log(response)
    })
  }, [id]);


  return (
    <div className="p-8 pb-16 mb-10 mt-10 rounded-lg shadow-md flex flex-col h-full relative w-full max-w-3xl mx-auto bg-white">
      <h3 className="text-2xl font-semibold text-gray-700 mb-6">Edit Agenda</h3>

      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-black opacity-50 absolute w-full h-full"></div>

          <div className="bg-white w-96 p-6 rounded-lg z-10 shadow-xl relative">
            <p className="text-lg mb-6 text-gray-700 font-semibold">
              Are you sure you want to delete this event?
            </p>

            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleDelete}
                change="green"
              >
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

<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-6 px-4">
        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Title:</label>
        <input type="text" name="title" value={agenda.title || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Description:</label>
        <input type="text" name="description" value={agenda.description || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Owner:</label>
        <input type="text" name="owner" value={agenda.owner || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Patient:</label>
        <input type="text" name="participants" value={agenda.participants || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">Start time:</label>
        <input type="datetime-local" name="start_time" value={agenda.start_time || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>

        <label className="text-gray-600 text-left ml-1 -mb-2 text-l font-bold">End time:</label>
        <input type="datetime-local" name="end_time" value={agenda.end_time || ""} onChange={handleChange} className="border rounded p-2 w-full mb-6"/>
      

        <Button
          disabled={loading}
          type="submit"
          change="green"
        >
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
