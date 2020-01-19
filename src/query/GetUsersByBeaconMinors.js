import { gql } from "apollo-boost";
import client from "../client";

const getUsersByBeaconMinors = async ids => {
  return await client
    .query({
      query: gql`
        query($beaconMinors: [String]) {
          getUsersByBeaconMinors(beaconMinors: $beaconMinors) {
            _id
            beaconMinor
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
      variables: { ids }
    })
    .catch(err => {
      console.log("err:", err);
    });
};

export default getUsersByBeaconMinors;
