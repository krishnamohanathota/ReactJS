import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        //This is to ignore form submit
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
