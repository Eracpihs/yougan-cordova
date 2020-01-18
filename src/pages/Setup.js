import React from "react";
import SetupForm from "../components/SetupForm";
import { useHistory } from "react-router-dom";

export const Setup = () => {
  const history = useHistory();

  const handleSubmit = ({ shopId, feature }) => {
    // TODO: Load shop into state

    console.log(feature);

    switch (feature) {
      case "counter":
        history.push("/counter");
        break;
      case "diningTable":
        history.push("/diningTable");
        break;
      default:
        // Do nothing
        break;
    }
  };

  return (
    <div>
      <SetupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Setup;
