import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';
import { steps } from './steps';
import { Tooltip } from './tooltip';

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

function getClassName(currentStep: typeof steps[number], activeStep: typeof steps[number]) {
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
	setStep,
}: {
	active: 'resume' | 'personal' | 'additional' | 'review' | 'confirmation',
	showAdditional?: boolean,
	setStep: (step: typeof steps[number]) => void,
}) {
	const { formatMessage } = useIntl();

	return (
		<nav>
			<ol className="step-list">
				<li className={getClassName('resume', active)} aria-current={active === 'resume' && 'step'}>
					{formatMessage(messages['steps.resume.label'])}
					<Tooltip for="resume" active={active} setStep={setStep} />
				</li>
				<Chevron />
				<li className={getClassName('personal', active)} aria-current={active === 'personal' && 'step'}>
					{formatMessage(messages['steps.personal.label'])}
					<Tooltip for="personal" active={active} setStep={setStep} />
				</li>
				<Chevron />
				{showAdditional && (
					<>
						<li
							className={getClassName('additional', active)}
							aria-current={active === 'additional' && 'step'}
						>
							{formatMessage(messages['steps.additional.label'])}
							<Tooltip for="additional" active={active} setStep={setStep} />
						</li>
						<Chevron />
					</>
				)}
				<li className={getClassName('review', active)} aria-current={active === 'review' && 'step'}>
					{formatMessage(messages['steps.review.label'])}
				</li>
			</ol>
		</nav>
	);
}

StepListFn.displayName = 'StepList';

export { StepListFn as StepList };
