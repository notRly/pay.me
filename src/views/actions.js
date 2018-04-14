import qs from 'qs';
import moment from 'moment';
import 'moment/locale/ru';
import {request} from 'graphql-request';
import Globals from '../navigation/globals';
import {UPDATE_ORDER_QUERY, GQL_HOST, STEND_HOST, SPECIALIST, CLIENT} from './constants';

moment.locale('ru');


export const updateStatus = async (status, price) => {
  if (!Globals.order) return;
  const result = await request(GQL_HOST, UPDATE_ORDER_QUERY, {input: {orderId: Globals.order.id, status, price}});
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

export const isVaidCreditCard = (card) => {
  const {number} = card;
  const cardNum = number.split(' ').join('');
  return cardNum.length >= 16 && /\d{0,16}/.test(cardNum);
}

export const goToCheck = (navigation) => {
    const {navigate} = navigation;
    const {order} = Globals;
    if (!order) return;
    navigate('Browser', {
      url:
        STEND_HOST +
        '/getcheck?' +
        qs.stringify({
          orderId: order.id,
          date: moment(order.receivd)
            .lang('ru')
            .format('LLL'),
          specialist: (order.executor || {}).name,
          inn: '7804034404',
          phone: order.phone,
          aim: order.aim || order.subjects,
          price: order.price,
          paymentType: Globals.paymentType,
        }),
    });
  };
