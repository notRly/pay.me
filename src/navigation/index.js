import * as React from 'react';
import { StackNavigator } from 'react-navigation';
import {Demo as Home, Order} from '../views';

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Order: {
      screen: Order,
    },
  },
  {
    initialRouteName: 'Home',
  },
);
