import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { id_donatur } = _req.body;
  const params = new URLSearchParams({
    donatur_id: id_donatur,
    token: "HJ123knlnasd%26sd1s"
  });
  

  const url = process.env.ERP_URL+`/donor/donation?${params.toString()}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    return res.status(200).json({
        data: data,
      });
  })
  .catch(error => {
    return res.status(400).json({
        data: error,
      });
  });
}
