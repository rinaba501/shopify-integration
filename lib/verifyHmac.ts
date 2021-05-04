
import safeCompare from './safeCompare';
import crypto from 'crypto';
import querystring from 'querystring';

export default function verifyHmac(query) {
  const { hmac, signature: _signature, ...map } = query;
  const orderedMap = Object.keys(map)
    .sort((v1, v2) => v1.localeCompare(v2))
    .reduce((sum, k) => {
      sum[k] = query[k];
      return sum;
    }, {});

  const message = querystring.stringify(orderedMap);
  console.log(message, "here");
  const compute_hmac = crypto
    .createHmac("sha256", process.env.API_SECRET)
    .update(message)
    .digest("hex");

  return safeCompare(hmac, compute_hmac);
}
