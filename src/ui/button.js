import * as React from 'react';
import { PROFI_RED_COLOR, WHITE_COLOR } from './constants';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {Button, Text} from 'native-base';

export default ({onPress, disabled, children}): React.Node => {
  return (
    <TouchableOpacity
      accessibilityComponentType="button"
      disabled={disabled}
      onPress={onPress}>
      <Button style={styles.button}>
        <Text style={styles.text} disabled={disabled}>{children}</Text>
      </Button>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
      width: 250,
      backgroundColor: PROFI_RED_COLOR,
      borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 15,
    color: WHITE_COLOR,
  },
});