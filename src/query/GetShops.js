import { gql } from "apollo-boost";
import client from "../client";

const getShops = async id => {
  return await client
    .query({
      query: gql`
        query {
          getShops {
            _id
            name
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
      `
    })
    .catch(err => {
      console.log("err:", err);
    });
};

export default getShops;
