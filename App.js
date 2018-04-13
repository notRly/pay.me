console.disableYellowBox = true;
import React from 'react';
import {Root} from 'native-base';
import Navigation from './src/navigation';
import {Font} from 'expo';
export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      Ionicons: require('./assets/fonts/ionicons.ttf'),
    });
  }
  render() {
    return (
      <Root>
        <Navigation />
      </Root>
    );
  }
}
