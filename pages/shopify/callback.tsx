import { NextPageContext } from 'next';

export default function callback({access_token} : ConfirmationResponse) {
    console.log(access_token);
    return (
        <div>
            <h1>callback success!!!</h1>
            <p>Access Token: {access_token}</p>
        </div>
    );
}

export interface ConfirmationResponse {
    access_token: string,
    scope: string
}

callback.getInitialProps = async (ctx: NextPageContext) => {
    console.log('here');
    const { query } = ctx;

    const requestBody = {
        client_id: process.env.NEXT_PUBLIC_API_KEY,
        client_secret: process.env.API_SECRET,
        code: query.code
    }

    // if (query.shop)

    const url = 'https://' + query.shop + '/admin/oauth/access_token';
    console.log(url);

    // const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(requestBody)
    //   });
    // const responseJson: ConfirmationResponse | undefined = await response.json();
    const responseJson: ConfirmationResponse = {
        access_token: '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',
        scope: 'write_orders,read_customers'
    }
    console.log(responseJson);
    return responseJson;
}   
