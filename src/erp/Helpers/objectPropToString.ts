export default function objectPropToString(o: Record<string, any>): Record<string, string> {
	Object.keys(o).forEach((k) => {
		if (typeof o[k] === 'object') {
			o[k] = objectPropToString(o[k]); // call recursively
		} else {
			o[k] = '' + o[k];
		}
	});

	return o;
}