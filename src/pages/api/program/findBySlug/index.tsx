
import { findBySlugNew } from "@/erp/program";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
    let program = await findBySlugNew(String(slug), String(req.headers.host));

    const url = `https://${req.headers.host}/program/${slug}`;
    if (program) {
        res.status(200).json({ program, url });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
