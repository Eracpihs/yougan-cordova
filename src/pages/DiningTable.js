import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { OrderTidbits2 } from "../pages";

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
      <OrderTidbits2 shopId={shopId} users={users} />
    </div>
  );
};

export default DiningTable;
