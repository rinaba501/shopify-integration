import { createApolloFetch } from "apollo-fetch";

export default async function checkNonce(shop: String, nonce?: String) {
    const apolloFetch = createApolloFetch({uri: process.env.HASURA_URI});

    const variables = {
        store: shop
    };

    console.log(variables);
    const saveNonceQuery = `
        query nonceQuery($store: String!) {
            stores_store_by_pk(store_name: $store) {
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
        savedNonce = response.data.stores_store_by_pk.nonce;
    });

    return nonce === savedNonce;
}