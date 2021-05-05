import { createApolloFetch } from "apollo-fetch";

export default async function checkNonce(shopUrl: String, nonce?: String) {
    const apolloFetch = createApolloFetch({uri: process.env.HASURA_URI});

    const variables = {
        url: shopUrl
    };

    const saveNonceQuery = `
        query nonceQuery($url: String!) {
            shop_by_pk(url: $url) {
                nonce
            }
          }
    `;

    apolloFetch.use(({ request, options }, next) => {
        options.headers = {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
          "content-type": "application/json"
        };
        next();
      });

    let savedNonce : String;
    
    apolloFetch({query: saveNonceQuery, variables }).then(response => {
        console.log(response);
        savedNonce = response.data.shop_by_pk.nonce;
    });

    return nonce === savedNonce;
}