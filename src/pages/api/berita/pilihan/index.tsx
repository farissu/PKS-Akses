import { getAll, getBySlug } from '@/erp/news';
import { find, findNew } from '@/erp/program';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    const news = await getBySlug(String(slug), String(req.headers.host));
    const program = await findNew(news[0].program_id, String(req.headers.host));
    if (news) {
        res.status(200).json({ news, program });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
