import Globals from '../navigation/globals';

// export const STEND_HOST = 'http://pay-me-api-0eb0e41c-pay-me-api.warp.noregress.shot.x340.org';
export const STEND_HOST = 'http://localhost:8200';
export const GQL_HOST =
  STEND_HOST + '/graphql';

export const SPECIALIST = 'specialist';
export const CLIENT = 'client';

export const REQUEST_PAYMENT_STATUS = 'REQUEST_PAYMENT';
export const RECEIVED_PAYMENT_STATUS = 'RECEIVED_PAYMENT';
export const SENDED_PAYMENT_STATUS = 'SENDED_PAYMENT';

export const ORDER_QUERY = `
  query getOrderDetails($orderId: ID!) {
    orders(id: [$orderId]) {
      id: _id
      status
      receivd
      subjects
      program
      aim
      pupil
      siteId
      name
      phone
      email
      price: stoim
      paymentStatus
      paymentPrice
      executor {
        name
        avatar(width: 90, height: 120)
        gender
        topServices {
          name
        }
      }
    }
  }
`;

export const UPDATE_ORDER_QUERY = `
  mutation updateOrderParams($input: updateOrderInput!) {
    updateOrder(input: $input) {
      clientMutationId
    }
  }
`;

export const PROFI_PHONE_NUMBER = '8 800 555-74-52';

export const ORDER_TITLE = ({navigation}) => ({
  title: Globals.order ? `Счёт к заказу №${Globals.order.id}` : 'Счёт к заказу',
});

export const CLIENT_PROBLEMS = [
  {name: 'unknown-order', text: 'Это не мой заказ'},
  {name: 'bad-price', text: 'Неверная стоимость заказа'},
  {name: 'bad-work', text: 'Работа не выполнена'},
  {name: 'no-need-payment', text: 'Специалист отказался от оплаты'},
  {text: 'Отмена'},
];

export const PAYMENT_TYPES = {
  CARD_TO_CARD: 'Перевод на карту',
  CASH: 'Наличные',
  APPLE_PAY: 'Apple pay',
};
