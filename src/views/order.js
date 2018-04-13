import * as React from 'react';
import {request} from 'graphql-request';
import {StyleSheet} from 'react-native';
import {
  StyleProvider,
  Card,
  Button,
  Title,
  Text,
  Container,
  Footer,
  Content,
  Spinner,
} from 'native-base';
import Globals from '../navigation/globals';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import Avatar from './components/avatar';
import {ORDER_QUERY} from './constants';

export default class Order extends React.Component {
  state = {loading: true};

  static navigationOptions = ({navigation}) => {
    return {
      title: Globals.order ? `Счёт к заказу №${Globals.order.id}` : 'Счёт к заказу',
    };
  };

  async componentDidMount() {
    const {state: {params: {orderId}}} = this.props.navigation;

    const result = await request(
      'http://192.168.119.66:8200/graphql',
      ORDER_QUERY,
      {orderId},
    );
    Globals.order = result.orders[0];
    this.setState({loading: false});
  }

  goToPayment = () => {};

  render() {
    if (this.state.loading) return (
      <Container>
        <Content>
          <Spinner color='red' />
        </Content>
      </Container>
    );

    if (!Globals.order) return (
      <Container>
        <Content>
          <Card>
            <Title>Заказ не найден</Title>
          </Card>
        </Content>
      </Container>
    );

    const {name, price, subjects, executor} = Globals.order;
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content>
            <Card>
              <Title>Имя клиента</Title>
              <Text>{name}</Text>

              <Title>Сумма к оплате</Title>
              <Text>{price}</Text>

              <Title>Услуги</Title>
              <Text>{subjects}</Text>

              <Title>Специалист</Title>
              <Avatar path={executor && executor.avatar}/>
              <Text>{executor && executor.name}</Text>
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
      </StyleProvider>
    );
  }
}
