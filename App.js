import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Link, Title, Hint} from './src/ui';
import {Input} from './src/ui/input';

import Order from './src/order';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Title>Заголовок</Title>
        <Button>Кнопуля</Button>
        <Link>Ссылка</Link>
        <Hint color="red">Красный текст</Hint>
        <Hint color="black">Черный текст текст</Hint>
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
