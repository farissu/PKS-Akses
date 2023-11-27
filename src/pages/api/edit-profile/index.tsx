import { URL_API_DEV } from "@/erp/Helpers/config";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name, email, whatsapp } = _req.body;
  type PostData = {
    [key: string]: any;
  };

  const postData: PostData = {
    name: name,
    email: email,
    whatsapp: whatsapp,
  };

  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(postData)) {
    body.append(key, value);
  }

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", String(_req.headers.host));

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  var response = await fetch(URL_API_DEV+"donor/put/" + id + "?name="+name+"&email="+email+"&phone="+whatsapp, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return res.status(200).json({
        data: data,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        data: error,
      });
    });
}
