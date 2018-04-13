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
        style={styles.input}
        onChangeText={text => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: BORDER_COLOR,
  },
});
