import {request} from 'graphql-request';
import Globals from '../navigation/globals';
import {UPDATE_ORDER_QUERY, GQL_HOST} from './constants';

export const updateStatus = async (status) => {
  if (!Globals.order) return;
  const result = await request(GQL_HOST, UPDATE_ORDER_QUERY, {input: {orderId: Globals.order.id, status}});
}
