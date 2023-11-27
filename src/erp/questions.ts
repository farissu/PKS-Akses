import { ERP } from "./Helpers/erp";
import objectPropToString from "./Helpers/objectPropToString";

const ERP_URL = process.env.ERP_URL;
export class Questions {
	static modelName = 'cnt_cf.questions';
	id = 0;
	name = '';
	email = '';
	whatsapp_number = '';
	topik = '';
	detail = '';
	lampiran = '';
	

	constructor(data: Partial<Questions> = {}) {
		Object.assign(this, data);
	}

	static get columns() {
		const newClass = new this();
		const columns = Object.getOwnPropertyNames(newClass);
		// remove image to big if we send it via api, it will make them slow
		// columns.splice(columns.indexOf('image'), 1);
		// will result "['foo','bar']"
		return "['" + columns.join("','") + "']";
	}
}
export async function create(data: Partial<Questions>) {

	const result = await ERP.insert<Questions>(Questions.modelName, objectPropToString(data));
	if (!result.ok) {
		return null;
	}
	return result.data?.id;

}