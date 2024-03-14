import axios from "axios";

class PatientsService {
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

  // POST /api/patients
  createPatient = (requestBody) => {
    return this.api.post("/patient", requestBody);
  };

  // GET /patients
  getAllPatients = () => {
    return this.api.get("/patient");
  };

  // GET /patients/:id
  getPatient = (id) => {
    return this.api.get(`/patient/${id}`);
  };

  // PUT /patients/:id
  updatePatient = (id, requestBody) => {
    return this.api.put(`/patient/${id}`, requestBody);
  };

  // DELETE /patients/:id
  deletePatient = (id) => {
    return this.api.delete(`/patient/${id}`);
  };
}

// Create one instance object
const patientsService = new PatientsService();

export default patientsService;