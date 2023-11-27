import { NextApiRequest, NextApiResponse } from 'next';
import { findByProgram } from "@/erp/news";
import { findByIDDonor } from "@/erp/transaction";

const id_donor = 112

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const login = req.cookies.login;

    let json_login;
    if (typeof login === "string") {
        try {
            json_login = JSON.parse(login);
        } catch (e) {
            console.error("Error parsing login cookie:", e);
        }
    }

    if (json_login && json_login.data && json_login.data.id) {
        let transaction = await findByIDDonor(json_login.data.id);
        let penyaluran = [];

        if (transaction) {
            for (let i = 0; i < transaction.length; i++) {
                penyaluran[i] = await findByProgram(transaction[i].program_id);
            }
        }

        res.status(200).json(penyaluran);
    } else {
        console.error("Invalid login cookie:", login);
        res.status(400).end();
    }
}

