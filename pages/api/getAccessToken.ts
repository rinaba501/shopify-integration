import { NextApiRequest, NextApiResponse } from 'next';
import nonce from 'nonce';
import saveNonce from './saveNonce';
const createNonce = nonce();

export default async function handleAuthStart(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(404).json({message: req.method + " is not accepted"});
    return;
  }

  let { body } = req;
  let shop = body.input.arg1.shop;
  
  if (!shop) {
    res.status(401).json({ message: "Unauthorized: Required Query or Shop missing." });
    return;
  }

  let scopes = process.env.NEXT_PUBLIC_SCOPES;
  let redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  let nonce = createNonce();
  saveNonce(String(shop), String(nonce));

  const authUrl = `https://${String(shop)}/admin/oauth/authorize?client_id=${
    process.env.NEXT_PUBLIC_API_KEY
  }&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}`;

  res.status(200).json({
    redirectTo: authUrl
  });

  // res.status(200).json({
  //     accessToken: 'dummy'
  //   });
};
