import { useRouter } from 'next/router'
import React from 'react';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}

export default function Index() {
    const router = useRouter();
    const [shop, setShop] = useState('');

    const handleSubmit = preventDefault(() => {
        router.push({
          pathname: 'http://' + shop + '/admin/oauth/authorize',
          query: {
            //   client_id: process.env.API_KEY,
            //   scope: process.env.SCOPES,
            //   redirect_uri: process.env.REDIRECT_URI,
              state: '24abdb4a773b68d59d0e6b95355b4eceb2d9af80e12209fb'
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