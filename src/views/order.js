import * as React from 'react';
import {request} from 'graphql-request';
import {StyleSheet, View} from 'react-native';
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
  Row,
  ListItem,
  List,
  Left,
  Body,
  Item,
  Icon,
  Input,
} from 'native-base';
import {upperFirst} from '../utils';
import Globals from '../navigation/globals';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import Avatar from './components/avatar';
import qs from 'qs';
import {updateStatus, goToCheck} from './actions';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');
import {
  CLIENT,
  ORDER_QUERY,
  ORDER_TITLE,
  CLIENT_PROBLEMS,
  GQL_HOST,
  STEND_HOST,
  SENDED_PAYMENT_STATUS,
  REQUEST_PAYMENT_STATUS,
  RECEIVED_PAYMENT_STATUS,
} from './constants';

export default class Order extends React.Component {
  state = {
    loading: true,
    price: null,
  };

  static navigationOptions = ORDER_TITLE;

  async componentDidMount() {
    await this.fetchOrder();
    this.updateTitle();
    this.updatePrice();
    this.setState({loading: false});
  }

  fetchOrder = async () => {
    const {state: {params: {orderId, alreadyLoaded}}} = this.props.navigation;
    if (Globals.order && alreadyLoaded) return;

    const result = await request(GQL_HOST, ORDER_QUERY, {orderId});
    Globals.order = result.orders[0];
  };

  updatePrice = () => {
    if (Globals.order.paymentStatus !== RECEIVED_PAYMENT_STATUS)
      this.setState({price: Globals.order.paymentPrice && '' + Globals.order.paymentPrice});
  };

  updateTitle = () => {
    this.props.navigation.setParams({});
  };

  goToPaymentType = () => {
    const {navigate} = this.props.navigation;
    navigate('PaymentType');
  };

  goToRequestPayment = () => {
    const {navigate} = this.props.navigation;
    navigate('Payment', {paymentType: 'CARD_TO_CARD', price: this.state.price});
  };

  goToCheck = () => {
    goToCheck(this.props.navigation);
  };

  onChangePrice = price => {
    this.setState({price});
  };

  applyPayment = () => {
    updateStatus(RECEIVED_PAYMENT_STATUS, this.state.price);
    this.props.navigation.navigate('PaymentSuccess');
  };

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
      },
    );
  };

  render() {
    if (this.state.loading)
      return (
        <StyleProvider style={getTheme(theme)}>
          <Container>
            <Content>
              <Spinner color="red" />
            </Content>
          </Container>
        </StyleProvider>
      );

    if (!Globals.order)
      return (
        <StyleProvider style={getTheme(theme)}>
          <Container>
            <Content>
              <Card>
                <H2 style={styles.title2}>Заказ не найден</H2>
              </Card>
            </Content>
          </Container>
        </StyleProvider>
      );

    const {
      name,
      price,
      paymentPrice,
      subjects,
      aim,
      executor,
      paymentStatus,
    } = Globals.order;

    if (Globals.version === CLIENT)
      return (
        <StyleProvider style={getTheme(theme)}>
          <Container>
            <Content style={styles.content} withPadding>
              <View>
                <H2 style={styles.title2}>Имя клиента</H2>
                <Text>{name}</Text>
              </View>

              <View style={styles.withPadding}>
                <H2 style={styles.title2}>Сумма к оплате</H2>
                <Text style={styles.price}>{paymentPrice || price} ₽</Text>
              </View>

              <View style={styles.withPadding}>
                <H2 style={styles.title2}>Услуги</H2>
                <Text>{upperFirst(subjects)}</Text>
                {aim && <Text note>{aim}</Text>}
              </View>

              <View style={styles.withPadding}>
                <H2 style={styles.title2}>Специалист</H2>
                <List style={styles.list}>
                  <ListItem avatar>
                    <Left style={styles.withoutPadding}>
                      <Avatar path={executor && executor.avatar} />
                    </Left>
                    <Body>
                      <Text style={styles.fz20}>
                        {executor && executor.name}
                      </Text>
                      <Text note>
                        {executor &&
                          upperFirst(
                            (executor.topServices || [])
                              .map(({name}) => name)
                              .join(', '),
                          )}
                      </Text>
                    </Body>
                  </ListItem>
                </List>
              </View>
            </Content>

            <Footer
              style={
                paymentStatus === RECEIVED_PAYMENT_STATUS
                  ? styles.footer2
                  : styles.footer
              }
            >
              {paymentStatus === RECEIVED_PAYMENT_STATUS ? (
                <Button block success onPress={this.goToCheck}>
                  <Text>Квитанция об оплате</Text>
                </Button>
              ) : (
                <List>
                  <ListItem style={styles.footerItem}>
                    <Button block onPress={this.goToPaymentType}>
                      <Text>Выбрать способ оплаты</Text>
                    </Button>
                  </ListItem>
                  <ListItem style={styles.footerItem}>
                    <Button transparent onPress={this.showProblemActions}>
                      <Text style={styles.link}>Это ошибка</Text>
                    </Button>
                  </ListItem>
                </List>
              )}
            </Footer>
          </Container>
        </StyleProvider>
      );

    // Для спеца
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content style={styles.content} withPadding>
            <View style={styles.withPadding}>
              <H2 style={styles.title2}>Услуги</H2>
              <Text>{upperFirst(subjects)}</Text>
              {aim && <Text note>{aim}</Text>}
            </View>

            <View style={styles.withPadding}>
              <H2 style={styles.title2}>Стоимость работы</H2>
              <Item success={!!this.state.price}>
                <Input
                  autoFocus={true}
                  keyboardType="numeric"
                  value={this.state.price}
                  disabled={
                    this.state.loading ||
                    paymentStatus === SENDED_PAYMENT_STATUS
                  }
                  onChangeText={this.onChangePrice}
                />
                {!!this.state.price && <Icon name="checkmark-circle" />}
              </Item>
            </View>
            {paymentStatus === SENDED_PAYMENT_STATUS ? (
              <Button
                transparent
                style={styles.button}
                onPress={this.applyPayment}
              >
                <Text>Подтвердить получение платежа</Text>
              </Button>
            ) : (
              <Button
                block
                style={styles.button}
                onPress={this.goToRequestPayment}
                disabled={!this.state.price}
              >
                <Text transparent>Продолжить</Text>
              </Button>
            )}
          </Content>
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
  withPadding: {
    paddingTop: 20,
  },
  withoutPadding: {
    padding: 0,
  },
  list: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  footer: {
    padding: 20,
    height: 130,
    alignItems: 'center',
  },
  footer2: {
    padding: 20,
    height: 80,
    alignItems: 'center',
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  link: {
    color: '#0088c4',
  },
  price: {
    fontSize: 24,
  },
  fz20: {
    fontSize: 20,
  },
  button: {
    marginTop: 20,
  },
});
