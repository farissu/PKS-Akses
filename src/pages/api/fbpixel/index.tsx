
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { URL_API_DEV } from '@/erp/Helpers/config';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const response = await axios.get(URL_API_DEV + 'fbpixel', {
        headers: {
            "X-Forwarded-for": String(req.headers.host)
        }
    })

    if (response.data.length > 0) {
        res.status(response.status).json(response.data[0].id_pixel);
    } else {
        res.status(response.status).json(response.data)
    }

}
