import { createApolloFetch } from "apollo-fetch";

export default function saveNonce(shop: String, nonce: String) {
    const apolloFetch = createApolloFetch({uri: process.env.HASURA_URI});
    console.log(nonce);

    const variables = {
        nonce: nonce,
        store: shop
    };
    const saveNonceQuery = `
    mutation SaveNonce ($nonce: String, $store: String){
            insert_stores_store(objects: {nonce: $nonce, store_name: $store}, 
            on_conflict: {constraint: store_pkey, update_columns: nonce}) {
            returning {
                nonce
                store_name
                id
            }
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
    
    apolloFetch({query: saveNonceQuery, variables }).then(response => console.log(response));

return nonce;
}