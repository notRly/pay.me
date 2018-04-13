import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Link, Title, Hint} from './src/ui';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Title>Заголовок</Title>
        <Button>Кнопуля</Button>
        <Link>Ссылка</Link>
        <Hint color="red">Красный текст</Hint>
        <Hint color="black">Черный текст текст</Hint>
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
