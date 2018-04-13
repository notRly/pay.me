import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Link} from './src/ui';
import {Input} from './src/ui/input';

import Order from './src/order';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Оппппа!</Text>
        <Button>Кнопуля</Button>
        <Link>Ссылка</Link>
        <Button title="Кнопуля"/>
        <Input />
        <Order orderId="12860261" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
