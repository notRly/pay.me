console.disableYellowBox = true;

import React from 'react';
import {Root} from 'native-base';
import Navigation from './src/navigation';
import {Font, Constants} from 'expo';
import {Linking} from 'react-native';
export default class App extends React.Component {

_handleUrl = (url) => {
  this.setState({ url });

  alert(Constants.linkingUri);
  alert(url);
  let queryString = url.replace(Constants.linkingUri, '');
  if (queryString) {
    let data = qs.parse(queryString);
    alert(`Linked to app with data: ${JSON.stringify(data)}`);
  }
}

  async componentDidMount() {
    Font.loadAsync({
      Ionicons: require('./assets/fonts/ionicons.ttf'),
    });

    const initialUrl = await Linking.getInitialURL();
    alert("initialUrl", initialUrl);

    Linking.addEventListener('url', this._handleUrl)
  }
  render() {
    return (
      <Root>
        <Navigation />
      </Root>
    );
  }
}
