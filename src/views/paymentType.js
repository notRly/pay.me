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
} from 'native-base';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';
import {ORDER_TITLE, PAYMENT_TYPES} from './constants';

export default class PaymentType extends React.Component {
  static navigationOptions = ORDER_TITLE;

  goToPayment = (paymentType) => () => {
    if (paymentType)
      this.props.navigation.navigate('Payment', {paymentType: paymentType});
  }

  render() {
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content>
            <H2 style={styles.title2}>Выберите способ оплаты</H2>
            {Object.keys(PAYMENT_TYPES).map(paymentType => {
              // TODO: впендошить иконку
              if (paymentType === PAYMENT_TYPES.APPLE_PAY) return (
                <Button key={paymentType} block onPress={this.goToPayment(paymentType)}>
                  <Text>{PAYMENT_TYPES[paymentType]}</Text>
                </Button>
              );

              return (
                <Button key={paymentType} block onPress={this.goToPayment(paymentType)}>
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
  title2: {
    paddingBottom: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
