import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import {CreditCardInput} from 'react-native-credit-card-input';
import {PAYMENT_TYPES} from './constants';
import {
    Icon,
  } from 'native-base';

export default class Success extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.title2}>Заказ оплачен!</Text>
                <Text style={styles.textEmail}>Вам на почту отправлено письмо с квитанцией об оплате заказа</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    title2: {
        marginTop: 40,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textEmail: {
        marginTop: 20,
        fontSize: 15,
        textAlign: 'center',
    }
  });
