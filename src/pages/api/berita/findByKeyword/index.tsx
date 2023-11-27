import { findByKey } from '@/erp/news';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { keyword } = req.query;
    const news = await findByKey(String(keyword), String(req.headers.host));
    if (news) {
        res.status(200).json({ news });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
