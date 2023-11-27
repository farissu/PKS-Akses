import { ERP } from './Helpers/erp';

export class Faspay {
	static modelName = 'online_payment.faspay';
	id = 0;
	trx_id = '';

	constructor(data: Partial<Faspay> = {}) {
		Object.assign(this, data);
	}

	static get columns() {
		const newClass = new this();
		const columns = Object.getOwnPropertyNames(newClass);

		// will result "['foo','bar']"
		return "['" + columns.join("','") + "']";
	}
}

export async function getFaspay(id: string) {
	const params = {
		field: "['trx_id']",
		filters: `[('bill_no', '=', '${id}')]`
	};

	const result = await ERP.select<Faspay>(Faspay.modelName, params);

	if (!result.ok) {
		return null;
	}

	return result.data[0];
}