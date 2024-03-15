import { Link } from "react-router-dom";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
import Sidebar from "../components/Sidebar";

/* Import Axios Service */
function AgendaList() {
  return (
    <div>
      <Sidebar />

      <Link to="/home">
        <Button className="agendaList-btn" change="black">Back</Button>
      </Link>
      <div>
        <Calendar />
      </div>
    </div>
  );
}
export default AgendaList;







