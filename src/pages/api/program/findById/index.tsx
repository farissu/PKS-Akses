
import { findById } from "@/erp/program";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    let program = await findById(String(id), String(req.headers.host));

    let numDonatur = 0;
    let donatur: any[] = [];
    let news: any[] = [];

    const url = `https://${req.headers.host}/program/${id}`;
    if (program) {
        res.status(200).json({ program, numDonatur, donatur, news, url });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
