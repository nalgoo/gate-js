import { ApplyOptionsType, GateConfigType } from '@gate-js/react';

export const gateConfig: GateConfigType = {
	baseUrl: process.env.GATE_URL as string,
	organization: process.env.GATE_ORGANIZATION as string,
};

export const applyOptions: ApplyOptionsType = {
	origin: 'facebook.com',
	addons: [
		{
			type: 'checkbox',
			label: 'Označením tohto políčka potvrdzujem, že som sa oboznámil/-a so Základnými informáciami o ochrane '
				+ 'osobných údajov pre dotknutú osobu, ktoré sú určené pre uchádzačov o zamestnanie.',
			content: 'Abraka dabraka',
			required: true,
		}, {
			type: 'checkbox',
			label: 'Potvrdzujem, ze udaje su spravne',
			content: 'GDPR',
			gdpr: true,
			validUntil: new Date('2026-01-01'),
		}, {
			type: 'information',
			label: 'Rychlo to odklikni, vobec to necitaj, ved o nic nejde. Hadam sa to bude dat aj odvolat a mozno nie. Co som vestica, ze viem predpovedat buducnost?',
		}, {
			type: 'information',
			label: 'Ak odosles, suhlasis s tymto',
			content: 'Toto nieje GDPR, ale nieco ine',
		},
	],
};
