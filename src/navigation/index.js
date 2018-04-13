import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import {WHITE_COLOR, BLACK_COLOR} from '../ui';
import {Demo as Home, Order, Browser} from '../views';

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Order: {
      screen: Order,
    },
    Browser: {
      screen: Browser
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
        fontWeight: "normal",
        fontSize: 18
      },
      headerBackTitle: null,
    },
  },
);
