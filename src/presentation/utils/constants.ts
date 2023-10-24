import { colors } from "../styles/colors";

export const GENDER_OPTIONS = [
	{ value: "0", label: "Masculino" },
	{ value: "1", label: "Feminino" },
];

export const RACE_OPTIONS = [
	{ value: "0", label: "Branca" },
	{ value: "1", label: "Preta" },
	{ value: "2", label: "Parda" },
	{ value: "3", label: "Amarela" },
	{ value: "4", label: "Indígena" },
	{ value: "5", label: "Não declarado" },
	{ value: "6", label: "Não dispõe da informação" },
];

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

export const STATUS: Record<number, any> = {
	0: {
		name: "Aberto",
		color: colors.status[0],
		fontColor: colors.black[100],
	},
	1: {
		name: "Submetido",
		color: colors.status[1],
		fontColor: colors.white,
	},
	2: {
		name: "Avaliação",
		color: colors.status[2],
		fontColor: colors.black[100],
	},
	3: {
		name: "Indeferido",
		color: colors.status[3],
		fontColor: colors.black[100],
	},
	4: {
		name: "Deferido",
		color: colors.status[4],
		fontColor: colors.black[100],
	},
	5: {
		name: "Análise",
		color: colors.status[5],
		fontColor: colors.black[100],
	},
	6: {
		name: "Iniciado",
		color: colors.status[6],
		fontColor: colors.black[100],
	},
	7: {
		name: "Pendente",
		color: colors.status[7],
		fontColor: colors.black[100],
	},
	8: {
		name: "Cancelado",
		color: colors.status[8],
		fontColor: colors.black[100],
	},
	9: {
		name: "Encerrado",
		color: colors.status[9],
		fontColor: colors.black[100],
	},
};
