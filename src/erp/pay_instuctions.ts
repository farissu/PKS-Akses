import { URL_API_DEV } from './Helpers/config';
import { ERP } from './Helpers/erp';

export class PayInstructions {
	static modelName = 'cnt_cf.pay_instructions';
	id = 0;
	title = '';
	description = '';
	payment_id = '';

	constructor(data: Partial<PayInstructions> = {}) {
		Object.assign(this, data);
	}

	static get columns() {
		const newClass = new this();
		const columns = Object.getOwnPropertyNames(newClass);

		// will result "['foo','bar']"
		return "['" + columns.join("','") + "']";
	}
}

export async function getCategory(id: number) {
	const params = {
		field: "['title']",
		filters: `[('id', 'in', [${id}])]`
	};

	const result = await ERP.select<PayInstructions>(PayInstructions.modelName, params);

	if (!result.ok) {
		return null;
	}

	return result.data[0];
}

export async function getAll(columns = PayInstructions.columns) {
	const params = {
		field: columns,
		filters: `[('active', '=', True)]`
	};

	const result = await ERP.select<PayInstructions>(PayInstructions.modelName, params);
	if (!result.ok) {
		return null;
	}

	return result.data;
}

// export async function getByIdPayment(payment_id: number) {
// 	const params = {
//         field: "['title','description']",
// 		filters: `[('payment_id.id', '=', '${payment_id}')]`
// 	};

// 	const result = await ERP.select<PayInstructions>(PayInstructions.modelName, params);
// 	if (!result.ok) {
// 		return null;
// 	}

// 	return result.data;
// }

export async function getByIdPayment(payment_id: number, host: string) {
	var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV+"pay-instructions/get?payment_id="+payment_id, requestOptions);
  let result = await response.json();

  return result.results;
}