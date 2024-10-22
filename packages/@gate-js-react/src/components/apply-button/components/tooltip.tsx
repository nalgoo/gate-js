import { MouseEvent, useCallback } from 'react';
import { SlTooltip, SlVisuallyHidden } from '@shoelace-style/shoelace/dist/react';
import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';
import { steps } from './steps';

export function Tooltip({
	for: changeToStep,
	active,
	setStep,
}: {
	for: typeof steps[number],
	active: typeof steps[number],
	setStep: (step: typeof steps[number]) => void,
}) {
	const { formatMessage } = useIntl();

	const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		setStep(changeToStep);
	}, [changeToStep, setStep]);

	if (active === 'confirmation' || steps.indexOf(changeToStep) >= steps.indexOf(active)) {
		return null;
	}

	return (
		<SlTooltip content={formatMessage(messages['drawer.changeStep.tooltip'])} hoist>
			<a href="#" onClick={handleClick}>
				<SlVisuallyHidden>
					{formatMessage(messages['drawer.changeStep.tooltip'])}
				</SlVisuallyHidden>
			</a>
		</SlTooltip>
	)
}
