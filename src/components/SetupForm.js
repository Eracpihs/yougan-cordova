import React, { Component } from "react";
import { List, Picker, Button, WhiteSpace } from "antd-mobile";
import { getShops } from "../query";

export class SetupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopList: [],
      shop: {},
      feature: ["diningTable"]
    };
  }

  componentDidMount() {
    getShops().then(res => {
      if (!res.data || !res.data.getShops) {
        return [];
      }

      const shopList = res.data.getShops.map(s => ({
        label: s.name,
        value: s
      }));
      this.setState({ shopList });
    });
  }

  render() {
    const featureList = [
      {
        label: "Counter",
        value: "counter"
      },
      {
        label: "DiningTable",
        value: "diningTable"
      }
    ];

    const { onSubmit } = this.props;
    const { shopList, feature, shop } = this.state;

    // TODO: Fix Picker alignment
    return (
      <div>
        <h1>Setup</h1>
        <List>
          <Picker
            title="Shop"
            data={shopList}
            value={shop}
            onChange={s => this.setState({ shop: s })}
          >
            <List.Item arrow="horizontal">Shop</List.Item>
          </Picker>
          <Picker
            title="Function"
            data={featureList}
            value={feature}
            onChange={v => this.setState({ feature: v })}
          >
            <List.Item arrow="horizontal">Feature</List.Item>
          </Picker>
        </List>

        <WhiteSpace />
        <Button
          onClick={() => onSubmit({ shop, feature: feature[0] })}
          type="primary"
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default SetupForm;
