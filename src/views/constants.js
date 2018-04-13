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
    }
  }
`;

