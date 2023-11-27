import { URL_API_DEV } from './Helpers/config';
import { ERP } from './Helpers/erp';

export class Category {
	static modelName = 'cnt_cf.category_faqs';
	id = 0;
	name = '';
	icon = '';

	constructor(data: Partial<Category> = {}) {
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
		field: "['name']",
		filters: `[('id', 'in', [${id}])]`
	};

	const result = await ERP.select<Category>(Category.modelName, params);

	if (!result.ok) {
		return null;
	}

	return result.data[0];
}

export async function getAll(host: string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(
	  URL_API_DEV+"categoryfaqs/get",
	  requestOptions
	);
	let result = await response.json();
  
	return result.results;
}