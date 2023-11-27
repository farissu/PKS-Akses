import { ERP } from './Helpers/erp';

type OnlinePayment = {
	payment_link: string;
	status:string;
};

export class OnlinePay {
	static modelName = "online_payment.midtrans";
	id = 0;
	platform_transaction_id = "";
	status = "";

  
	constructor(data: Partial<OnlinePay> = {}) {
	  Object.assign(this, data);
	}
  
	static get columns() {
	  const newClass = new this();
	  const columns = Object.getOwnPropertyNames(newClass);
	  return "['" + columns.join("','") + "']";
	}
  }

export async function getPaymentLink(platform_transaction_id: string, payment_model: string) {

	const params = {
		field: `['payment_link']`,
		limit: '1',
		filters: `[('platform_transaction_id', '=', '${platform_transaction_id}')]`
	};

	const result = await ERP.select<OnlinePayment>(payment_model, params);

	if (!result.ok) {
		return '/donation/failed';
	}

	// incase payment_link didn't have one ex: FLIP
	if (!result.data[0].payment_link.includes('https')) {
		result.data[0].payment_link = 'https://' + result.data[0].payment_link;
	}

	return result.data[0].payment_link;
}

export async function getStatus(id_donasi: string) {
	const params = {
		field: "['status','platform_transaction_id']",
		// limit: '1',
		filters: `[('platform_transaction_id', '=', ${id_donasi})]`
	};

	const result = await ERP.select<OnlinePay>(OnlinePay.modelName, params);

	if (!result.ok) {
		return null;
	}

	return result.data[0];
}
