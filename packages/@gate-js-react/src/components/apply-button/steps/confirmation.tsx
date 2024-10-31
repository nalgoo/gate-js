import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';

export function Confirmation({ onClose, thankYouHeading, thankYouMessage }) {
	const { formatMessage } = useIntl();
	return (
		<>
			<div>
				<h2>
					{thankYouHeading || formatMessage(messages['steps.thankYou.heading'])}
				</h2>
				{thankYouMessage || formatMessage(messages['steps.thankYou.message'])}
			</div>
			<SlButton slot="footer" variant="primary" onClick={onClose}>
				{formatMessage(messages['drawer.closeButton.label'])}
			</SlButton>
		</>
	);
}
