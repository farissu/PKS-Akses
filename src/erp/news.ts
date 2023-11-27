import { URL_API_DEV } from "./Helpers/config";
import { ERP } from "./Helpers/erp";
import getERPImage from "./Helpers/getERPImage";

const ERP_URL = process.env.ERP_URL || "";
export class News {
	static modelName = 'cnt_cf.news';
	id = 0;
	name = '';
	slug = '';
	description = '';
	image = '';
	program_id = 0;
	create_date = '';
	write_date = '';

	constructor(data: Partial<News> = {}) {
		Object.assign(this, data);
	}

	static get columns() {
		const newClass = new this();
		const columns = Object.getOwnPropertyNames(newClass);
		// remove image to big if we send it via api, it will make them slow
		columns.splice(columns.indexOf('image'), 1);
		// will result "['foo','bar']"
		return "['" + columns.join("','") + "']";
	}
}

export async function findBySlug(slug: string) {
	const params = {
		field: News.columns,
		limit: '1',
		filters: `[('slug', '=', '${slug}')]`,
		order: 'create_date desc'
	};

	const result = await ERP.select<News>(News.modelName, params);

	if (!result.ok) {
		return null;
	}

	const results = result.data.map((item) => {
		item.image = getERPImage(ERP_URL, News.modelName, item.id, 'image');
		return item;
	});

	return results;
}



export async function findByProgram(id: number, column = News.columns) {
	const params = {
		field: column,
		filters: `[('program_id', '=', ${id})]`,
		order: 'create_date desc'
	};

	const result = await ERP.select<News>(News.modelName, params);

	if (!result.ok) {
		return null;
	}

	const results = result.data.map((item) => {
		item.image = getERPImage(ERP_URL, News.modelName, item.id, 'image');
		return item;
	});

	return results;
}

export async function findByProgramNew(id: number, host: string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};

	var response = await fetch(URL_API_DEV + "news?field=name,image_url,id,slug,create_date&program_id=" + id, requestOptions);
	let result = await response.json();
	return result.results;
}


export async function findByProgramID(id: string, host: string, fields: string, limit: string) {


	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);
	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};

	if (limit != "undefined") {
		limit = "&limit=" + limit
	} else {
		limit = ""
	}
	var response = await fetch(URL_API_DEV + `news/${id}?fields=${fields + limit}`, requestOptions);
	let result = await response.json();
	return result.results;
}

export async function findByProgramSlug(slug: number, host: string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};

	var response = await fetch(URL_API_DEV + "news?field=image_url,description,id,slug&slug=" + slug, requestOptions);
	let result = await response.json();

	return result.results[0];
}

// export async function getAll(limit = 6, offset = 0, columns = News.columns) {
// 	const params = {
// 		field: columns,
// 		limit: `${limit}`,
// 		offset: `${offset}`,
// 		order: 'create_date desc'
// 	};

// 	const result = await ERP.select<News>(News.modelName, params);

// 	if (!result.ok) {
// 		return null;
// 	}

// 	const results = result.data.map((item) => {
// 		item.image = getERPImage(ERP_URL, News.modelName, item.id, 'image');
// 		return item;
// 	});

// 	return results;
// }

export async function getAll(limit = 3, offset = 0, host: string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};

	var response = await fetch(URL_API_DEV + "news?fields=id,name,image_url,slug,create_date&limit=" + limit + "&offset=" + offset, requestOptions);
	let result = await response.json();

	return result.results;

}


export async function findByKey(key: string, host: string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};

	var response = await fetch(URL_API_DEV + "news?fields=id,name,image_url,create_date&key=" + key, requestOptions);
	let result = await response.json();
	return result.results;
}



export async function getNews(limit = 6, offset = 0, host: string, fields: string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};
	let apiUrl = URL_API_DEV + "news?field=" + fields + "&limit=" + limit + "&offset=" + offset;
	var response = await fetch(apiUrl, requestOptions);
	let result = await response.json();
	return result.results;

}

export async function getBySlug(slug: string, host: string) {
	var myHeaders = new Headers();
	myHeaders.append("X-forwarded-for", host);

	var requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow" as RequestRedirect,
	};

	var response = await fetch(URL_API_DEV + "news?field=name,image_url,description,slug,create_date,write_date,program_id&slug=" + slug, requestOptions);
	let result = await response.json();
	return result.results;

}
