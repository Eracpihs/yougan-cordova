import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { OrderTidbits } from "../pages";

const DiningTable = props => {
  const { data } = useQuery(gql`
    {
      shopId @client
      feature @client
    }
  `);

  const { beacons } = props;
  console.log("beacons:", beacons);

  const { shopId = "" } = data || {};
  return (
    <div>
      {/* Dining Table */}
      <OrderTidbits shopId={shopId} />
    </div>
  );
};

export default DiningTable;
