import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {CreditCardInput as CardClient} from 'react-native-credit-card-input';
import {CreditCardInput as CardSpec} from 'react-native-credit-card-input-fork';
import {PAYMENT_TYPES} from './constants';
import {WHITE_COLOR} from '../ui/constants';
import Globals from '../navigation/globals';
import {SPECIALIST, CLIENT, SENDED_PAYMENT_STATUS, REQUEST_PAYMENT_STATUS} from './constants';
import {updateStatus} from './actions';

 
import {
    Input,
    Button,
  } from 'native-base';

export default class Payment extends Component {

    constructor(props) {
        super(props);
        state = {
            cvc: "",
            expiry: "",
            name: "",
            number: "",
            type: '',
        };
    }

    validateCardData = () =>{}

     onChange = async (form) => {
        const {cvc, expiry, name, number, type} = form.values;
        this.setState({
            cvc: cvc,
            expiry: expiry,
            name: name,
            number: number,
            type: type,
        });
        try {
            await AsyncStorage.setItem('CardData', form.values);
        } catch (error) {}
    }

    getPaymentComponent = type => {
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
                      style={styles.button}
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
            this.props.navigation.navigate('Order', {orderId: Globals.order.id});
            return;
        }
        
        updateStatus(REQUEST_PAYMENT_STATUS);
        this.props.navigation.navigate('Order', {orderId: Globals.order.id});
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