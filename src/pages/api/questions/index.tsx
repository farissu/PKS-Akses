import { URL_API_DEV } from "@/erp/Helpers/config";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  let values = _req.body;

  let host = _req.headers.host;

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", String(host));

  var formdata = new FormData();
  formdata.append("name", String(values.name));
  formdata.append("email",  String(values.email));
  formdata.append("whatsapp_number", String(values.whatsapp_number));
  formdata.append("topik", String(values.topik));
  formdata.append("detail", String(values.detail));

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow" as RequestRedirect,
  };

  fetch(URL_API_DEV+"questions/post", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).json({
        data: result,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        data: error,
      });
    });
}
