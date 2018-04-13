import React, { Component } from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
      <TextInput
        style = {styles.input}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}


const styles = StyleSheet.create({
  input: {
      width: 345,
      height: 40,
      borderRadius: 4,
      borderColor: '#ffffff',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#d6d7d8',
  },
})
