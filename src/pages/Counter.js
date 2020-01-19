import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { SelectUser } from "../components";

const Counter = props => {
  const { data } = useQuery(gql`
    {
      shopId @client
      feature @client
    }
  `);

  const { shopId = "", feature = "" } = data || {};
  const { beacons } = props;

  const [currentUser, setCurrentUser] = useState({});

  return (
    <div>
      <SelectUser
        users={[
          {
            _id: "5e181064cdd3970024a63792",
            gender: null,
            region: null,
            lastName: null,
            firstName: "lola",
            telephone: "13036591269",
            avatarUrl: "https://i.picsum.photos/id/461/200/300.jpg",
            beaconMinor: "1"
          }
        ]}
        onSelectUser={user => setCurrentUser(user)}
      />
    </div>
  );
};

export default Counter;
