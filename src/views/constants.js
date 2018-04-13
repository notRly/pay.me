import Globals from '../navigation/globals';

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
      executor {
        name
        avatar(width: 90, height: 120)
        gender
      }
    }
  }
`;

export const PROFI_PHONE_NUMBER = "8 800 555-74-52";

export const ORDER_TITLE = ({navigation}) => ({
  title: Globals.order
    ? `Счёт к заказу №${Globals.order.id}`
    : 'Счёт к заказу'
});

export const CLIENT_PROBLEMS = [
  {name: "unknown-order", text: "Это не мой заказ"},
  {name: "bad-price", text: "Неверная стоимость заказа"},
  {name: "bad-work", text: "Работа не выполнена"},
  {name: "no-need-payment", text: "Специалист отказался от оплаты"},
  {text: "Отмена"},
];

export const PAYMENT_TYPES = {
  CARD_TO_CARD: 'Перевод на карту',
  CASH: 'Наличные',
  APPLE_PAY: 'Apple pay',
};

