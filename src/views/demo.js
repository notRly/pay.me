import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Link, Title, Hint, Input} from '../ui';

export default class Demo extends React.Component {
  static navigationOptions = {
    title: 'Demo',
  };

  goToOrderScreen = () => {
    const {navigate} = this.props.navigation;
    navigate('Order', {orderId: '12860261'});
  };

  render() {
    return (
      <View style={styles.container}>
        <Title>Заголовок</Title>
        <Button onPress={this.goToOrderScreen}>Кнопуля</Button>
        <Link>Ссылка</Link>
        <Hint color="red">Красный текст</Hint>
        <Hint color="black">Черный текст текст</Hint>
        <Input />
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
