import * as React from 'react';
import {request} from 'graphql-request';
import { StyleSheet, Text, View } from 'react-native';
import {Container} from '../ui';
import {ORDER_QUERY} from './constants';

export default class Order extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;

    return {
      title: params ? `Счёт к заказу №${params.orderId}` : 'Счёт к заказу',
    }
  };

  state = {};

  async componentDidMount() {
    const {state: {params: {orderId}}} = this.props.navigation;

    const result = await request(
      'http://192.168.119.66:8200/graphql',
      ORDER_QUERY,
      {orderId}
    );
    this.setState({order: result.orders[0]});
  }

  render () {
    const {order} = this.state;

    return (
      <Container>
        <Text>{order && order.name}</Text>
      </Container>
    );
  }
}



