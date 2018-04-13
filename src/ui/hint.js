import * as React from 'react';
import {BLACK_COLOR, PROFI_RED_COLOR} from './constants';
import {Text, View, StyleSheet} from 'react-native';

export default ({children, color}): React.Node => {
  return (
    <View>
      <Text style={styles[color]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  black: {
    fontSize: 15,
    color: BLACK_COLOR,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },

  red: {
    fontSize: 15,
    color: PROFI_RED_COLOR,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },
});
