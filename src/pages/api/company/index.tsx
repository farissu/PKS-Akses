import { URL_API_DEV } from "@/erp/Helpers/config";
import { getCompany } from "@/erp/company";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const host = _req.headers.host;
    var response = await fetch(
      URL_API_DEV+'res_company/get',
      {
        method: "GET",
        headers: {
          'x-forwarded-for': String(host),
        }

      }
    )
    var company = await response.json();

    // const company = await getCompany();
    
    return res.status(200).json({
        company
      });
  
}
