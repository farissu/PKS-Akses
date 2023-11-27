import { URL_API_DEV } from "./Helpers/config";
import { ERP } from "./Helpers/erp";

export class Faq {
  static modelName = "cnt_cf.faqs";
  id = 0;
  question = "";
  answer = "";

  constructor(data: Partial<Faq> = {}) {
    Object.assign(this, data);
  }

  static get columns() {
    const newClass = new this();
    const columns = Object.getOwnPropertyNames(newClass);

    // will result "['foo','bar']"
    return "['" + columns.join("','") + "']";
  }
}

// export async function getFAQ(id: number) {
// 	const params = {
// 		field: "['question','answer']",
// 		filters: `[('category_faqs_id', 'in', [${id}])]`
// 	};

// 	const result = await ERP.select<Faq>(Faq.modelName, params);

// 	if (!result.ok) {
// 		return null;
// 	}

// 	return result.data;
// }

export async function getFAQ(host:string, id:Number) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(
    URL_API_DEV+"faqs/get?category_faqs="+id,
    requestOptions
  );
  let result = await response.json();

  return result.results;
}

export async function getAll(columns = Faq.columns) {
  const params = {
    field: columns,
  };

  const result = await ERP.select<Faq>(Faq.modelName, params);
  if (!result.ok) {
    return null;
  }

  return result.data;
}
