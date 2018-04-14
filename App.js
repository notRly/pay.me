console.disableYellowBox = true;

import React from 'react';
import {Root} from 'native-base';
import Navigation from './src/navigation';
import {Font, Constants} from 'expo';
import {Linking} from 'react-native';
import qs from 'qs';
import {request} from 'graphql-request';
import {GQL_HOST, ORDER_QUERY, REQUEST_PAYMENT_STATUS} from './src/views/constants';
import Globals from './src/navigation/globals';
export default class App extends React.Component {

  async componentDidMount() {
    Font.loadAsync({
      Ionicons: require('./assets/fonts/ionicons.ttf'),
    });

    Linking.getInitialURL().then(url => {
      url = url.split('?');
      if (url[1]) {
        let data = qs.parse(url[1]);
        if (data.orderId && data.version) {
          Globals.version = data.version;
          this.findOrder(data.orderId);
        }
      }
    });
  }

  findOrder = async (orderId) => {
    try {
      const result = await request(GQL_HOST, ORDER_QUERY, {
        orderId,
      });
      if (!result.orders[0]) return;
      Globals.order = result.orders[0];
      Globals.fromDeeplink = true;
    } catch (e) {}
  };

  render() {
    return (
      <Root>
        <Navigation />
      </Root>
    );
  }
}
