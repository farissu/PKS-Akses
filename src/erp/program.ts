import { URL_API_DEV } from "./Helpers/config";
import { ERP } from "./Helpers/erp";
import getERPImage from "./Helpers/getERPImage";
import { getCategory } from "./category";
import { Transaction } from "./transaction";

const ERP_URL = process.env.ERP_URL || "";
export class Program {
  static modelName = "cnt_cf.program";

  id = 0;
  name = "";
  description = "";
  thumbnail = "";
  slug = "";
  href = "";
  funded = 0;
  total_funded = 0;
  target = 0;
  minimum_amount = 0;
  expire_date = "";
  days_to_expire = 0;
  is_mendesak = "";
  transaction_ids: number[] = [];
  news_ids: number[] = [];
  category_ids: number[] = [];
  write_date = "";
  categoryname: string | undefined | null;
  sisa = 0;
  total_operational = 0;
  total_administration = 0;
  funded_distributed = 0;

  constructor(data: Partial<Program> = {}) {
    Object.assign(this, data);
  }

  static get columns() {
    const newClass = new this();
    const columns = Object.getOwnPropertyNames(newClass);
    // remove image to big if we send it via api, it will make them slow
    columns.splice(columns.indexOf("thumbnail"), 1);
    // will result "['foo','bar']"
    return "['" + columns.join("','") + "']";
  }
}

export async function find(id: number) {
  const params = {
    field: Program.columns,
    limit: "1",
    filters: `[('id', '=', ${id})]`,
  };

  const result = await ERP.select<Program>(Program.modelName, params);

  if (!result.ok) {
    return null;
  }

  const results = result.data.map((item) => {
    item.thumbnail = getERPImage(
      ERP_URL,
      Program.modelName,
      item.id,
      "thumbnail"
    );
    return item;
  });

  return results;
}


export async function findById(id: string, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV3?fields=slug,name&id=" + id, requestOptions);
  let result = await response.json();
  return result.results;
}

export async function findBySlug(slug: string) {
  const params = {
    field: Program.columns,
    limit: "1",
    filters: `[('slug', '=', '${slug}')]`,
  };

  const result = await ERP.select<Program>(Program.modelName, params);

  const results = result.data.map((item) => {
    item.thumbnail = getERPImage(
      ERP_URL,
      Program.modelName,
      item.id,
      "thumbnail"
    );
    return item;
  });

  return results;
}


export async function findByKey(key: string, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV3?fields=image_url,name,slug,total_funded,target,expire_date&key=" + key, requestOptions);
  let result = await response.json();
  return result.results;
}

export async function findAllProgram(offset: number, host: string, limit:number = 10) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV3?fields=image_url,name,slug,total_funded,target,expire_date&offset=" + offset + "&limit=" + limit, requestOptions);
  let result = await response.json();
  return result.results;
}


export async function findSort(sort: string, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV3?fields=image_url,name,slug,total_funded,target,expire_date,create_date&sort=" + sort, requestOptions);
  let result = await response.json();
  return result.results;
}

export async function findMendesak(is_mendesak: string, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV3?fields=image_url,name,slug,total_funded,target,expire_date,create_date&is_mendesak=" + is_mendesak, requestOptions);
  let result = await response.json();
  return result.results;
}

export async function findByCategoryID(id: string, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + `program/findByCategoryID/${id}?fields=image_url,name,slug,total_funded,target,expire_date,create_date`, requestOptions);

  let result = await response.json();
  return result.results;
}

export async function findBySlugNew(slug: string, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV3?fields=id,image_url,name,slug,total_funded,target,expire_date,total_donor,description,create_date,start_funded,option_amount,excerpt,excerpt_img_url,minimum_amount,atas_nama,fix_amount,is_fix_amount&slug=" + slug, requestOptions);
  let result = await response.json();
  return result.results;
}

export async function findBySlugSingle(slug: string, host: string, fields: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV3?fields=" + fields + "&slug=" + slug, requestOptions);
  let result = await response.json();
  return result.results;
}

export async function getByCategory(id: number) {
  const params = {
    field: Program.columns,
    filters: `[('category_ids', 'in', ${id})]`,
  };
  const result = await ERP.select<Program>(Program.modelName, params);

  if (!result.ok) {
    return null;
  }

  const results = result.data.map((item) => {
    item.thumbnail = getERPImage(
      ERP_URL,
      Program.modelName,
      item.id,
      "thumbnail"
    );
    return item;
  });

  return results;
}
// export async function getByNameCategory(categoryname: string) {
//   const params = {
//     field: Program.columns,
//     // filters: `[('categoryname', '=', '${categoryname}')]`,
//   };
//   const result = await ERP.select<Program>(Program.modelName, params);

//   if (!result.ok) {
//     return null;
//   }

//   const coba = await Promise.all(
//     result.data.map(async (item) => {
//       let itemCategory = await getCategory(item.category_ids[0]);
//       const name = itemCategory?.name && itemCategory.name.toLowerCase() === `${categoryname.toLowerCase()}` ? itemCategory.name : null;
//       item.categoryname = name;
//       item.thumbnail = getERPImage(
//         ERP_URL,
//         Program.modelName,
//         item.id,
//         "thumbnail"
//       );

//       return item;
//     })
//   ).then((items) => items.filter((item) => item.categoryname !== null));

//   return coba;
// }

export async function getByNameCategory(categoryname: string, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program?category_name=" + categoryname + "&limit=" + 15 + "&offset=" + 0, requestOptions);
  let result = await response.json();

  return result.results;
}

export async function findTransactionByProgramID(id: string, host: string, fields: string, limit: string, offset: string) {


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

  if (offset != undefined) {
    offset = "&offset=" + offset
  } else {
    offset = ""
  }


  var response = await fetch(URL_API_DEV + `transaction/findTransactionByProgramID/${id}?fields=${fields + limit + offset}`, requestOptions);
  let result = await response.json();
  return result.results;
}


export async function getByFunding() {
  const params = {
    field: Program.columns,
    limit: "5",
    sort: "total_funded desc",
  };
  const result = await ERP.select<Program>(Program.modelName, params);

  if (!result.ok) {
    return null;
  }
  const coba = await Promise.all(
    result.data.map(async (item) => {
      let itemCategory = await getCategory(item.category_ids[0]);
      item.categoryname = itemCategory?.name;
      item.thumbnail = getERPImage(
        ERP_URL,
        Program.modelName,
        item.id,
        "thumbnail"
      );

      return item;
    })
  );

  return coba;
}

export async function getByMendesak() {
  const params = {
    field: Program.columns,
    limit: "5",
    sort: "days_to_expire desc",
    filters: `[('is_mendesak', '=', True)]`,
  };
  const result = await ERP.select<Program>(Program.modelName, params);

  if (!result.ok) {
    return null;
  }

  const coba = await Promise.all(
    result.data.map(async (item) => {
      let itemCategory = await getCategory(item.category_ids[0]);
      item.categoryname = itemCategory?.name;
      item.thumbnail = getERPImage(
        ERP_URL,
        Program.modelName,
        item.id,
        "thumbnail"
      );

      return item;
    })
  );

  return coba;
}

export async function getAllProgram(column = Program.columns) {
  const params = {
    field: column,
    order: "create_date desc",
    // limit: "6",
  };
  const result = await ERP.select<Program>(Program.modelName, params);

  if (!result.ok) {
    return null;
  }
  const coba = await Promise.all(
    result.data.map(async (item) => {
      let itemCategory = await getCategory(item.category_ids[0]);
      item.categoryname = itemCategory?.name;
      item.thumbnail = getERPImage(
        ERP_URL,
        Program.modelName,
        item.id,
        "thumbnail"
      );

      return item;
    })
  );

  return coba;
}

export async function getSumDonatur(id: number) {
  const params = {
    groupby: "['donor_id']",
    filters: `[('program_id', '=', ${id})]`,
  };
  const result = await ERP.groupby<Program>(Transaction.modelName, params);

  if (!result.ok) {
    return 0;
  }
  return result.data;
}

export async function getCampaignsLikeByName(name: string) {
  const params = {
    field: Program.columns,
    // limit: 4,
    filters: `[("name","ilike","${name}")]`,
  };

  const result = await ERP.select<Program>(Program.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result;
}

export async function getProgram(
  limit = 6,
  offset = 0,
  column = Program.columns
) {
  const params = {
    field: column,
    order: "create_date desc",
    limit: `${limit}`,
    offset: `${offset}`,
  };
  const result = await ERP.select<Program>(Program.modelName, params);

  if (!result.ok) {
    return null;
  }
  const coba = await Promise.all(
    result.data.map(async (item) => {
      let itemCategory = await getCategory(item.category_ids[0]);
      item.categoryname = itemCategory?.name;
      item.thumbnail = getERPImage(
        ERP_URL,
        Program.modelName,
        item.id,
        "thumbnail"
      );

      return item;
    })
  );

  return coba;
}

export async function openApiProgramMendesak(host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/get?is_mendesak=true", requestOptions);
  let result = await response.json();

  return result.results;
}

export async function getSumDonaturNew(id: number, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "transaction/sum_donatur?program_id=" + id, requestOptions);
  let result = await response.json();

  return result.results;
}

export async function openApiProgram(
  limit = 6,
  offset = 0,
  host: string
) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program?limit=" + limit + "&offset=" + offset, requestOptions);
  let result = await response.json();

  return result.results;
}

export async function openApiProgramAll(
  host: string
) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV2", requestOptions);
  let result = await response.json();

  return result.results;
}

export async function findNew(id: number, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };


  var response = await fetch(URL_API_DEV + "program/getV3?fields=id,name,slug,image_url&id=" + id, requestOptions);
  let result = await response.json();

  return result.results;
}

export async function findSlug(slug: string, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV2?slug=" + slug, requestOptions);
  let result = await response.json();

  return result.results;
}

export async function newGetAll(host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "program/getV2", requestOptions);
  let result = await response.json();

  return result.results;
}

export async function rpcHome(host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(URL_API_DEV + "rpc/homeV2", requestOptions);
  let result = await response.json();
  return result;
}