import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input-new';
import {
    PAYMENT_TYPES, 
    SPECIALIST,
    CLIENT,
    REQUEST_PAYMENT_STATUS,
    SENDED_PAYMENT_STATUS
} from './constants';
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
import Globals from '../navigation/globals';
import {
    isVaidCreditCard,
    saveCardDataToLocalStorage,
    updateStatus,
} from './actions';

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        card: {
            number: '',
        }
    };
  }

  onChange = e => {
    const {cvc, expiry, name, number, type} = e.values;
    this.setState({
        card: {
            number: number,
        }
    });
    const isVaidCard = isVaidCreditCard(this.state.card);
    if(isVaidCard) {
        saveCardDataToLocalStorage(this.state.card)
    }
  };

  changePriceValue = orderId => {
    this.setState({orderId, fetchFailed: false});
  };

  getPaymentComponent = type => {
    const isVaidCard = isVaidCreditCard(this.state.card);
    let typPay;
    switch (type) {
      case 'CARD_TO_CARD':
        {
          typPay = (
            <View>
              <H2 style={styles.title2}>Введите данные вашей карты</H2>
                <CreditCardInput onChange={this.onChange} />
              <Button
                key={type}
                block
                style={isVaidCard? styles.buttonActive : styles.buttonDisable}
                onPress={this.goToPayment}
                disabled={!isVaidCard}
              >
              {Globals.version === CLIENT && <Text style={styles.continue}>Оплатить</Text>}
              {Globals.version === SPECIALIST && <Text style={styles.continue}>Продолжить</Text>}
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
    const {state: {params: {price}}} = this.props.navigation;
    if(Globals.version === CLIENT) {
        updateStatus(SENDED_PAYMENT_STATUS);
        this.props.navigation.navigate('PaymentSuccess');
        return;
    }

    updateStatus(REQUEST_PAYMENT_STATUS, price);
    this.props.navigation.navigate('PaymentSuccess');
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
  buttonActive: {
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
  },
  buttonDisable: {
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
    backgroundColor: 'grey',
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
