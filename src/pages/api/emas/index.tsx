import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://harga-emas.org/');
        const html = await response.text();
        const start = html.indexOf('| Antam:') + '| Antam:'.length;
        const end = html.indexOf('/gr | Kurs');
        const priceString = html.substring(start, end);
        const priceNumber = parseInt(priceString);
        const priceNumeric = `Rp ${priceString.toLocaleString()}`;
        const priceNumericString = priceNumeric.replace(/[^0-9]/g, '');
        const price = parseInt(priceNumericString);
        res.status(200).json({ price });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch gold price' });
    }
}
