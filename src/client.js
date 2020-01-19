import ApolloClient from "apollo-boost";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
const host = "139.59.55.85";
const httpLink = new HttpLink({
  uri: `http://${host}/`
});

const subscriptionClient = new SubscriptionClient(`ws://${host}/graphql`, {
  reconnect: true
});

const wsLink = new WebSocketLink(subscriptionClient);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export { link };

const client = new ApolloClient({
  uri: `http://${host}/graphql`,
  request: link.request
});

export default client;
