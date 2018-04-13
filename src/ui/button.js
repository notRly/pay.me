// @flow
import * as React from 'react';
import {PROFI_RED_COLOR} from './constants';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default ({onPress = () =>{}, title, disabled}): React.Node => {
  return (
    <TouchableOpacity
      accessibilityComponentType="button"
      disabled={disabled}
      onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text} disabled={disabled}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
      elevation: 4,
      backgroundColor: PROFI_RED_COLOR,
      borderRadius: 2,
  },
});