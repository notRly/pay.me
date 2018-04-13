import React, {Component} from 'react';
import {CreditCardInput} from 'react-native-credit-card-input-fork';

export default class CreditCards extends Component {
  constructor(props) {
    super(props);
  }

  _onChange = e => {

  }

  render() {
    return (
      <CreditCardInput
        onChange={this._onChange}
        requiresName={true}
        requiresCVC={false}/>
    );
  }
}
