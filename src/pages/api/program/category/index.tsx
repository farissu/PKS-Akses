import { openApiGetCategory } from "@/erp/category";
import { getByNameCategory, newGetAll, openApiProgramMendesak } from "@/erp/program";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { category } = req.query;
    
    
    const program = await getByNameCategory(String(category), String(req.headers.host));
    
    const layanan = await openApiGetCategory(String(req.headers.host));
    const mendesak = await openApiProgramMendesak(String(req.headers.host));

    if (program) {
        res.status(200).json({ program, layanan, mendesak });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
