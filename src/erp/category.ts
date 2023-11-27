import { ERP } from "./Helpers/erp";
import { URL_API_DEV } from "./Helpers/config"

export class Category {
  static modelName = "cnt_cf.category";
  id = 0;
  name = "";
  slug = "";
  icon = "";
  active = true;
  sort = 100;
  write_date = "";

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

export async function findBySlug(slug: string) {
  const params = {
    field: "['name']",
    limit: "1",
    filters: `[('slug', '=', '${slug}')]`,
  };

  const result = await ERP.select<Category>(Category.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data[0];
}
export async function getCategory(id: number) {
  const params = {
    field: "['name']",
    filters: `[('id', 'in', [${id}])]`,
  };

  const result = await ERP.select<Category>(Category.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data[0];
}

export async function getAll(columns = Category.columns) {
  const params = {
    field: columns,
    filters: `[('active', '=', True)]`,
  };

  const result = await ERP.select<Category>(Category.modelName, params);
  if (!result.ok) {
    return null;
  }

  return result.data;
}

export async function openApiGetCategory(host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };
  var response = await fetch( URL_API_DEV + "category/getV2?id,name,slug", requestOptions);
  let result = await response.json();

  return result.results;
}
