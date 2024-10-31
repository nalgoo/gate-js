import type { SlChangeEvent, SlCheckbox } from '@shoelace-style/shoelace';
import type { AddonType } from '@gate-js/core';
import { Checkbox } from './checkbox';
import { Information } from './information';

export function Addons({
	addons,
	setActiveAddons,
	activeAddons,
}) {
	return addons.map((addon: AddonType & { id: string }) => (
		<div className="form-field" key={addon.id}>
			{addon.type === 'checkbox' && (
				<Checkbox
					onChange={(e: SlChangeEvent) => {
						if (!e.target) {
							return;
						}

						if ((e.target as SlCheckbox).checked) {
							setActiveAddons((aa: Array<string>) => [...aa, addon.id]);
						} else {
							setActiveAddons((aa: Array<string>) => aa.filter(
								(a: string) => a !== addon.id,
							));
						}
					}}
					required={addon.required}
					label={addon.label}
					content={addon.content}
					checked={activeAddons.includes(addon.id)}
				/>
			)}
			{addon.type === 'information' && (
				<Information
					onChange={(e) => {
						if (e.target.checked) {
							setActiveAddons((aa) => [...aa, addon.id]);
						} else {
							setActiveAddons((aa) => aa.filter((a) => a !== addon.id));
						}
					}}
					required={addon.required}
					label={addon.label}
					content={addon.content}
					checked={activeAddons.includes(addon.id)}
				/>
			)}
		</div>
	));
}
