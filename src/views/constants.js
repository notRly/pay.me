export const ORDER_QUERY = `
  query getOrderDetails($orderId: ID!) {
    orders(id: [$orderId]) {
      _id
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
      stoim
      executor {
        name
        avatar(width: 90, height: 120)
        gender
      }
    }
  }
`;

