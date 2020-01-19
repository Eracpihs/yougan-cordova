import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
// import SelectUser from "../components/counter/SelectUser"

const Counter = props => {
  const { data } = useQuery(gql`
    {
      shopId @client
      feature @client
    }
  `);

  const { shopId = "", feature = "" } = data || {};
  const { beacons } = props;

  console.log("data:", data);

  return <div>{`${shopId} (${feature})`}
  {/* <SelectUser shopId={shopId} beacons={beacons}/> */}
  </div>;
};

export default Counter;
