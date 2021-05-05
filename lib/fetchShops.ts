import moment from "moment";

export default async function fetchShop(shopUrl: String, apolloFetch: any) {

    let variables = {
      url: shopUrl
    };
  
    let getShop = `
      query getShop($url: String!) {
        shop_by_pk(url: $url) {
            access_token
            tsz_last_scanned
            url
        }
      }
    `;
  
    let shopData;
  
    await apolloFetch({ query: getShop, variables })
    .then((response: { data: { shop_by_pk: { access_token: string; }; }; }) => {
      shopData = response.data.shop_by_pk;
    });
    return shopData;
}

export async function updateLastInsert(shopUrl: String, dateTime: moment.Moment, apolloFetch: any) {
  let query = `
      mutation updateLastInsert($url: String!, $dateTime: timestamptz) {
        update_shop_by_pk(pk_columns: {url: $url}, _set: {tsz_last_scanned: $dateTime}) {
          tsz_last_scanned
        }
      }
    `;

  let variables = {
    url: shopUrl,
    dateTime: dateTime
  };

  apolloFetch({ query, variables}).then(response => {
    console.log(response);
  });
}