import React, { useState } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { SelectUser } from "../../components";
import { useHistory, HashRouter, Route, Switch } from "react-router-dom";
import Payment from "./Payment";
import { Recommendation } from "..";

const Counter = ({ shop, users, beacons }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});

  const { data } = useQuery(gql`
    {
      shopId @client
      feature @client
    }
  `);
  const { shopId = "", feature = "" } = data || {};

  const handleSelectCurrentUser = user => {
    setCurrentUser(user);
    history.push(`/counter/recommendation`);
  };

  return (
    <Switch>
      <Route exact path="/counter">
        <SelectUser users={users} onSelectUser={handleSelectCurrentUser} />
      </Route>
      <Route exact path="/counter/recommendation">
        <Recommendation shop={shop} currentUser={currentUser} />
      </Route>
      <Route exact path="/counter/payment">
        <Payment />
      </Route>
    </Switch>
  );
};

export default Counter;
