export default function formatRupiah(nominal: number | string | null | undefined, withCurrency = true) {
	if (nominal === undefined || nominal === null || nominal === '') {
	  return '';
	}
  
	const formattedNominal = Number(nominal).toLocaleString("id-ID");
  
	return (withCurrency ? "Rp" : "") + formattedNominal;
  }
export function Currency(nominal: number | string | null | undefined, withCurrency = true) {
	if (nominal === undefined || nominal === null || nominal === '') {
		return '';
	}
	return (withCurrency ? '' : '') + nominal.toLocaleString().replace(/,/g, '.');
}