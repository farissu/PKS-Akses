import { findByEmailOtp, findOrCreateByEmail } from "@/erp/donatur";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { uuid, code, email } = _req.body;

  if (!uuid) {
    res.status(400).json({ error: "Missing required field: uuid" });
    return;
  }

  if (!code) {
    res.status(400).json({ error: "Missing required field: code" });
    return;
  }
  if (!email) {
    res.status(400).json({ error: "Missing required field: email" });
    return;
  }
  // type PostData = {
  //   [code: string]: any;
  // };

  // const postData: PostData = {
  //   code : code+":"+email
  // };

  // const body = new URLSearchParams();
  // for (const [key, value] of Object.entries(postData)) {
  //   body.append(key, value);
  // }

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "k2Skd19KsJ4Mnl5smX");

  var formdata = new FormData();
  formdata.append("code", code+":"+email);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch("https://otp.cnt.id/" + uuid, requestOptions)
    .then((response) => response.json())
    .then(async (data) => {
      if (data.valid) {
        // const dataDonatur = await findOrCreateByEmail(email, name, String(_req.headers.host));

        // console.log(dataDonatur)
        // if (dataDonatur == null) {
        //   console.log("sini")
        //   return res.status(400).json({
        //     error: "Data tidak ditemukan",
        //   });
        // } else {
          return res.status(200).json({
            data: true,
          });
        // }
      } else {
        return res.status(400).json({
          error: "Error Something",
        });
      }
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
      });
    });
}
