import nonce from 'nonce';
import saveNonce from './saveNonce';
const createNonce = nonce();

export default function createAuthUrl(shop: String) {
  let scopes = process.env.NEXT_PUBLIC_SCOPES;
  let redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  let nonce = createNonce();
  saveNonce(shop, String(nonce));

  return `https://${String(body.shop)}/admin/oauth/authorize?client_id=${
    process.env.NEXT_PUBLIC_API_KEY
  }&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}`;
}