import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Link } from '../ui';


export default class Demo extends React.Component {
  static navigationOptions = {
    title: 'Demo',
  };

  goToOrderScreen = () => {
    const { navigate } = this.props.navigation;
    navigate('Order', { orderId: '12860261' })
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Оппппа!</Text>
        <Button onPress={this.goToOrderScreen}>Кнопуля</Button>
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