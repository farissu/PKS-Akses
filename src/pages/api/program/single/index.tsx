import { findBySlugSingle } from "@/erp/program";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
    const { fields } = req.query;
    const program = await findBySlugSingle(String(slug), String(req.headers.host), String(fields));
    if (program) {
        res.status(200).json({ program });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
