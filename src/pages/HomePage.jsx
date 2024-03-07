import { Link } from "react-router-dom"

function HomePage() {
  return (
	<div>
		<div>
		<Link to="/patients">Patients</Link>
		</div>
		<div>
		<Link to="/agenda">Appointments</Link>
	</div>
	</div>
	
  )
}

export default HomePage