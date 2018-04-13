import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Link} from './src/ui';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Оппппа!</Text>
        <Button>Кнопуля</Button>
        <Link>Ссылка</Link>
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
