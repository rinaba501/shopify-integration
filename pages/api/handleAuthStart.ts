import { NextApiRequest, NextApiResponse } from 'next';
import nonce from 'nonce';
import saveNonce from '../../lib/saveNonce';
const createNonce = nonce();

export default function handleAuthStart(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(404).json({message: req.method + " is not accepted"});
    return;
  }

  let { body } = req;
  
  if (!body.shop) {
    res.status(401).json({ message: "Unauthorized: Required Query or Shop missing." });
    return;
  }

  let scopes = process.env.NEXT_PUBLIC_SCOPES;
  let redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  let nonce = createNonce();
  saveNonce(String(body.shop), String(nonce));

  const authUrl = `https://${String(body.shop)}/admin/oauth/authorize?client_id=${
    process.env.NEXT_PUBLIC_API_KEY
  }&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}`;

  res.status(200).json({
    redirectTo: authUrl
  });
};
