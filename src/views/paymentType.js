import * as React from 'react';
import {StyleSheet} from 'react-native';

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
import {ORDER_TITLE, PAYMENT_TYPES} from './constants';

export default class PaymentType extends React.Component {
  static navigationOptions = ORDER_TITLE;

  goToPayment = paymentType => () => {
    if (paymentType)
      this.props.navigation.navigate('Payment', {paymentType: paymentType});
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
});
