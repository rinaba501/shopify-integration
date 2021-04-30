import { useRouter } from 'next/router'
import React from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import saveNonce from './api/saveNonce';
import nonce from 'nonce';

const createNonce = nonce();

const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}

export default function Index() {
    let router = useRouter();
    let [shop, setShop] = useState('');

    let nonce = createNonce();

    let handleSubmit = preventDefault(() => {
        router.push({
          pathname: 'https://' + shop + '/admin/oauth/authorize',
          query: {
              client_id: process.env.NEXT_PUBLIC_API_KEY,
              scope: process.env.NEXT_PUBLIC_SCOPES,
              redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
              state: nonce
          }
        })
      })
    return (
        <div className="search-box">
            <form onSubmit={handleSubmit} className="search-bar">
                <TextField id="outlined-basic" label="Shop URL (ex: your-shop-url.myshopify.com)" variant="outlined" name="shop" style = {{width: 500}} placeholder="your-shop-url.myshopify.com" onChange={e => { setShop(e.currentTarget.value); }}/>
                <div className="button">
                    <Button variant="contained" color="primary" type="submit">Log In</Button>
                </div>
            </form>
            <style jsx>{`
                .search-box {
                    margin: 0 auto;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    -ms-transform: translate(-50%, -50%); /* for IE 9 */
                    -webkit-transform: translate(-50%, -50%); /* for Safari */
                    width: 500px;
                    height: 100px;
                    position: absolute;
                }

                .button {
                    display: flex;           /* establish flex container */
                    justify-content: center;
                    align-items: flex-end;
                    padding: 5px;
                }
            `}</style>
        </div>
    );
}
