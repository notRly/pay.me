import * as React from 'react';
import {StackNavigator} from 'react-navigation';
import {WHITE_COLOR, BLACK_COLOR} from '../ui';
import {
  Demo as Home,
  ChooseOrder,
  Order,
  PaymentType,
  ClientProblem,
  Browser,
  Payment,
} from '../views';

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    ChooseOrder: {
      screen: ChooseOrder,
    },
    Order: {
      screen: Order,
    },
    PaymentType: {
      screen: PaymentType,
    },
    ClientProblem: {
      screen: ClientProblem,
    },
    Browser: {
      screen: Browser,
    },
    Payment: {
      screen: Payment,
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontSize: 18,
      },
      headerBackTitle: null,
    },
  },
);
