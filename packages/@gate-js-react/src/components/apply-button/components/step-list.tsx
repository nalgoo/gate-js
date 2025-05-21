import { useIntl } from 'react-intl';
import { messages } from '../../../localization/messages';
import { isBeforeStep, Step } from './steps';
import { StepLink } from './step-link';

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

function getClassName(currentStep: Step, activeStep: Step) {
	if (currentStep === activeStep) {
		return 'active';
	}

	if (isBeforeStep(currentStep, activeStep)) {
		return 'complete';
	}

	return '';
}

function StepListFn({
	active,
	showAdditional = true,
	showResumeStep = true,
	setStep,
	maxStep,
}: {
	active: Step,
	maxStep: Step,
	showAdditional?: boolean,
	showResumeStep?: boolean,
	setStep: (step: Step) => void,
}) {
	const { formatMessage } = useIntl();

	const personalStepLabel = showAdditional || showResumeStep
		? 'steps.personal.label'
		: 'steps.personal.label.wide';

	return (
		<nav>
			<ol className="step-list">
				{showResumeStep && (
					<>
						<li className={getClassName('resume', active)} aria-current={active === 'resume' && 'step'}>
							{formatMessage(messages['steps.resume.label'])}
							<StepLink for="resume" maxStep={maxStep} setStep={setStep} active={active} />
						</li>
						<Chevron />
					</>
				)}
				<li className={getClassName('personal', active)} aria-current={active === 'personal' && 'step'}>
					{formatMessage(messages[personalStepLabel])}
					<StepLink for="personal" maxStep={maxStep} setStep={setStep} active={active} />
				</li>
				<Chevron />
				{showAdditional && (
					<>
						<li
							className={getClassName('additional', active)}
							aria-current={active === 'additional' && 'step'}
						>
							{formatMessage(messages['steps.additional.label'])}
							<StepLink for="additional" maxStep={maxStep} setStep={setStep} active={active} />
						</li>
						<Chevron />
					</>
				)}
				<li className={getClassName('review', active)} aria-current={active === 'review' && 'step'}>
					{formatMessage(messages['steps.review.label'])}
					<StepLink for="review" maxStep={maxStep} setStep={setStep} active={active} />
				</li>
			</ol>
		</nav>
	);
}

StepListFn.displayName = 'StepList';

export { StepListFn as StepList };
