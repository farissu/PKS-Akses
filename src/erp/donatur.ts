import { URL_API_DEV } from "./Helpers/config";
import { ERP } from "./Helpers/erp";

export class Donatur {
  static modelName = "cnt_cf.donor";
  id?= 0;
  name = "";
  phone = "";
  email = "";

  constructor(data: Partial<Donatur> = {}) {
    Object.assign(this, data);
  }

  static get columns() {
    const newClass = new this();
    const columns = Object.getOwnPropertyNames(newClass);

    // will result "['foo','bar']"
    return "['" + columns.join("','") + "']";
  }
}

export async function findOrCreate({ name, phone, email }: Donatur) {
  const params = {
    field: Donatur.columns,
    limit: "1",
    filters: `[('email', '=', '${email}'),('phone', '=', '${phone}')]`,
  };

  const result = await ERP.select<Donatur>(Donatur.modelName, params);

  if (!result.ok) {
    // create donatur
    const newDonatur = await ERP.insert<Donatur>(Donatur.modelName, {
      name,
      phone,
      email,
    });

    if (!newDonatur.ok) {
      return null;
    }

    return newDonatur.data?.id;
  }

  return result.data[0].id;
}

export async function findByEmail(email: string, name: string) {
  const params = {
    field: Donatur.columns,
    limit: "1",
    filters: `[('email', '=', '${email}')]`,
  };

  const result = await ERP.select<Donatur>(Donatur.modelName, params);

  if (!result.ok) {
    const newDonatur = await ERP.insert<Donatur>(Donatur.modelName, {
      name,
      email: email,
    });

    if (!newDonatur.ok) {
      return null;
    }

    return newDonatur.data?.id;
  }

  return result.data[0].id;
}

export async function findByEmailOtp(email: string | null | undefined) {
  const params = {
    field: "['id','phone','name','email','affiliate_id']",
    limit: "1",
    filters: `[('email', '=', '${email}')]`,
  };

  const result = await ERP.select<Donatur>(Donatur.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data[0];
}

export async function findOrCreateByEmail(email: string, name: string, host: string) {
  var myHeaders = new Headers();
  var requestOptions = {
    method: "GET",
    headers: {
      "X-Forwarded-for": host,
      "x-token": "J2dBf9Yr6ZOYCP1Q0nhBpg7FpkUZergzl70BsKs2h0A1"
    },
    redirect: "follow" as RequestRedirect,
  };

  // Define an empty object for result
  let result: any = {};

  try {
    var response = await fetch(URL_API_DEV + "donor/get?email=" + email, requestOptions);
    result = await response.json();

    if (!result.count) {
      // create donatur
      var formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", "0");

      var requestInsertOptions = {
        method: "POST",
        headers: {
          "X-Forwarded-for": host,
          "x-token": "J2dBf9Yr6ZOYCP1Q0nhBpg7FpkUZergzl70BsKs2h0A1"
        },
        body: formData,
        redirect: "follow" as RequestRedirect,
      };

      var response = await fetch(URL_API_DEV + "donor/post", requestInsertOptions);
      result = await response.json();
    }
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }

  return result.results ? result.results[0] : null;
}


export async function findNameByID(id: number) {
  const params = {
    field: "['name']",
    limit: "1",
    filters: `[('id', '=', ${id})]`,
  };

  const result = await ERP.select<Donatur>(Donatur.modelName, params);

  if (!result.ok) {
    return "Hamba Allah";
  }

  return result.data[0].name;
}

export async function findById(id: number) {
  const params = {
    field: Donatur.columns,
    limit: "1",
    filters: `[('id', '=', ${id})]`,
  };

  const result = await ERP.select<Donatur>(Donatur.modelName, params);

  if (!result.ok) {
    return "Hamba Allah";
  }

  return result.data[0];
}

export async function findNameByIDNew(id: number, host: string) {
  var myHeaders = new Headers();
  myHeaders.append("X-forwarded-for", host);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  var response = await fetch(
    URL_API_DEV + "donor/get?id=" + id,
    requestOptions
  );
  let result = await response.json();

  return result.results;
}
