
import { findByCategoryID } from "@/erp/program";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    // res.status(200).json({message :"success"})
    let program = await findByCategoryID(String(id), String(req.headers.host));
    if (program) {
        res.status(200).json({ program });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
