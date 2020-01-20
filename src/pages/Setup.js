import React from "react";
import SetupForm from "../components/SetupForm";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

export const Setup = ({ onSetup }) => {
  const client = useApolloClient();
  const history = useHistory();

  const handleSubmit = ({ shop, feature }) => {
    client.writeData({
      data: {
        shop,
        feature
      }
    });

    onSetup({ shop });

    switch (feature) {
      case "counter":
        history.push("/counter");
        break;
      case "diningTable":
        history.push("/dining-table");
        break;
      case "welcomeMat":
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
