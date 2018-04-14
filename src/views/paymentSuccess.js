import React from 'react';
import {request} from 'graphql-request';
import {StyleSheet} from 'react-native';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import Globals from '../navigation/globals';
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
import {updateStatus} from './actions';
import {
  CLIENT,
  SPECIALIST,
  ORDER_QUERY,
  GQL_HOST,
  REQUEST_PAYMENT_STATUS,
  SENDED_PAYMENT_STATUS,
  RECEIVED_PAYMENT_STATUS,
  ORDER_TITLE,
} from './constants';

export default class PaymentSuccess extends React.Component {
  state = {loading: true};

  static navigationOptions = (params) => Globals.order && Globals.order.paymentStatus !== RECEIVED_PAYMENT_STATUS
   ? ORDER_TITLE(params)
   : 'Заказ №' + Globals.order && Globals.order.id;

  async componentDidMount() {
    await this.refetchOrder();
  }

  refetchOrder = async () => {
    if (!Globals.order) return;
    this.setState({loading: true});
    const result = await request(GQL_HOST, ORDER_QUERY, {orderId: Globals.order.id});
    Globals.order = result.orders[0];
    this.setState({loading: false});
  }

  updatePaymentStatus = async () => {
    this.setState({loading: true});
    await updateStatus(RECEIVED_PAYMENT_STATUS);
    await this.refetchOrder();
  }

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

    if (Globals.version === CLIENT) return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content>
            <H2 style={styles.title2}>Сделайте экран клиенту :)</H2>
          </Content>
        </Container>
      </StyleProvider>
    );


    if (Globals.version === SPECIALIST) {
      switch(Globals.order.paymentStatus) {
        case REQUEST_PAYMENT_STATUS: {
          return (
            <StyleProvider style={getTheme(theme)}>
              <Container>
                <Content>
                  <Text style={styles.title2}>Счёт отправлен клиенту</Text>
                  <Text style={styles.textEmail}>Клиенту отправлено СМС со ссылкой на оплату.</Text>
                  <Button transparent onPress={this.gotCash}>
                    <Text>Вы получили оплату наличными?</Text>
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
                <Content>
                  <Text style={styles.title2}>Заказ оплачен!</Text>
                  <Text style={styles.textEmail}>Клиент запросил подтверждение оплаты.</Text>
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
                <Content>
                  <Text style={styles.title2}>Заказ оплачен!</Text>
                  <Text style={styles.textEmail}>
                    Вы подтвердили, что клиент оплатил работу
                    наличными. Заказ завершён.
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
  }
});
