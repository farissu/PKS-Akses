import { ERP } from './Helpers/erp';

export class Affiliate {
	static modelName = 'res.users';
	id = 0;
	url_affliate = '';
	affliater_code = '';

	constructor(data: Partial<Affiliate> = {}) {
		Object.assign(this, data);
	}

	static get columns() {
		const newClass = new this();
		const columns = Object.getOwnPropertyNames(newClass);

		// will result "['foo','bar']"
		return "['" + columns.join("','") + "']";
	}
}

export async function getUrlAff(id: number) {
	const params = {
		field: Affiliate.columns,
		filters: `[('id', '=', '${id}')]`
	};

	const result = await ERP.select<Affiliate>(Affiliate.modelName, params);
	if (!result.ok) {
		return null;
	}

	return result.data[0];
}

export async function getAll(columns = Affiliate.columns) {
	const params = {
		field: columns,
	};

	const result = await ERP.select<Affiliate>(Affiliate.modelName, params);
	if (!result.ok) {
		return null;
	}

	return result.data;
}