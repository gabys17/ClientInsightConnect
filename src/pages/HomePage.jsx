import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container">
		<div>
		<Link to="/patients">
			<div className="container-card">
				<div className="card-body">
					<h2 className="card-title">Patients</h2>
					<img src="../assets/patient.png" alt="patient icon" />
				</div>
			</div>
		</Link>
		<Link to="/agenda">
			<div className="container-card">
				<div className="card-body">
					<h2 className="card-title">To-do</h2>
					<img src="../assets/to-do-list.png" alt="to-do icon" />
				</div>
			</div>
		</Link>
		</div>
		<div>
		<Link to="/agenda">
			<div className="container-card">
				<div className="card-body">
					<h2 className="card-title">Appointments</h2>
					<img src="../assets/timetable.png" alt="calendar icon" />
				</div>
			</div>
		</Link>
		<Link to="/agenda">
			<div className="container-card">
				<div className="card-body">
					<h2 className="card-title">Mood Tracker</h2>
					<img src="../assets/mood.png" alt="mood tracker icon" />
				</div>
			</div>
		</Link>
		</div>
    </div>
  );
}

export default HomePage;
