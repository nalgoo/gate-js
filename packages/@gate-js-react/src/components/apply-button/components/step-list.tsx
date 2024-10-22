import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';

function Chevron() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="12"
			height="12"
			fill="currentColor"
			viewBox="0 0 16 16"
			style={{ margin: '0 4px' }}
			aria-hidden="true"
		>
			<path
				fillRule="evenodd"
				d="
					M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646
					2.354a.5.5 0 0 1 0-.708z
				"
			/>
		</svg>
	);
}

const steps = ['resume', 'personal', 'additional', 'review', 'confirmation'];

function getClassName(currentStep, activeStep) {
	const currentIndex = steps.indexOf(currentStep);
	const activeIndex = steps.indexOf(activeStep);

	if (currentIndex === activeIndex) {
		return 'active';
	}

	if (currentIndex < activeIndex) {
		return 'complete';
	}

	return '';
}

function StepListFn({
	active = 'resume',
	showAdditional = true,
}: {
	active: 'resume' | 'personal' | 'additional' | 'review' | 'confirmation',
	showAdditional?: boolean;
}) {
	const { formatMessage } = useIntl();

	return (
		<ol className="step-list">
			<li className={getClassName('resume', active)}>
				{formatMessage(messages['steps.resume.label'])}
			</li>
			<Chevron />
			<li className={getClassName('personal', active)}>
				{formatMessage(messages['steps.personal.label'])}
			</li>
			<Chevron />
			{showAdditional && (
				<>
					<li className={getClassName('additional', active)}>
						{formatMessage(messages['steps.additional.label'])}
					</li>
					<Chevron />
				</>
			)}
			<li className={getClassName('review', active)}>
				{formatMessage(messages['steps.review.label'])}
			</li>
		</ol>
	);
}

StepListFn.displayName = 'StepList';

export { StepListFn as StepList };
