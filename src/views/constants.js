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

