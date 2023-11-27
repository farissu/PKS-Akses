import { URL_API_DEV } from "./Helpers/config";
import { ERP } from "./Helpers/erp";
import objectPropToString from "./Helpers/objectPropToString";
import { findNameByID } from "./donatur";
import { getPaymentLink } from "./online_payment";

const PUBLIC_PREFIX = process.env.ERP_URL;
export type TransactionHistory = {
  name: string;
  amount: number;
  doa_message: string;
  create_date: string;
};
export class Transaction {
  static modelName = "cnt_cf.transaction";
  id = 0;
  id_donasi = "";
  amount = 0;
  payment_id = 0;
  program_id = 0;
  no_bukti = "";
  donor_id = 0;
  create_date = "";
  doa_message = "";
  is_anonymous = false;
  affliater_code = "";
  payment_link = "";

  constructor(data: Partial<Transaction> = {}) {
    Object.assign(this, data);
  }

  static get columns() {
    const newClass = new this();
    const columns = Object.getOwnPropertyNames(newClass);

    // will result "['foo','bar']"
    return "['" + columns.join("','") + "']";
  }
}

export async function create(data: Partial<Transaction>) {
  const result = await ERP.insert<Transaction>(
    Transaction.modelName,
    objectPropToString(data)
  );

  if (!result.ok || !result.data) {
    return null;
  }
  return result.data;
}

export async function findByIDDonasi(id_donasi: string) {
  const params = {
    field: Transaction.columns,
    limit: "1",
    filters: `[('id_donasi', '=', '${id_donasi}')]`,
  };

  const result = await ERP.select<Transaction>(Transaction.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data[0];
}
export async function findByIDDonor(id: number) {
  const params = {
    field: Transaction.columns,
    filters: `[('donor_id', '=', ${id})]`,
  };

  const result = await ERP.select<Transaction>(Transaction.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data;
}

export async function findById(id: string) {
  const params = {
    field: Transaction.columns,
    limit: "1",
    filters: `[('id', '=', '${id}')]`,
  };

  const result = await ERP.select<Transaction>(Transaction.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data[0];
}

export async function getHistoryTransaksi(id: number, offset = 0) {
  const params = {
    field:
      "['amount','is_anonymous', 'doa_message', 'donor_id', 'create_date', 'is_anonymous']",
    offset: `${offset}`,
    filters: `[('program_id', '=', ${id}),('state','=','Paid')]`,
    order: "create_date desc",
  };

  const result = await ERP.select<Transaction>(Transaction.modelName, params);

  if (!result.ok) {
    return null;
  }

  const results = await Promise.all(
    result.data.map(async (transaction: any) => {
      return {
        name: await findNameByID(transaction.donor_id),
        amount: transaction.amount,
        doa_message: transaction.doa_message,
        create_date: transaction.create_date,
        is_anonymous : transaction.is_anonymous,
      };
    })
  );
  return results as TransactionHistory[];
}

export async function getHistoryTransaksiNew(id: number, host:string) {
  var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(URL_API_DEV+"transaction/history_donatur?program_id="+id, requestOptions);
	let result = await response.json();
  
	return result.results;
}

export async function getTransaction(column = Transaction.columns) {
	const params = {
		field: column
	};
	const result = await ERP.select<Transaction>(Transaction.modelName, params);

	if (!result.ok) {
		return {};
	}
  return result.data;
}


export async function getStatusTransaksi(id_donasi: string) {
	const params = {
		field: "['status','id_donasi']",
		// limit: '1',
		filters: `[('id_donasi', '=', ${id_donasi})]`
	};

	const result = await ERP.select<Transaction>(Transaction.modelName, params);

	if (!result.ok) {
		return null;
	}

	return result.data[0];
}

export async function findByIDDonasiNew(id_donasi: string, host: string) {
  var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};

	var response = await fetch(URL_API_DEV+"transaction/check?id_donasi="+id_donasi, requestOptions);
	let result = await response.json();
  
	return result;
}
export async function getStatusTransaksiNew(id_donasi: string, host:string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(URL_API_DEV+"transaction/check?id_donasi="+id_donasi, requestOptions);
	let result = await response.json();
  
	return result;
}

export async function getDetailDonasi(id_donasi: string, host:string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(URL_API_DEV+"transaction/check/detail?id_donasi="+id_donasi, requestOptions);
	let result = await response.json();
  
	return result;
}

export async function findByIdDonasiDua(id_donasi: string, host:string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(URL_API_DEV+"transaction/get?id_donasi="+id_donasi, requestOptions);
	let result = await response.json();
  
	return result;
}