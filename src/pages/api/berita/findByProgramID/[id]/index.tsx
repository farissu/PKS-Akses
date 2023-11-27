import { findByProgramID } from '@/erp/news';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { fields, limit, id } = req.query;
    const news = await findByProgramID(String(id), String(req.headers.host), String(fields), String(limit));
    if (news) {
        res.status(200).json({ news });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
