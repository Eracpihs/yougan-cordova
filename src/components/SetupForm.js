import React, { Component } from "react";
import { List, InputItem, Picker, Button, WhiteSpace } from "antd-mobile";

export class SetupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopId: "",
      feature: ["counter"]
    };
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
    const { feature, shopId } = this.state;

    return (
      <div>
        <h1>Setup</h1>
        <List>
          <InputItem
            placeholder="Shop ID"
            value={shopId}
            onChange={v => this.setState({ shopId: v })}
          >
            Shop ID
          </InputItem>
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
          onClick={() => onSubmit({ shopId, feature: feature[0] })}
          type="primary"
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default SetupForm;
