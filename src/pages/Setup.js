import React from "react";
import SetupForm from "../components/SetupForm";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

export const Setup = ({ onSelectShop }) => {
  const client = useApolloClient();
  const history = useHistory();

  const handleSubmit = ({ shopId, feature }) => {
    // TODO: Load shop from graphql
    const fetchShop = Promise.resolve({
      _id: "",
      name: "Rocky",
      menuItems: [
        {
          _id: "5e159d9d819b130019711d16",
          name: "Egg McMuffin",
          type: "Burger",
          price: 12.35,
          rating: 4,
          images: [
            "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Egg-McMuffin.jpg?$Product_Desktop$",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/english_muffin.png",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/round_egg.png",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/canadian_bacon.png"
          ],
          description:
            "This delicious breakfast sandwich is an excellent source of protein and oh so delicious. We place a freshly cracked Grade A egg on a toasted English Muffin topped with real butter and add lean Canadian bacon and melty American cheese. And all that for 300 calories. melty American cheese. Pass the line when you use Mobile Order & Pay, only on the McDonald’s App!"
        },
        {
          _id: "5e159d9d819b130019711d17",
          name: "Sausage Biscuit with Egg",
          type: "Breakfast Burger",
          price: 15.35,
          rating: 5,
          images: [
            "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sausage-Biscuit-with-Egg-Regular-Size-Biscuit.jpg?$Product_Desktop$",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/biscuit.png",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/folded_egg.png",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/sausage.png"
          ],
          description:
            "Sausage Biscuit with Egg features a warm biscuit brushed with real butter, sizzling hot sausage, and a fluffy folded egg."
        },
        {
          _id: "5e159d9d819b130019711d18",
          name: "Hotcakes and Sausage",
          type: "Hot Cakes",
          price: 7.35,
          rating: 4,
          images: [
            "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Hotcakes-and-Sausage.jpg?$Product_Desktop$",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/hotcake.png",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/hotcake_syrup.png",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/sausage.png"
          ],
          description:
            "Hotcakes and Sausage feature three golden brown, melt-in-your-mouth hotcakes with a side of real butter and the sweet flavor of maple. Plus, a side of our savory hot sausage."
        },
        {
          _id: "5e159d9d819b130019711d19",
          name: "Sausage Burrito",
          type: "Burrito",
          price: 5.35,
          rating: 3,
          images: [
            "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Sausage-Burrito.jpg?$Product_Desktop$",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/scrambled_egg_mix.png",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/tortilla.png",
            "https://www.mcdonalds.com/content/dam/usa/nfl/nutrition/ingredients/regular/ingredient_american_cheese_180x180.png"
          ],
          description:
            "Start your morning with a Sausage Burrito—fluffy scrambled egg, sausage, melty cheese, green chiles, and onions, all wrapped in a soft tortilla. Use the McDonald’s App to Mobile Order & Pay."
        },
        {
          _id: "5e159d9d819b130019711d1a",
          name: "Hash Browns",
          type: "Snacks",
          price: 2.35,
          rating: 3,
          images: [
            "https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-HASH-BROWNS.jpg?$Product_Desktop$"
          ],
          description:
            "Our Hash Browns are deliciously tasty. These shredded potato hash brown patties are prepared so they’re fluffy on the inside and crispy and toasty on the outside."
        }
      ]
    });

    fetchShop.then(shop => {
      onSelectShop(shop);
    });

    client.writeData({
      data: {
        shopId,
        feature
      }
    });

    switch (feature) {
      case "counter":
        history.push("/counter");
        break;
      case "diningTable":
        history.push("/dining-table");
        break;
      case "welcomeMat":
        history.push("/welcome-mat");
        break;
      default:
        // Do nothing
        break;
    }
  };

  return (
    <div>
      <SetupForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Setup;
