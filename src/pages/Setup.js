import React from "react";
import SetupForm from "../components/SetupForm";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

export const Setup = () => {
  const client = useApolloClient();
  const history = useHistory();

  const handleSubmit = ({ shopId, feature }) => {
    // TODO: Load shop into state
    client.writeData({
      data: {
        shopId,
        feature
      }
    });

    switch (feature) {
      case "counter":
        history.push("/counter");
        break;
      case "diningTable":
        history.push("/dining-table");
        break;
      case "welcome-mat":
        history.push("/welcome-mat");
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
