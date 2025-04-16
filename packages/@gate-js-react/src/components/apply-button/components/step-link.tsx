import { MouseEvent, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';
import { isBeforeStep, Step } from './steps';
import { SlTooltip, SlVisuallyHidden } from '../shoelace';

export function StepLink({
	for: changeToStep,
	maxStep,
	setStep,
	active,
}: {
	for: Step,
	maxStep: Step,
	active: Step,
	setStep: (step: Step) => void,
}) {
	const { formatMessage } = useIntl();

	const handleClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault();
		setStep(changeToStep);
	}, [changeToStep, setStep]);

	if (
		maxStep === 'confirmation' // do not allow changing step after form is sent
		|| changeToStep === active // also for active step
		|| (!isBeforeStep(changeToStep, maxStep) && changeToStep !== maxStep)
	) {
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
