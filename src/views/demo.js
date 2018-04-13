import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Link, Title, Hint, Input} from '../ui';
import {Button, Text, Container, StyleProvider} from 'native-base';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';

export default class Demo extends React.Component {
  static navigationOptions = {
    title: 'Demo',
  };

  goToOrderScreen = () => {
    const {navigate} = this.props.navigation;
    navigate('Order', {orderId: '12860037'});
  };

  render() {
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Title>Заголовок</Title>
          <Button onPress={this.goToOrderScreen}>
            <Text>Click Me! </Text>
          </Button>
          <Link>Ссылка</Link>
          <Hint color="red">Красный текст</Hint>
          <Hint color="black">Черный текст текст</Hint>
          <Input />
        </Container>
      </StyleProvider>
    );
  }
}
