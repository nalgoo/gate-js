// ts-ignore
// random z netu, todo: prerobit
const isNumeric = (n) => {
	n = n.replace(",", ".")
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isValidRC(x: string) {
	x = x.trim()
	if (!isNumeric(x)) return false;
	if (!x) return false
	if (x.length === 0) return false
	if (x.length < 9) return false
	let year = parseInt(x.substr(0, 2), 10);
	let month = parseInt(x.substr(2, 2), 10);
	let day = parseInt(x.substr(4, 2), 10);
	let ext = parseInt(x.substr(6, 3), 10);
	if ((x.length === 9) && (year < 54))
		return true;
	let c = 0;
	if (x.length === 10)
		c = parseInt(x.substr(9, 1));
	let m = parseInt(x.substr(0, 9)) % 11;
	if (m === 10)
		m = 0;
	if (m !== c)
		return false;
	year += (year < 54) ? 2000 : 1900;
	if ((month > 70) && (year > 2003))
		month -= 70;
	else if (month > 50)
		month -= 50;
	else if ((month > 20) && (year > 2003))
		month -= 20;
	let d = new Date();
	if (month === 0) return false
	if (month > 12) return false
	if (day === 0) return false
	if (day > 31) return false

	return true;
}
