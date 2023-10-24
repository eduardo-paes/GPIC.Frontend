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

export const STATES = {
	AC: "Acre (AC)",
	AL: "Alagoas (AL)",
	AP: "Amapá (AP)",
	AM: "Amazonas (AM)",
	BA: "Bahia (BA)",
	CE: "Ceará (CE)",
	DF: "Distrito Federal (DF)",
	ES: "Espírito Santo (ES)",
	GO: "Goiás (GO)",
	MA: "Maranhão (MA)",
	MT: "Mato Grosso (MT)",
	MS: "Mato Grosso do Sul (MS)",
	MG: "Minas Gerais (MG)",
	PA: "Pará (PA)",
	PB: "Paraíba (PB)",
	PR: "Paraná (PR)",
	PE: "Pernambuco (PE)",
	PI: "Piauí (PI)",
	RJ: "Rio de Janeiro (RJ)",
	RN: "Rio Grande do Norte (RN)",
	RS: "Rio Grande do Sul (RS)",
	RO: "Rondônia (RO)",
	RR: "Roraima (RR)",
	SC: "Santa Catarina (SC)",
	SP: "São Paulo (SP)",
	SE: "Sergipe (SE)",
	TO: "Tocantins (TO)",
};
