import * as React from 'react';
import {request} from 'graphql-request';
import {StyleSheet} from 'react-native';
import {
  StyleProvider,
  ActionSheet,
  Card,
  Button,
  Title,
  Text,
  Container,
  Footer,
  Content,
  Spinner,
  H1,
  H2,
  H3,
} from 'native-base';
import Globals from '../navigation/globals';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import Avatar from './components/avatar';
import {ORDER_QUERY, ORDER_TITLE, CLIENT_PROBLEMS} from './constants';

export default class Order extends React.Component {
  state = {
    loading: true,
  };

  static navigationOptions = ORDER_TITLE;

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

  showProblemActions = () => {
    const CANCEL_INDEX = 4;
    ActionSheet.show(
      {
        options: CLIENT_PROBLEMS,
        cancelButtonIndex: CANCEL_INDEX,
      },
      index => {
        const problem = CLIENT_PROBLEMS[index].name;
        if (!problem) return;
        const {navigate} = this.props.navigation;
        navigate('ClientProblem', {problem});
      }
    )
  };

  render() {
    if (this.state.loading)
      return (
        <Container>
          <Content>
            <Spinner color="red" />
          </Content>
        </Container>
      );

    if (!Globals.order)
      return (
        <Container>
          <Content>
            <Card>
              <H2 style={styles.title2}>Заказ не найден</H2>
            </Card>
          </Content>
        </Container>
      );

    const {name, price, subjects, executor} = Globals.order;
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content>
            <H2 style={styles.title2}>Имя клиента</H2>
            <Text>{name}</Text>

            <H2 style={styles.title2}>Сумма к оплате</H2>
            <Text>{price}</Text>

            <H2 style={styles.title2}>Услуги</H2>
            <Text>{subjects}</Text>

            <H2 style={styles.title2}>Специалист</H2>
            <Avatar path={executor && executor.avatar} />
            <Text>{executor && executor.name}</Text>
          </Content>

          <Footer>
            <Button block onPress={this.goToPayment}>
              <Text>Выбрать способ оплаты</Text>
            </Button>
            <Button transparent onPress={this.showProblemActions}>
              <Text>Это ошибка</Text>
            </Button>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  title2: {
    paddingBottom: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
  },
});
