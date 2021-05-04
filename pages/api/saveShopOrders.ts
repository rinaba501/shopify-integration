import { createApolloFetch } from 'apollo-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function saveShopOrders(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(404).json({message: req.method + " is not accepted"});
    return;
  }

  let { body } = req;
  let shopUrl = body.input.arg1.shopUrl;
  let date = body.input.arg1.date;

  let apolloFetch = createApolloFetch({ uri: process.env.HASURA_URI });

  apolloFetch.use(({ request, options }, next) => {
    options.headers = {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      "content-type": "application/json"
    };
    next();
  });

  let accessToken = await fetchAccessToken(shopUrl, apolloFetch);

  if (accessToken == null) {
    res.status(404).json({
      status: "error"
    });
  }

  let edges = await fetchOrders(shopUrl, accessToken, date);

  for (let idx in edges) {
    let node = edges[idx].node;
    let money = node.totalPriceSet.shopMoney;

    let insertOrderQuery = `
      mutation insertOrder($orderId: String!, $currency: String!, $amount: numeric, $createdAt: timestamptz, $shop: String!) {
        insert_order_one(object: {order_id: $orderId, currency: $currency, amount: $amount, created_at: $createdAt, shop: $shop}) {
          order_id
        }
      }
    `;

    let variables = {
      orderId: node.id,
      currency: money.currencyCode,
      amount: parseFloat(money.amount),
      createdAt: node.createdAt,
      shop: shopUrl
    };

    console.log(variables);

    await apolloFetch({ query: insertOrderQuery, variables })
    .then((response) => {
      console.log(response);
    });
  }

  res.status(200).json({
    status: "success"
  });
};

async function fetchOrders(shopUrl: any, accessToken: string, date: any) {
  let shopifyUrl = "https://" + shopUrl + "/admin/api/graphql.json";
  let shopifyFetch = createApolloFetch({ uri: shopifyUrl });

  shopifyFetch.use(({ request, options }, next) => {
    options.headers = {
      "X-Shopify-Access-Token": accessToken,
      "content-type": "application/json"
    };
    next();
  });

  let query = 'created_at:' + date;
  let count = 10;
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

async function fetchAccessToken(shopUrl: String, apolloFetch: any) {

  let variables = {
    store: shopUrl
  };

  let getAccessToken = `
      query getAccessToken($store: String!) {
          stores_store_by_pk(store_name: $store) {
              access_token
          }
        }
  `;

  let accessToken: string;

  await apolloFetch({ query: getAccessToken, variables })
  .then((response: { data: { stores_store_by_pk: { access_token: string; }; }; }) => {
    accessToken = response.data.stores_store_by_pk.access_token;
  });
  return accessToken;
}

