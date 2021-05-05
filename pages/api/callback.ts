import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import { createApolloFetch } from 'apollo-fetch';
import verifyHmac from "../../lib/verifyHmac";
import checkNonce from '../../lib/checkNonce';
import createHasuraApolloFetch from '../../lib/hasura';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
    let { query } = req;
    let requestBody = {
        client_id: process.env.NEXT_PUBLIC_API_KEY,
        client_secret: process.env.API_SECRET,
        code: query.code
    }

    let validShop = new RegExp(
        '^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$'
     );

    if (!validShop.test(String(query.shop))) {
        console.log("Incorrect Shop!");
        res.status(400).json({
            status: "failure",
            message: "Incorrect Shop!"
        })
        return;
    }

    if (!verifyHmac(query)) {
        console.log("Incorrect HMAC!");
        res.status(400).json({
            status: "failure",
            message: "Incorrect HMAC!"
        })
        return;
    }

    if (!checkNonce(String(query.shop), String(query.state))) {
        console.log("Returned nonce does not match the nonce in db");
        res.status(400).json({
            status: "failure",
            message: "Returned nonce does not match the nonce in db"
        })
        return;
    }

    let url = 'https://' + query.shop + '/admin/oauth/access_token';

    let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
    let responseJson: ConfirmationResponse | undefined = await response.json();
    // let responseJson: ConfirmationResponse = {
    //     access_token: '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',
    //     scope: 'write_orders,read_customers'
    // }

    let apolloFetch = createHasuraApolloFetch();

    const variables = {
        accessToken: responseJson.access_token,
        url: String(query.shop)
    };
    const insertAccessTokenQuery = `
    mutation insertAccessToken ($accessToken: String, $url: String){
            insert_shop(objects: {access_token: $accessToken, url: $shop}, 
            on_conflict: {constraint: shop_pkey, update_columns: access_token}) {
            returning {
                access_token
                url
            }
            }
        }
    `;
    
    apolloFetch({query: insertAccessTokenQuery, variables }).then(response => console.log(response));

    res.status(200).json({
        status: "success"
    })
}

export interface ConfirmationResponse {
    access_token?: string,
    scope: string
}
