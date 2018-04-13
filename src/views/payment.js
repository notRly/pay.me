import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {CreditCardInput as CardClient} from 'react-native-credit-card-input';
import {CreditCardInput as CardSpec} from 'react-native-credit-card-input-fork';
import {PAYMENT_TYPES} from './constants';
import {WHITE_COLOR} from '../ui/constants';
import Globals from '../navigation/globals';
import {SPECIALIST, CLIENT, SENDED_PAYMENT_STATUS, REQUEST_PAYMENT_STATUS} from './constants';
import {
    updateStatus,
    saveCardDataToLocalStorage,
    isVaidCreditCard,
} from './actions';

 
import {
    Input,
    Button,
  } from 'native-base';

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            card: {
                cvc: "",
                expiry: "",
                name: "",
                number: "",
                type: '',
            }
        };
    }

     onChange = async (form) => {
        const {cvc, expiry, name, number, type} = form.values;
        this.setState({
            card: {
                cvc: cvc,
                expiry: expiry,
                name: name,
                number: number,
                type: type,
            }
        });
        if(isVaidCreditCard(this.state.card)) {
            saveCardDataToLocalStorage(this.state.card);
        }
    }

    getPaymentComponent = type => {
        const {card} = this.state;
        const isValidCard = isVaidCreditCard(card, Globals.version);
        let typPay;
        switch(type) {
            case 'CARD_TO_CARD': {
              typPay = 
              <View>
                <Text>Введите данные вашей карты</Text>
                {Globals.version === CLIENT &&
                    <CardClient 
                        onChange={this.onChange}
                        requiresName={true}
                        requiresCVC={true}/>}
                {Globals.version === SPECIALIST && 
                    <CardSpec 
                        onChange={this.onChange}
                        requiresName={true}/>}
                <View style={styles.formCash}>
                    <Text>Введите сумму оплаты:</Text>
                    <Input 
                        placeholder="сумма"/>
                    <Button
                      key={type}
                      block
                      transparent
                      dark
                      disabled={!isValidCard}
                      style={isValidCard ? styles.buttonActive: styles.buttonDisabled}
                      onPress={this.goToPayment}
                    >
                    {Globals.version === CLIENT &&
                      <Text style={styles.continue}>Оплатить заказ</Text>}
                    {Globals.version === SPECIALIST &&
                      <Text style={styles.continue}>Продолжить</Text>}
                    </Button>
                    </View>
                </View>
            }; break;
            default: {
                this.goToPayment()
            };break;
        }
        return typPay;
    }

    goToPayment = async () => {
        if(Globals.version === CLIENT) {
            updateStatus(SENDED_PAYMENT_STATUS);
            this.props.navigation.navigate('PaymentSuccess');
            return;
        }

        updateStatus(REQUEST_PAYMENT_STATUS);
        this.props.navigation.navigate('PaymentSuccess');
    }

    render() {
        const {state: {params: {paymentType}}} = this.props.navigation;
        return (
            <View>
                {this.getPaymentComponent(paymentType)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonActive: {
    height: 46,
    width: 250,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  buttonDisabled: {
    height: 46,
    width: 250,
    backgroundColor: 'gray',
    textAlign: 'center',
  },
  continue:{
      color: WHITE_COLOR,
  },
  formCash: {
    textAlign: 'center',
    
  }
});