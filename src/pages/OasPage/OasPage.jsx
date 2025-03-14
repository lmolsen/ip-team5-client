import Widget from "../../components/Widget/Widget";
import { useParams } from "react-router-dom";
import "./OasPage.scss";

function OasPage() {
  const { persona } = useParams();

  return (
    <div className="oas">
      <Widget pageName={"oas"} persona={persona} />
    </div>
  );
}

export default OasPage;
