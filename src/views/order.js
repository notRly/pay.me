import * as React from 'react';
import {request} from 'graphql-request';
import {StyleSheet} from 'react-native';
import {
  Button,
  Title,
  Text,
  Container,
  Footer,
  Content,
  StyleProvider,
} from 'native-base';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import {ORDER_QUERY} from './constants';

export default class Order extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;

    return {
      title: params ? `Счёт к заказу №${params.orderId}` : 'Счёт к заказу',
    };
  };

  state = {};

  async componentDidMount() {
    const {state: {params: {orderId}}} = this.props.navigation;

    const result = await request(
      'http://192.168.119.66:8200/graphql',
      ORDER_QUERY,
      {orderId},
    );
    this.setState({order: result.orders[0]});
  }

  goToPayment = () => {};

  render() {
    const {order} = this.state;

    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content>
            <Title>Имя клиента</Title>
            <Text>{order && order.name}</Text>
          </Content>

          <Footer>
            <Button onPress={this.goToPayment}>
              <Text>Выбрать способ оплаты</Text>
            </Button>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}
