import { findBySlugNew, openApiProgramMendesak } from "@/erp/program";
import { findByIDDonasiNew, getDetailDonasi } from "@/erp/transaction";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id_donasi } = req.query;
    const transaction = await getDetailDonasi(String(id_donasi), String(req.headers.host));
    
        res.status(200).json({ transaction });
}
