import { URL_API_DEV } from './Helpers/config';
import { ERP } from './Helpers/erp';
import getERPImage from './Helpers/getERPImage';

const ERP_URL = process.env.ERP_URL || "";

export class Payment {
	static modelName = 'cnt_cf.payment';
	id = 0;
	name = '';
	account_number = '';
	logo = '';
	models = '';
	on_behalf_of = '';
	minimum_amount = 0;
	category = '';
	instruksi_bayar = '';
	// Not used in front end
	// active = true;
	// id_payment = '';

	constructor(data: Partial<Payment> = {}) {
		Object.assign(this, data);
	}

	static get columns() {
		const newClass = new this();
		const columns = Object.getOwnPropertyNames(newClass);

		// will result "['foo','bar']"
		return "['" + columns.join("','") + "']";
	}
}

export async function get() {
	const params = {
		field: Payment.columns,
		filters: `[('active', '=', True)]`,
		order: 'sequence'
	};
	const result = await ERP.select<Payment>(Payment.modelName, params);

	if (!result.ok) {
		return {};
	}

	const payments = result.data.reduce<Record<number, Payment>>((acc, payment) => {
		acc[payment.id] = payment;

		return acc;
	}, {});

	const results = result.data.map((item) => {
		item.logo = "data:image/jpeg;base64,"+item.logo;
		return item;
	  });

	return results;
}

export async function getNew(host:string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(URL_API_DEV+"payments", requestOptions);
	let result = await response.json();


	return result || [];
}

// export async function findByID(id: number) {
// 	const params = {
// 		field: Payment.columns,
// 		filters: `[('active', '=', True),('id', '=', ${id})]`,
// 		limit: '1'
// 	};
// 	const result = await ERP.select<Payment>(Payment.modelName, params);

// 	const results = result.data.map((item) => {
// 		item.logo = "data:image/jpeg;base64,"+item.logo;
// 		return item;
// 	  });

// 	return results;
// }

export async function findByID(id: number, host:string = '') {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(URL_API_DEV+"payment/get?id="+ id, requestOptions);
	let result = await response.json();
	return result.results;
}

export async function findCredential(vendor: string, host:string = '') {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(URL_API_DEV+"payment/credential?vendor="+ vendor, requestOptions);
	let result = await response.json();
	return result.results;
}
