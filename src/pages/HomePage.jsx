import { Link } from "react-router-dom";
import Patient from "../assets/patient.png"
import Calendar from "../assets/timetable.png"
import Todo from "../assets/to-do-list.png"
import Mood from "../assets/mood.png"

function HomePage() {
  return (
    <div className="home-container">
		<div>
		<Link to="/patients">
			<div className="container-card">
				<div className="card-body">
					<h2 className="card-title">Patients</h2>
					<img src={Patient} alt="patient icon" />
				</div>
			</div>
		</Link>
		<Link to="/agenda">
			<div className="container-card">
				<div className="card-body">
					<h2 className="card-title">To-do</h2>
					<img src={Todo} alt="to-do icon" />
				</div>
			</div>
		</Link>
		</div>
		<div>
		<Link to="/agenda">
			<div className="container-card">
				<div className="card-body">
					<h2 className="card-title">Appointments</h2>
					<img src={Calendar} alt="calendar icon" />
				</div>
			</div>
		</Link>
		<Link to="/agenda">
			<div className="container-card">
				<div className="card-body">
					<h2 className="card-title">Mood Tracker</h2>
					<img src={Mood} alt="mood tracker icon" />
				</div>
			</div>
		</Link>
		</div>
    </div>
  );
}

export default HomePage;
