import { createApolloFetch } from "apollo-fetch";

export default function saveNonce(shopUrl: String, nonce: String) {
    const apolloFetch = createApolloFetch({uri: process.env.HASURA_URI});
    console.log(nonce);

    const variables = {
        nonce: nonce,
        url: shopUrl
    };
    const saveNonceQuery = `
    mutation saveNonce ($nonce: String, $url: String){
      insert_shop(objects: {nonce: $nonce, url: $url}, 
      on_conflict: {constraint: shop_pkey, update_columns: nonce}) {
        returning {
          url
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