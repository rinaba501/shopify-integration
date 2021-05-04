import { NextApiRequest, NextApiResponse } from "next";

export default function cron(req: NextApiRequest, res: NextApiResponse) {
    console.log('called at', Date().toLocaleString());
    res.status(200).json({
        status: 'success'
      });;
}
