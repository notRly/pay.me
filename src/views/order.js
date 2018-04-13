import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Order from '../order';

export default ({navigation}): React.Node => {
  const {state: {params: {orderId}}} = navigation;

  return (
    <View style={styles.container}>
      <Order orderId={orderId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});