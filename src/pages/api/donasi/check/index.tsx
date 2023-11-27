import { findBySlugNew } from "@/erp/program";
import { findByIDDonasiNew } from "@/erp/transaction";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id_donasi } = req.query;
    const transaction = await findByIDDonasiNew(String(id_donasi), String(req.headers.host));
    
        res.status(200).json({ transaction });
}
