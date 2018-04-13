import * as React from 'react';
import {request} from 'graphql-request';
import {StyleSheet} from 'react-native';
import {
  Card,
  Button,
  Title,
  Text,
  Container,
  Footer,
  Content,
} from 'native-base';
import Avatar from './components/avatar';
import {ORDER_QUERY} from './constants';

export default class Order extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state;

    return {
      title: params ? `Счёт к заказу №${params.orderId}` : 'Счёт к заказу',
    }
  };

  state = {};

  async componentDidMount() {
    const {state: {params: {orderId}}} = this.props.navigation;

    const result = await request(
      'http://192.168.119.66:8200/graphql',
      ORDER_QUERY,
      {orderId}
    );
    this.setState({order: result.orders[0]});
  }

  goToPayment = () => {};

  render () {
    const {order} = this.state;

    if (!order) return (
      <Container>
        <Content>
          <Card>
            <Title>Заказ не найден</Title>
          </Card>
        </Content>
      </Container>
    );

    return (
      <Container>
        <Content>
          <Card>
            <Title>Имя клиента</Title>
            <Text>{order.name}</Text>

            <Title>Сумма к оплате</Title>
            <Text>{order.stoim}</Text>

            <Title>Услуги</Title>
            <Text>{order.subjects}</Text>

            <Title>Специалист</Title>
            <Avatar path={order.executor && order.executor.avatar}/>
            <Text>{order.executor && order.executor.name}</Text>
          </Card>
        </Content>

        <Footer>
          <Button onPress={this.goToPayment}>
              <Text>Выбрать способ оплаты</Text>
          </Button>
          <Button transparent>
            <Text>Это ошибка</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}
