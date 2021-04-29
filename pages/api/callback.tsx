import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

export default function callback({responseJson}: CallbackProps) {
    console.log(responseJson);
    return (
        <h1>callback success!!! {responseJson}</h1>
    );
}

export interface CallbackProps {
    responseJson: ConfirmationResponse | undefined
}

export interface ConfirmationResponse {
    access_token: string,
    scope: string
}

callback.getInitialProps = async (ctx: NextPageContext) => {
    console.log('here');
    const { query } = ctx;

    const requestBody = {
        client_id: query.client_id,
        client_secret: query.client_secret,
        code: query.code
    }

    const url = 'http://' + query.shop + '.myshopify.com/admin/oauth/access_token';
    console.log(url);

    const response = await fetch('/api/route-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
    const responseJson: ConfirmationResponse | undefined = await response.json();
    console.log(responseJson);
    return responseJson;
}   
