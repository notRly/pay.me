import * as React from 'react';
import {BLACK_COLOR} from './constants';
import {View, Text, StyleSheet} from 'react-native';

export default ({children}): React.Node => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: BLACK_COLOR,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'left'
  },
});
