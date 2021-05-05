import { createApolloFetch } from "apollo-fetch";

export default function createHasuraApolloFetch() {
    let apolloFetch = createApolloFetch({ uri: process.env.HASURA_URI });
  
    apolloFetch.use(({ request, options }, next) => {
      options.headers = {
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
        "content-type": "application/json"
      };
      next();
    });
    return apolloFetch;
}