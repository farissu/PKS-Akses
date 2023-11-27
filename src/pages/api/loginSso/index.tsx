import { findByEmail } from "@/erp/donatur";
import { NextApiResponse, NextApiRequest } from "next";
import cookie from "js-cookie";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name } = _req.body;
    
  if (!email) {
    res.status(400).json({ error: "Missing required field: email" });
    return;
  }
  var response = await fetch(
    "https://cf2-cnt-be-dev1.cnt.id/api/cnt_cf.donor?filters=[('email','=','"+email+"')]",
    {
      method: "GET",
      headers: { "access-token": "9sSFv8Rn0cEIBrzeQiS2i89WMl6zjY" },
    }
  );
  var data = response.json();
  
}
