import { ERP } from "./Helpers/erp";
import objectPropToString from "./Helpers/objectPropToString";
import { findNameByID } from "./donatur";
import { getPaymentLink } from "./online_payment";

const PUBLIC_PREFIX = process.env.ERP_URL;
export type TransactionHistory = {
  name: string;
  amount: number;
  doa_message: string;
  create_date: string;
};
export class TransactionCart {
  static modelName = "cnt_cf.transaction_cart";
  id = 0;
  id_donasi = "";
  amount = 0;
  payment_id = 0;
  program_ids = [];
  no_bukti = "";
  donor_id = 0;
  create_date = "";
  doa_message = "";
  is_anonymous = false;
  affliater_code = "";
  payment_link = "";

  constructor(data: Partial<TransactionCart> = {}) {
    Object.assign(this, data);
  }

  static get columns() {
    const newClass = new this();
    const columns = Object.getOwnPropertyNames(newClass);

    // will result "['foo','bar']"
    return "['" + columns.join("','") + "']";
  }
}

export async function createCart(data: Partial<TransactionCart>) {
  const result = await ERP.insert<TransactionCart>(
    TransactionCart.modelName,
    objectPropToString(data)
  );

  if (!result.ok || !result.data) {
    return null;
  }
  return result.data;
}

export async function findByIDDonasiCart(id_donasi: string) {
  const params = {
    field: TransactionCart.columns,
    limit: "1",
    filters: `[('id_donasi', '=', '${id_donasi}')]`,
  };

  const result = await ERP.select<TransactionCart>(TransactionCart.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data[0];
}
export async function findByIDDonorCart(id: number) {
  const params = {
    field: TransactionCart.columns,
    filters: `[('donor_id', '=', ${id})]`,
  };

  const result = await ERP.select<TransactionCart>(TransactionCart.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data;
}

export async function findByIdCart(id: string) {
  const params = {
    field: TransactionCart.columns,
    limit: "1",
    filters: `[('id', '=', '${id}')]`,
  };

  const result = await ERP.select<TransactionCart>(TransactionCart.modelName, params);

  if (!result.ok) {
    return null;
  }

  return result.data[0];
}

export async function getHistoryTransaksiCart(id: number, offset = 0) {
  const params = {
    field:
      "['amount','is_anonymous', 'doa_message', 'donor_id', 'create_date', 'is_anonymous']",
    offset: `${offset}`,
    filters: `[('program_id', '=', ${id}),('state','=','Paid')]`,
    order: "create_date desc",
  };

  const result = await ERP.select<TransactionCart>(TransactionCart.modelName, params);

  if (!result.ok) {
    return null;
  }

  const results = await Promise.all(
    result.data.map(async (transaction: any) => {
      return {
        name: await findNameByID(transaction.donor_id),
        amount: transaction.amount,
        doa_message: transaction.doa_message,
        create_date: transaction.create_date,
        is_anonymous : transaction.is_anonymous,
      };
    })
  );
  return results as TransactionHistory[];
}

export async function getTransactionCart(column = TransactionCart.columns) {
	const params = {
		field: column
	};
	const result = await ERP.select<TransactionCart>(TransactionCart.modelName, params);

	if (!result.ok) {
		return {};
	}
  return result.data;
}