export default function getERPImage(url: string, model: string, id: number, column: string) {
	return `${url}/web/content/${model}/${id}/${column}`;
}