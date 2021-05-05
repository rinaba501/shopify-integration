import { NextApiRequest, NextApiResponse } from "next";
import createHasuraApolloFetch from "../../lib/hasura";
import updateShops from "../../lib/updateShops";

export default async function cron(req: NextApiRequest, res: NextApiResponse) {
  console.log('called at', Date().toLocaleString());
  let apolloFetch = createHasuraApolloFetch();
  let shopData = await fetchShops(apolloFetch);

  for (let idx in shopData) {
    console.log(shopData[idx]);
    await updateShops(shopData[idx], apolloFetch);
  }
  res.status(200).json({
      status: 'success'
    });
}



export async function fetchShops(apolloFetch: any) {
  let getAccessToken = `
      query myQuery {
        shop {
          access_token
          tsz_last_scanned
          url
        }
      }
  `;

  let shops;

  await apolloFetch({ query: getAccessToken })
  .then(response => {
    shops = response.data.shop;
  });
  return shops;
}