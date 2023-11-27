import { findTransactionByProgramID } from '@/erp/program';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { fields, limit, id, offset } = req.query;
    const transaction = await findTransactionByProgramID(String(id), String(req.headers.host), String(fields), String(limit), String(offset));
    if (transaction) {
        res.status(200).json({ transaction });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
