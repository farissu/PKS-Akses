import { findByProgramNew } from "@/erp/news";
import { findBySlugNew, getSumDonaturNew } from "@/erp/program";
import { getHistoryTransaksiNew } from "@/erp/transaction";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    let program = await findBySlugNew(String(slug), String(req.headers.host));

    let numDonatur = 0;
    let donatur: any[] = [];
    let news: any[] = [];

    // if (program.length != 0) {
    //     numDonatur = await getSumDonaturNew(program[0].id, String(req.headers.host));
    //     donatur = await getHistoryTransaksiNew(program[0].id, String(req.headers.host));
    //     news = await findByProgramNew(program[0].id, String(req.headers.host));
    // }

    const url = `https://${req.headers.host}/program/${slug}`;
    if (program) {
        res.status(200).json({ program, numDonatur, donatur, news, url });
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}
