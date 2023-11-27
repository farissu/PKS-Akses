export default function parseQueryParameters(queryString: any) {
    const params = new URLSearchParams(queryString);
    const queryParams = {};
    // @ts-ignore
    for (const [key, value] of params.entries()) {
        // @ts-ignore
        queryParams[key] = value;
    }
    return queryParams;
}