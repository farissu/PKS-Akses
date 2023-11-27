import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const values = _req.body;

  const email = String(values.email)

  if (!values.email) {
    res.status(400).json({ error: "Missing required field: email" });
    return;
  }

  const postData = {
    'method': 'email',
    'subject': "Verify Security Question",
    'to': email,
    'templateURL': "https://cf2-cnt-fe-dev1.cnt.id/akun/otp/otpTemplate",
    'host': "smtp.googlemail.com",
    'port': "465",
    'username': "nisharmawan@gmail.com",
    'password': "xpbxpuyraysbddta",
    'from': "Notifikasi <nisharmawan@gmail.com>"
  };
  
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(postData)) {
    body.append(key, value);
  }

  // const data = new FormData();
  // data.append('method', 'email');
  // data.append('subject', "Verify Security Question");
  // data.append('to', email);
  // data.append('templateURL', "https://cf2-cnt-fe-dev1.cnt.id/akun/otp/otpTemplate");
  // data.append('host', "smtp.googlemail.com");
  // data.append('port', "465");
  // data.append('username', "nisharmawan@gmail.com",);
  // data.append('password', "xpbxpuyraysbddta");
  // data.append('from', "Notifikasi <nisharmawan@gmail.com>");
  var response = await fetch("https://otp.cnt.id/create", {
    method: "POST",
    headers: { "Authorization": "k2Skd19KsJ4Mnl5smX" },
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.success){
        return res.status(200).json({
          data: data,
        });
      }else{
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
