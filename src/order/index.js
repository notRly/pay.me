import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {request} from 'graphql-request';

const ORDER_QUERY = `
  query getOrderDetails($orderId: ID!) {
    orders(id: [$orderId]) {
      _id
      status
      receivd
      subjects
      program
      aim
      pupil
      siteId
      name
      phone
      email
    }
  }
`

export default class Order extends React.Component {
  state = {};

  async componentDidMount() {
    const result = await request(
      'http://127.0.0.1:8200/graphql',
      ORDER_QUERY,
      {
        orderId: this.props.orderId,
      }
    );
    this.setState({order: result.orders[0]});
  }

  render () {
    const {order} = this.state;
    console.log("order", order);
    return (<Text>
      {order && order.name}
    </Text>);
  }
}