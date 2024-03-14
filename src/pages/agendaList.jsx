import { Link } from "react-router-dom";
import Button from "../components/Button";
import Calendar from "../components/Calendar";
/* Import Axios Service */
function AgendaList() {
  return (
    <div>
      <Link to="/home">
        <Button change="black">Back</Button>
      </Link>
      <div>
        <Calendar />
      </div>
    </div>
  );
}
export default AgendaList;







