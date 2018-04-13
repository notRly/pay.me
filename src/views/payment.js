import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import {PAYMENT_TYPES} from './constants';
import {WHITE_COLOR} from '../ui/constants';
import {
    Input,
    Button,
  } from 'native-base';

export default class Payment extends Component {

    constructor(props) {
        super(props);
    }

    _onChangeCardToCard = e => {
        console.log(e);
    }

    getPaymentComponent = type => {
        let typPay;
        switch(type) {
            case 'CARD_TO_CARD': {
              typPay = 
              <View>
                <Text>Введите данные вашей карты</Text>
                <CreditCardInput 
                    onChange={this._onChangeCardToCard}
                    requiresName={true}
                    requiresCVC={true}/>
                <View style={styles.formCash}>
                    <Text>Введите сумму оплаты:</Text>
                    <Input 
                        placeholder="сумма"/>
                    <Button
                      key={type}
                      block
                      transparent
                      dark
                      style={styles.button}
                      onPress={this.goToPayment}
                    >
                      <Text style={styles.continue}>Продолжить</Text>
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

    goToPayment = () => {
        this.props.navigation.navigate('Success');
      };

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
  button: {
    height: 46,
    width: 250,
    backgroundColor: 'red',
    textAlign: 'center',
  },
  continue:{
      color: WHITE_COLOR,
  },
  formCash: {
    textAlign: 'center',
    
  }
});