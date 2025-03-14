import "./OgfPage.scss";
import { useParams } from "react-router-dom";
import Widget from "../../components/Widget/Widget";

function OgfPage() {
  const { persona } = useParams();
  console.log(persona);

  return (
    <div className="ogf">
      <Widget pageName={"good_food"} persona={persona} />
    </div>
  );
}

export default OgfPage;
