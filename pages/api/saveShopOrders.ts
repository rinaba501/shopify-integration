import { NextApiRequest, NextApiResponse } from 'next';
import fetchShop, { updateLastInsert } from '../../lib/fetchShops';
import fetchOrders from '../../lib/fetchOrders';
import createHasuraApolloFetch from '../../lib/hasura';
import moment from 'moment';
import updateShops from '../../lib/updateShops';

export default async function saveShopOrders(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(404).json({message: req.method + " is not accepted"});
    return;
  }
  let { body } = req;
  let shopUrl = body.input.arg1.shopUrl;
  await saveShopOrder(shopUrl, res);

  res.status(200).json({
    status: "success"
  });
};

export async function saveShopOrder(shopUrl: any, res: NextApiResponse<any>) {
  let apolloFetch = createHasuraApolloFetch();
  let shopData = await fetchShop(shopUrl, apolloFetch);

  if (shopData.access_token === null) {
    res.status(404).json({
      status: "error"
    });
  }
  await updateShops(shopData, apolloFetch);
}

