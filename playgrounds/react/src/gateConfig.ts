export const gateConfig = {
	baseUrl: process.env.GATE_URL,
	organization: process.env.GATE_ORGANIZATION,
	addons: [
		{
			type: 'checkbox',
			label: 'Označením tohto políčka potvrdzujem, že som sa oboznámil/-a so Základnými informáciami o ochrane osobných údajov pre dotknutú osobu, ktoré sú určené pre uchádzačov o zamestnanie.',
			content: 'Abraka dabraka',
			required: true,
		}, {
			type: 'checkbox',
			label: 'Potvrdzujem, ze udaje su spravne',
			content: 'GDPR',
			gdpr: true,
		},
	],
};
