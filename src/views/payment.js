import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import {PAYMENT_TYPES} from './constants';
import {WHITE_COLOR} from '../ui/constants';
import {
  Input,
  Button,
  StyleProvider,
  Container,
  Content,
  H2,
} from 'native-base';
import getTheme from '../../native-base-theme/components/';
import theme from '../../native-base-theme/variables/platform';

export default class Payment extends Component {
  constructor(props) {
    super(props);
  }

  _onChangeCardToCard = e => {
    console.log(e);
  };

  changePriceValue = orderId => {
    this.setState({orderId, fetchFailed: false});
  };

  getPaymentComponent = type => {
    let typPay;
    switch (type) {
      case 'CARD_TO_CARD':
        {
          typPay = (
            <View>
              <H2 style={styles.title2}>Введите данные вашей карты</H2>
              <CreditCardInput
                onChange={this._onChangeCardToCard}
                requiresName={true}
                requiresCVC={true}
              />
              <Button
                key={type}
                block
                style={styles.button}
                onPress={this.goToPayment}
              >
                <Text style={styles.continue}>Продолжить</Text>
              </Button>
            </View>
          );
        }
        break;
      default:
        {
          this.goToPayment();
        }
        break;
    }
    return typPay;
  };

  goToPayment = () => {
    this.props.navigation.navigate('Success');
  };

  render() {
    const {state: {params: {paymentType}}} = this.props.navigation;
    return (
      <StyleProvider style={getTheme(theme)}>
        <Container>
          <Content style={styles.content} withPadding>
            {this.getPaymentComponent(paymentType)}
          </Content>{' '}
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
  },
  continue: {
    color: WHITE_COLOR,
  },
  title2: {
    paddingBottom: 40,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  content: {
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
});
