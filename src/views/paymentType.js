import * as React from 'react';
import {StyleSheet} from 'react-native';
import Globals from '../navigation/globals';
import {
  StyleProvider,
  Button,
  Title,
  Text,
  Container,
  Footer,
  Content,
  CheckBox,
  H2,
  Icon,
} from 'native-base';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import {ORDER_TITLE, PAYMENT_TYPES, SENDED_PAYMENT_STATUS} from './constants';
import {updateStatus} from './actions';

export default class PaymentType extends React.Component {
  static navigationOptions = {
    title: 'Оплата заказа картой',
  };

  goToPayment = paymentType => () => {
    Globals.paymentType = PAYMENT_TYPES[paymentType];
    if (paymentType === 'CASH') {
      updateStatus(SENDED_PAYMENT_STATUS);
      this.props.navigation.navigate('PaymentSuccess');
      return;
    }
    if (paymentType)
      this.props.navigation.navigate('Payment', {paymentType: paymentType});
  };

  openBrowser = () => {
    const {navigate} = this.props.navigation;
    navigate('Browser', {
      url: 'http://profi.ru/documents/oferta/',
      back: 'Home',
    });
  };

  render() {
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container style={styles.container}>
          <Content style={styles.content} withPadding>
            <H2 style={styles.title2}>Выберите способ оплаты</H2>

            {Object.keys(PAYMENT_TYPES).map(paymentType => {
              // TODO: впендошить иконку
              if (PAYMENT_TYPES[paymentType] === PAYMENT_TYPES.APPLE_PAY)
                return (
                  <Button
                    key={paymentType}
                    transparent
                    dark
                    block
                    style={styles.button}
                    onPress={this.goToPayment(paymentType)}
                  >
                    <Text>{PAYMENT_TYPES[paymentType]} </Text>
                    <Icon name="logo-apple" style={styles.iosIcon} />
                  </Button>
                );

              return (
                <Button
                  key={paymentType}
                  block
                  transparent
                  dark
                  style={styles.button}
                  onPress={this.goToPayment(paymentType)}
                >
                  <Text>{PAYMENT_TYPES[paymentType]}</Text>
                </Button>
              );
            })}
          </Content>
          <Footer style={styles.footer2}>
            <Text onPress={this.openBrowser} style={styles.oferta}>
              Выбирая способ оплаты, вы&nbsp;соглашаетесь с&nbsp;<Text
                style={styles.link}
              >
                условиями оферты
              </Text>
            </Text>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title2: {
    paddingBottom: 40,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    height: 60,
  },
  iosIcon: {
    fontSize: 30,
    color: '#999',
    marginLeft: -12,
  },
  link: {
    color: '#0088c4',
  },
  oferta: {
    paddingTop: 7,
  },
});
