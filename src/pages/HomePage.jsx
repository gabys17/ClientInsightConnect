import { Link } from "react-router-dom";
import Patient from "../assets/patient.png"
import Calendar from "../assets/timetable.png"
import Pills from "../assets/pills.png"
import Mood from "../assets/mood.png"
import Sidebar from "../components/Sidebar";

function HomePage() {
  return (
	
    <div className="home-container">
      <Sidebar />

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
					<h2 className="card-title">Prescriptions</h2>
					<img src={Pills} alt="prescription icon" />
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
