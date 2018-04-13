import React, { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser } from 'expo';

export default class Browser extends Component {
  state = {
    result: null,
  };

  async componentDidMount () {
  	const {navigate, state: {params: {url, back}}} = this.props.navigation;
    await WebBrowser.openBrowserAsync(url);

    navigate(back);
  }

  render() {
    return ( 
    	<Text></Text>
    );
  }
}
