import gql from 'graphql-tag';

export const INSERT_ACCESS_TOKEN = gql`
    mutation insertAccessToken ($accessToken: String!, $store: String!){
        insert_stores_store(objects: {access_token: $accessToken, store_name: $store}, 
        on_conflict: {constraint: store_pkey, update_columns: access_token}) {
        returning {
            access_token
            store_name
            id
        }
        }
    }
`;