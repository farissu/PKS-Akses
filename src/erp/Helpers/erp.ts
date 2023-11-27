import memoryCache from 'memory-cache';

type ERPGetOptions = {
	limit?: string;
	filters?: string;
	order?: string;
	field?: string;
	offset?: string;
	groupby?: string;
};

export class ERP {
	static url = process.env.ERP_URL;
	static email = process.env.ERP_EMAIL;
	static password = process.env.ERP_PASSWORD;
	static db = process.env.ERP_DB;

	static async select<T>(models: string, options: ERPGetOptions, cache = 1 * 60 * 1000) {
		if (cache) {
			const key = `${models}-${JSON.stringify(options)}`;
			const cachedValue = memoryCache.get(key);
			if (cachedValue) {
				return { ok: true, data: JSON.parse(cachedValue) as T[] };
			}
		}

		const access_token = await this.createAccessToken(cache);
		const searchParams = new URLSearchParams(options);
		try {
			const res = await fetch(`${this.url}/api/${models}?` + searchParams.toString(), {
				headers: { 'access-token': access_token }
			});

			if (!res.ok) {
				console.log(`Cannot GET ON Model : ${models}, params : `, options);
				console.log(await res.text());
				throw 'Error Get API';
			}

			const response = await res.json();

			// we move *_id column to become number than object
			// we do this so the class didn't have different structure when insert and get
			const result = response.results.map((result: any) => {
				for (const key in result) {
					if (result[key].id) {
						result[key] = result[key].id;
					}
				}

				return result;
			});

			if (cache) {
				const key = `${models}-${JSON.stringify(options)}`;
				memoryCache.put(key, JSON.stringify(result), cache);
			}

			return { ok: true, data: result as T[] };
		} catch (err) {
			return { ok: false, data: [] };
		}
	}

	// for now only support summing
	static async groupby<T>(models: string, options: ERPGetOptions) {
		const access_token = await this.createAccessToken();
		const searchParams = new URLSearchParams(options);
		try {
			const res = await fetch(`${this.url}/api/groupby/${models}?` + searchParams.toString(), {
				headers: { 'access-token': access_token }
			});

			if (!res.ok) {
				console.log(res, await res.text());
				throw 'Error Get API';
			}

			const response = await res.json();

			return { ok: true, data: response.count as number };
		} catch (err) {
			return { ok: false, data: 0 };
		}
	}

	static async insert<T>(models: string, data: Record<string, string>) {
		const access_token = await this.createAccessToken();
		console.log(access_token)
		try {
			const res = await fetch(`${this.url}/api/${models}`, {
				headers: {
					'access-token': access_token,
					'Content-type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				body: new URLSearchParams(data)
			});

			if (!res.ok) {
				console.log(res, await res.text());
				throw 'Error Get API';
			}

			const response = await res.json();

			return { ok: true, data: response as T };
		} catch (err) {
			return { ok: false, data: null };
		}
	}

	static async createAccessToken(cache = 60 * 60 * 1000) {
		if (cache) {
			const access_token = memoryCache.get('ERP_ACCESS_TOKEN');
			if (access_token) {
				return access_token;
			}
		}

		const postData: Record<string, string> = {
			username: this.email!,
			password: this.password!,
			db: this.db!
		};

		const res = await fetch(this.url + '/api/auth/get_tokens', {
			headers: { 'Content-type': 'application/x-www-form-urlencoded' },
			method: 'POST',
			body: new URLSearchParams(postData)
		});

		if (!res.ok) {
			console.log(await res.text());
			return '';
		}

		const result = await res.json();

		// Cache Query
		if (result.access_token && cache) {
			memoryCache.put('ERP_ACCESS_TOKEN', result.access_token, cache);
		}

		return result.access_token;
	}
}
