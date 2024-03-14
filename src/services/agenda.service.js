import axios from "axios";

class AgendaService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/agenda
  createAgenda = (requestBody) => {
    return this.api.post("/agenda", requestBody);
  };

  // GET /agenda
  getAllAgendas = () => {
    return this.api.get("/agenda");
  };

  // GET /agenda/:id
  getAgenda = (id) => {
    return this.api.get(`/agenda/${id}`);
  };

  // PUT /agenda/:id
  updateAgenda = (id, requestBody) => {
    return this.api.put(`/agenda/${id}`, requestBody);
  };

  // DELETE /agenda/:id
  deleteAgenda = (id) => {
    return this.api.delete(`/agenda/${id}`);
  };
}

// Create one instance object
const agendaService = new AgendaService();

export default agendaService;