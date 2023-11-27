import { NextApiRequest, NextApiResponse } from 'next';
import { URL_API_DEV } from '@/erp/Helpers/config';
import axios from 'axios';
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  var FormData = require('form-data');
  const values = _req.body;
  const id_donasi = String(values.id_donasi);
  const no_bukti = String(values.no_bukti);
  const name = String(values.name);
  const phone = String(values.phone);
  const email = String(values.email);
  const payment_id = Number(values.payment_id);
  const program_id = Number(values.program_id);
  // const program_ids = values.program_ids;
  const is_anonymous = Boolean(values.is_anonymous);
  const affliater_code = String(values.affliater_code);
  const amount = Number(String(values.amount).replace(/[^0-9]/g, ''));
  const doa_message = String(values.doa_message);
  const atas_nama = String(values.atas_nama);
  const quantity = Number(values.quantity);

  let host = _req.headers.host;

  var myHeaders = new Headers();
  myHeaders.append("X-Forwarded-for", String(host));

  var formdata = new FormData();
  formdata.append("name", name);
  formdata.append("phone", phone);
  formdata.append("email", email);
  formdata.append("no_bukti", no_bukti);
  formdata.append("payment_id", String(payment_id));
  formdata.append("program_id", String(program_id));
  formdata.append("is_anonymous", String(is_anonymous));
  formdata.append("amount", String(amount));
  formdata.append("affliater_code", String(affliater_code));
  formdata.append("doa_message", String(doa_message));
  formdata.append("atas_nama", String(atas_nama));
  formdata.append("quantity", String(quantity));

  const response = await axios.post(URL_API_DEV + "transaction", _req.body, {
    headers: {
      "X-Forwarded-for": String(host)
    }
  });


  res.status(response.status).json(response.data);
}
