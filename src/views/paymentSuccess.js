import React from 'react';
import {request} from 'graphql-request';
import {StyleSheet} from 'react-native';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import Globals from '../navigation/globals';
import {Image} from 'react-native';
import {
  StyleProvider,
  Spinner,
  ActionSheet,
  Container,
  Content,
  Button,
  Text,
  H2,
} from 'native-base';
import {updateStatus, goToCheck} from './actions';
import {
  CLIENT,
  SPECIALIST,
  ORDER_QUERY,
  GQL_HOST,
  STEND_HOST,
  REQUEST_PAYMENT_STATUS,
  SENDED_PAYMENT_STATUS,
  RECEIVED_PAYMENT_STATUS,
  ORDER_TITLE,
} from './constants';

export const AUTO_REFRESH = 5000;

export default class PaymentSuccess extends React.Component {
  state = {loading: true, silentLoading: false, currentStatus: null};
  interval = null;

  static navigationOptions = params => {
    if (
      Globals.order &&
      Globals.order.paymentStatus !== RECEIVED_PAYMENT_STATUS
    )
      return ORDER_TITLE(params);

    return {title: 'Заказ №' + Globals.order && Globals.order.id};
  };

  async componentDidMount() {
    await this.refetchOrder();
    this.startAutotoRefresh();
  }

  async componentWillUnmount() {
    clearInterval(this.interval);
  }

  refetchOrder = async () => {
    if (!Globals.order) return;
    this.setState({loading: true});
    const result = await request(GQL_HOST, ORDER_QUERY, {
      orderId: Globals.order.id,
    });
    Globals.order = result.orders[0];
    this.setState({loading: false, currentStatus: Globals.order.paymentStatus});
  };

  startAutotoRefresh = () => {
    this.setState({silentLoading: true});
    this.interval = setInterval(async () => {
      await this.refetchOrder();
      if (this.state.currentStatus !== Globals.order.paymentStatus) {
        clearInterval(this.interval);
        this.setState({currentStatus: Globals.order.paymentStatus});
      }
    }, AUTO_REFRESH);
  };

  updatePaymentStatus = async () => {
    this.setState({loading: true});
    await updateStatus(RECEIVED_PAYMENT_STATUS);
    await this.refetchOrder();
  };

  goToCheck = () => {
    goToCheck(this.props.navigation);
  };

  gotCash = () => {
    ActionSheet.show(
      {
        options: ['Клиент оплатил наличными', 'Отмена'],
        cancelButtonIndex: 1,
      },
      index => {
        if (index !== 1) this.updatePaymentStatus();
      },
    );
  };

  goToCheck = () => {
    goToCheck(this.props.navigation);
  };

  render() {
    if (this.state.loading && !this.state.silentLoading)
      return (
        <StyleProvider style={getTheme(theme)}>
          <Container>
            <Content style={styles.content}>
              <Spinner color="red" />
            </Content>
          </Container>
        </StyleProvider>
      );

    if (!Globals.order)
      return (
        <StyleProvider style={getTheme(theme)}>
          <Container>
            <Content style={styles.content}>
              <Card>
                <H2 style={styles.title2}>Заказ не найден</H2>
              </Card>
            </Content>
          </Container>
        </StyleProvider>
      );

    if (Globals.version === CLIENT) {
      switch (Globals.order.paymentStatus) {
        case SENDED_PAYMENT_STATUS: {
          return (
            <StyleProvider style={getTheme(theme)}>
              <Container>
                <Content style={styles.content}>
                  <Text style={styles.title2}>Заказ оплачен!</Text>
                  {Globals.paymentType == 'Apple pay' && (
                    <Image
                      source={require('../../assets/apple.gif')}
                      style={{
                        marginTop: 20,
                        marginBottom: -20,
                        height: 168,
                        width: 300,
                        flex: 1,
                        alignSelf: 'center',
                      }}
                    />
                  )}
                  <Text style={styles.textEmail}>
                    После подтверждения специалистом оплаты, вам будет
                    отправлена квитанция.
                  </Text>
                </Content>
              </Container>
            </StyleProvider>
          );
        }

        case RECEIVED_PAYMENT_STATUS: {
          return (
            <StyleProvider style={getTheme(theme)}>
              <Container>
                <Content style={styles.content}>
                  <Text style={styles.title2}>Заказ оплачен!</Text>
                  <Text style={styles.textEmail}>
                    Вам в почту отправлено письмо с квитанцией об оплате заказа.
                  </Text>
                  <Button
                    block
                    success
                    onPress={this.goToCheck}
                    style={styles.mt}
                  >
                    <Text>Квитанция об оплате</Text>
                  </Button>
                </Content>
              </Container>
            </StyleProvider>
          );
        }
      }
    }

    if (Globals.version === SPECIALIST) {
      switch (Globals.order.paymentStatus) {
        case REQUEST_PAYMENT_STATUS: {
          return (
            <StyleProvider style={getTheme(theme)}>
              <Container>
                <Content style={styles.content}>
                  <Text style={styles.title2}>Счёт отправлен клиенту</Text>
                  <Text style={styles.textEmail}>
                    Клиенту отправлено СМС со ссылкой на оплату.
                  </Text>
                  <Button
                    success
                    block
                    style={styles.mt}
                    onPress={this.gotCash}
                  >
                    <Text>Я получил оплату наличными</Text>
                  </Button>
                </Content>
              </Container>
            </StyleProvider>
          );
        }

        case SENDED_PAYMENT_STATUS: {
          return (
            <StyleProvider style={getTheme(theme)}>
              <Container>
                <Content style={styles.content}>
                  <Text style={styles.title2}>Заказ оплачен!</Text>
                  <Text style={styles.textEmail}>
                    Клиент запросил подтверждение оплаты.
                  </Text>
                  <Button onPress={this.updatePaymentStatus}>
                    <Text>Оплата получена</Text>
                  </Button>
                </Content>
              </Container>
            </StyleProvider>
          );
        }

        case RECEIVED_PAYMENT_STATUS: {
          return (
            <StyleProvider style={getTheme(theme)}>
              <Container>
                <Content style={styles.content}>
                  <Text style={styles.title2}>Заказ оплачен!</Text>
                  <Text style={styles.textEmail}>
                    Вы подтвердили, что клиент оплатил работу наличными. Заказ
                    завершён.
                  </Text>
                </Content>
              </Container>
            </StyleProvider>
          );
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  title2: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textEmail: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 20,
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  mt: {
    marginTop: 20,
  },
});
