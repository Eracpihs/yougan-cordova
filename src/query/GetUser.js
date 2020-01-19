import { gql } from "apollo-boost";
import client from "../client";

const getUser = async id => {
  return await client
    .query({
      query: gql`
        query($id: String) {
          getUser(id: $id) {
            _id
            firstName
            lastName
            telephone
            gender
            region
            avatarUrl
            currentOrders {
              _id
              status
              menuItems {
                _id
                name
                type
                price
                rating
                images
                description
              }
            }
            pastOrders {
              _id
              status
              menuItems {
                _id
                name
                type
                price
                rating
                images
                description
              }
            }
          }
        }
      `,
      variables: { id }
    })
    .catch(err => {
      console.log("err:", err);
    });
};

export default getUser;
