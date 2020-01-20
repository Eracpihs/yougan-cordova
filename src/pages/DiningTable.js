import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { OrderTidbits } from "../pages";

const DiningTable = ({ users }) => {
  const { data } = useQuery(gql`
    {
      shopId @client
      feature @client
    }
  `);

  const { shopId = "" } = data || {};
  return (
    <div>
      <OrderTidbits shopId={shopId} users={users} />
    </div>
  );
};

export default DiningTable;
