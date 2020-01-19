import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Counter = () => {
  const { data } = useQuery(gql`
    {
      shopId @client
      feature @client
    }
  `);

  const { shopId = "", feature = "" } = data || {};

  return <div>{`${shopId} (${feature})`}</div>;
};

export default Counter;
