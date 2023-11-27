import { URL_API_DEV } from './Helpers/config';
import { ERP } from './Helpers/erp';

export class Environment {
	static modelName = 'cnt_cf.environment';
	string_value = '';
	icon=''

	constructor(data: Partial<Environment> = {}) {
		Object.assign(this, data);
	}

	static get columns() {
		const newClass = new this();
		const columns = Object.getOwnPropertyNames(newClass);

		// will result "['foo','bar']"
		return "['" + columns.join("','") + "']";
	}
}

export async function getEnvironment(columns = Environment.columns) {
    const params = {
        field: columns
    };

    const result = await ERP.select<Environment>(Environment.modelName, params);
    if (!result.ok) {
        return null;
    }
    return result.data;

}

export async function openApiEnvironment(host:string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
  
	var requestOptions = {
	  method: "GET",
	  headers: myHeaders,
	  redirect: "follow" as RequestRedirect,
	};
  
	var response = await fetch(URL_API_DEV+"/environment/get", requestOptions);
	let result = await response.json();
  
	return result.results;

}