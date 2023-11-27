import { getAll } from '@/erp/news';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { offset } = req.query;
    
    const news = await getAll(6, Number(offset), String(req.headers.host));
    if (news) {
        res.status(200).json({ news });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
