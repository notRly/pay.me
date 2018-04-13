import React, {Component} from 'react';
import {WHITE_COLOR, BORDER_COLOR} from './constants';
import {TextInput, StyleSheet} from 'react-native';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Useless Placeholder'};
  }

  render() {
    return (
      <TextInput
        onChangeText={text => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}
