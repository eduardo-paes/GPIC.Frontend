export function cpfMask(value: string) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})/, "$1-$2")
		.replace(/(-\d{2})\d+?$/, "$1");
}

export function rgMask(value: string) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{2})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})/, "$1-$2")
		.replace(/(-\d{1})\d+?$/, "$1");
}

export function cepMask(value: string) {
	return value
		.replace(/\D/g, "")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{3})\d+?$/, "$1");
}

export function phoneMask(value: string) {
	const cleanedValue = value.replace(/\D/g, "");
	const isCellPhone = cleanedValue.length > 10;
	const DDD = cleanedValue.slice(0, 2);

	const mask = isCellPhone ? "(##) #####-####" : "(##) ####-####";

	let maskedValue = "";
	let i = 0;
	let j = 0;

	while (i < mask.length && j < cleanedValue.length) {
		if (mask[i] === "#") {
			maskedValue += cleanedValue[j];
			j++;
		} else {
			maskedValue += mask[i];
		}
		i++;
	}

	return { maskedValue, DDD };
}

export function removeNonNumeric(input: string) {
	return input.replace(/[^0-9]/g, "");
}

export function formatDateToISOString(date: Date | undefined) {
	if (date === undefined) return null;
	date = new Date(date);
	const dateTimeString = date.toISOString();
	return dateTimeString.split("T")[0];
}

export function formatDateToLocaleString(date: Date | string) {
	const brazilTimeZoneOffset = 3 * 60;
	date = new Date(date);
	const adjustedDate: Date = new Date(
		date.getTime() + brazilTimeZoneOffset * 60000
	);

	const day = adjustedDate.getUTCDate();
	const month = adjustedDate.getUTCMonth() + 1;
	const year = adjustedDate.getUTCFullYear();

	const formattedDate = `${day.toString().padStart(2, "0")}/${month
		.toString()
		.padStart(2, "0")}/${year}`;

	return formattedDate;
}

export function getPeriodNotice(date: Date | string): string {
	if (typeof date === "string") date = new Date(date);
	const year = date.getFullYear();
	const semester = date.getMonth() < 6 ? 1 : 2;
	return `${year}/${semester}`;
}
