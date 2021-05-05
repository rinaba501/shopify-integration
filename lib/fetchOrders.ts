import { createApolloFetch } from "apollo-fetch";
import moment from 'moment';

export default async function fetchOrders(shopUrl: any, accessToken: string, date: moment.Moment) {
    let shopifyUrl = "https://" + shopUrl + "/admin/api/graphql.json";
    let shopifyFetch = createApolloFetch({ uri: shopifyUrl });
  
    shopifyFetch.use(({ request, options }, next) => {
      options.headers = {
        "X-Shopify-Access-Token": accessToken,
        "content-type": "application/json"
      };
      next();
    });

    if (date === null) {
      date = moment().subtract(180, 'days');
    }
  
    let query = "created_at:>'" + date.toISOString() + "'";
    let count = 100;
    let variables = {
      query: query,
      count: count
    };
  
    let getOrdersQuery = `
      query getAccessToken($count: Int!, $query: String!) {
        orders(first: $count, query: $query) {
          edges {
            node {
              id
              totalPriceSet { 
                  shopMoney {
                      amount
                      currencyCode
                  }
              }
              createdAt
            }
          }
        }
      }  
    `;
  
    let edges: any;
  
    await shopifyFetch({ query: getOrdersQuery, variables })
      .then(response => {
        console.log(response);
        console.log(response.data.orders.edges);
        edges = response.data.orders.edges;
      });
    return edges;
  }