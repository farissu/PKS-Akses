
import { findByEmailOtp } from "@/erp/donatur";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  let values = _req.body;

  
  const email = String(values.email);
  
  
  const donor = await findByEmailOtp(email);
  
  if (donor) {
    try {
      res.status(200).json({ donor })
    } catch (e) {
    }
  }
}
