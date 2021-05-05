import nn from 'nonce-next';
import saveNonce from './saveNonce';

export default function createAuthUrl(shop: String) {
  let scopes = process.env.NEXT_PUBLIC_SCOPES;
  let redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  let nonce = nn.generate();
  saveNonce(shop, String(nonce));

  return `https://${String(body.shop)}/admin/oauth/authorize?client_id=${
    process.env.NEXT_PUBLIC_API_KEY
  }&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}`;
}