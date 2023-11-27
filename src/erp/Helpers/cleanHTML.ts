export default function cleanHTML(text: string) {
	let result = cleanStyle(text);
	result = addDomainToImage(result);
	result = removeNewLine(result);
	result = removeTag(result);
	return result;
}

function cleanStyle(htmlText: string) {
	return htmlText.replace(/style="[^"]*"/g, '');
}

function addDomainToImage(text: string) {
	return text.replace(/\/web\/image/g, 'https://cf2-cnt-be-dev1.cnt.id//web/image');
}

function removeNewLine(text: string) {
	return text.replace(/<br>/g, '').replace(/<br\/>/g, '');
}

function removeTag(text: string) {
	return text.replace(/<p>/g, '').replace(/<\/p>/g, '');
}