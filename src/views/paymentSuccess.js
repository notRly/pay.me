import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import {
  StyleProvider,
  Spinner,
} from 'native-base';
import {
  CLIENT,
  ORDER_QUERY,
  GQL_HOST,
  REQUEST_PAYMENT_STATUS,
  SENDED_PAYMENT_STATUS,
  RECEIVED_PAYMENT_STATUS,
} from './constants';

export default class PaymentSuccess extends React.Component {
  state = {loading: true};

  async componentDidMount() {
    await this.fetchOrder();
    this.setState({loading: false});
  }

  fetchOrder = async () => {
    const result = await request(GQL_HOST, ORDER_QUERY, {orderId});
    Globals.order = result.orders[0];
  };

  render() {
    if (this.state.loading) return 



    return (
      <View>
        <Text style={styles.title2}>Заказ оплачен!</Text>
        <Text style={styles.textEmail}>Вам на почту отправлено письмо с квитанцией об оплате заказа</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title2: {
    marginTop: 40,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textEmail: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
  }
});
