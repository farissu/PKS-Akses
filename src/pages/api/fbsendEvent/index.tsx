
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { URL_API_DEV } from '@/erp/Helpers/config';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const response = await axios.post(URL_API_DEV + 'fbpixel/sendEvent', req.body, {
        headers: {
            "X-Forwarded-for": String(req.headers.host)
        },
    })
    res.status(response.status).json(response.data);
}