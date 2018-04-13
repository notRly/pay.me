import {request} from 'graphql-request';
import Globals from '../navigation/globals';
import {UPDATE_ORDER_QUERY, GQL_HOST, SPECIALIST, CLIENT} from './constants';


export const updateStatus = async (status) => {
  if (!Globals.order) return;
  const result = await request(GQL_HOST, UPDATE_ORDER_QUERY, {input: {orderId: Globals.order.id, status}});
}


export const saveCardDataToLocalStorage = async (data) => {
  await AsyncStorage.setItem('CardData', data);
}

export const getSavedCardFromLocalStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('CardData');
    if (value !== null){
      return value;
    }
  } catch (error) {
    return null;
  }
}

export const isVaidCreditCard = (card, version) => {
  const {cvc, expiry, name, number, type} = card;
  const isCvc = /[\d]{0,3}/.test(cvc) && cvc.length === 3;
  const isExpiry = expiry.split('/').length === 2 
    && expiry.split('/')
      .map(i => /[/d]{0,2}/.test(i)? i : null)
      .filter(Boolean).length === 2;
  const isName = name.split(' ').length === 2 
    && name.split(' ')
      .map(i => i.length > 2  ? i : null)
      .filter(Boolean).length === 2;
  const isNum = number.split(' ')
    .map(i => i.length === 4 && /\d{0,4}/.test(i) ? i : null)
    .filter(Boolean).length === 4;
  
  return version === CLIENT
    ? isCvc && isExpiry && isName && isNum
    : isName && isNum;
}
