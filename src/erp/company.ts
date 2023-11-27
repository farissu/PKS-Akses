import { URL_API_DEV } from './Helpers/config';
import { ERP } from './Helpers/erp';

export class Company {
	static modelName = 'res.company';
	name = '';
	street = '';
	image_url = '';
	phone = '';
	description = '';
	about_us = '';

	constructor(data: Partial<Company> = {}) {
		Object.assign(this, data);
	}

	static get columns() {
		const newClass = new this();
		const columns = Object.getOwnPropertyNames(newClass);

		// will result "['foo','bar']"
		return "['" + columns.join("','") + "']";
	}
}

export async function getCompany(columns = Company.columns) {
	const params = {
		field: columns,
		order: "create_date asc"
	};

	const result = await ERP.select<Company>(Company.modelName, params);
	if (!result.ok) {
		return null;
	}
	return result.data[0];

}

export async function findCompany(host: string, fields:string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};

	var response = await fetch(URL_API_DEV + "findCompany?fields=" + fields, requestOptions);
	let result = await response.json();

	return result.results[0];
}

export async function openApiCompany(host: string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};

	var response = await fetch(URL_API_DEV + "res_company/get", requestOptions);
	let result = await response.json();

	return result.results[0];
}
