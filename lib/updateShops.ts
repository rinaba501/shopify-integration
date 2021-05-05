import moment from 'moment';
import fetchOrders from './fetchOrders';
import { updateLastInsert } from './fetchShops';

export default async function updateShops(shopData: any, apolloFetch) {
    let latestCreatedAt: moment.Moment = moment().subtract(180, 'days');
    if (shopData.tsz_last_scanned !== null && latestCreatedAt.isSameOrBefore(moment(shopData.tsz_last_scanned))) {
      latestCreatedAt = moment(shopData.tsz_last_scanned);
    }
  
    let edges = await fetchOrders(shopData.url, shopData.access_token, latestCreatedAt);
    
    for (let idx in edges) {
      let node = edges[idx].node;
      let money = node.totalPriceSet.shopMoney;
  
      let insertOrderQuery = `
        mutation insertOrder($orderId: String!, $currency: String!, $amount: numeric, $createdAt: timestamptz, $shop: String!) {
          insert_order_one(object: {id: $orderId, currency: $currency, amount: $amount, created_at: $createdAt, shop_url: $shop}) {
            id
          }
        }
      `;
  
      let variables = {
        orderId: node.id,
        currency: money.currencyCode,
        amount: parseFloat(money.amount),
        createdAt: node.createdAt,
        shop: shopData.url
      };
  
      console.log(variables);
      if (latestCreatedAt.isBefore(moment(node.createdAt))) {
        latestCreatedAt = moment(node.createdAt).add(1, 'second');
      }
  
      await apolloFetch({ query: insertOrderQuery, variables })
        .then((response) => {
          console.log(response);
        });
  
    }
    updateLastInsert(shopData.url, latestCreatedAt, apolloFetch);
  }
  