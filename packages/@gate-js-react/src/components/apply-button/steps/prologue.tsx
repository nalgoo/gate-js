import { useIntl } from 'react-intl';
import { FormEvent, useMemo } from 'react';
import type { AddonType } from '@gate-js/core';
import { messages } from '../../../localization/messages';
import { useSafeId } from '../../../utils/useSafeId';
import { Addons } from '../components/addons';
import { SlButton } from '../shoelace';

export function Prologue({
	onNext,
	addons,
	setActiveAddons,
	activeAddons,
}) {
	const { formatMessage } = useIntl();
	const formId = useSafeId();

	const filteredAddons = useMemo(() => addons.filter((addon: AddonType) => addon.showOnStart), [addons]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onNext();
	};

	return (
		<>
			<form id={formId} onSubmit={handleSubmit}>
				<Addons
					addons={filteredAddons}
					setActiveAddons={setActiveAddons}
					activeAddons={activeAddons}
				/>
			</form>
			<SlButton
				slot="footer"
				type="submit"
				form={formId}
				variant="primary"
			>
				{formatMessage(messages['continueButton.label'])}
			</SlButton>
		</>
	);
}
