import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';

export function Confirmation({ onClose }) {
	const { formatMessage } = useIntl();
	return (
		<>
			<div>
				<h2>
					{formatMessage(messages['steps.thankYou.heading'])}
				</h2>
				{formatMessage(messages['steps.thankYou.message'])}
			</div>
			<SlButton slot="footer" variant="primary" onClick={onClose}>
				{formatMessage(messages['drawer.closeButton.label'])}
			</SlButton>
		</>
	);
}
