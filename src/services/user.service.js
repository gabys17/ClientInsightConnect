import axios from "axios";

class UserService {
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

	// POST /api/users
	createUser = (requestBody) => {
		return this.api.post("/users", requestBody);
	};

	// GET /users
	getAllUsers = () => {
		return this.api.get("/users");
	};

	
	getAllDoctors = (role) => {
		return this.api.get(`/users${role ? `?role=${role}` : ""}`);
	};

	// GET /users/:id
	getUsers = (id) => {
		return this.api.get(`/users/${id}`);
	};

	// PUT /Users/:id
	updateUsers = (id, requestBody) => {
		return this.api.put(`/users/${id}`, requestBody);
	};

	// DELETE /Users/:id
	deleteUsers = (id) => {
		return this.api.delete(`/users/${id}`);
	};
}

// Create one instance object
const userService = new UserService();

export default userService;