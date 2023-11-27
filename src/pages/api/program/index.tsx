import { getProgram, findAllProgram } from "@/erp/program";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { offset } = req.query;
    const program = await findAllProgram(Number(offset), String(req.headers.host));
    if (program) {
        res.status(200).json({ program });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
