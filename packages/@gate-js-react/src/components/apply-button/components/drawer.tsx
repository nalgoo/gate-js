import { useIntl } from 'react-intl';
import SlProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';
import SlDrawer from '@shoelace-style/shoelace/dist/react/drawer';
import { messages } from '../../../localization/messages';
import { StepList } from './step-list';
import { ResumeStep } from '../steps/resume-step';
import { PersonalStep } from '../steps/personal-step';
import { AdditionalStep } from '../steps/additional-step';
import { ReviewStep } from '../steps/review-step';
import { Confirmation } from '../steps/confirmation';
import { CSSProperties } from 'react';

export function Drawer({
	setOpen,
	loading,
	step,
	hasAdditional,
	setStep,
	setResume,
	setPersonalData,
	requireCv,
	personalData,
	resume,
	attachments,
	setAttachments,
	alreadyApplied,
	prescreeningFormParts,
	prescreeningFormAnswers,
	setPrescreeningFormAnswers,
	reset,
	prescreeningFormIdentifier,
	open,
}) {
	const { formatMessage } = useIntl();

	const drawerStyle = { '--size': '500px' } as CSSProperties;

	return (
		<SlDrawer
			className="gate-js-drawer"
			open={open}
			// onSlHide={() => setOpen(false)}
			onSlHide={(e) => {
				// @ts-ignore
				if (e.target?.nodeName === 'SL-DRAWER') { setOpen(false); }
			}}
			label={formatMessage(messages['drawer.heading'])}
			style={drawerStyle}
		>
			{loading ? (
				<>
					<SlProgressBar indeterminate />
					<div>
						{formatMessage(messages['drawer.loading.message'])}
					</div>
				</>
			) : (
				<>
					<StepList active={step} showAdditional={hasAdditional} />

					{step === 'resume' && (
						<ResumeStep
							onNext={() => setStep('personal')}
							setResume={setResume}
							setPersonalData={setPersonalData}
							resumeRequired={requireCv}
						/>
					)}

					{step === 'personal' && (
						<PersonalStep
							onBack={() => setStep('resume')}
							onNext={() => setStep(hasAdditional ? 'additional' : 'review')}
							personalData={personalData}
							setPersonalData={setPersonalData}
							resume={resume}
							attachments={attachments}
							setAttachments={setAttachments}
							alreadyApplied={alreadyApplied}
						/>
					)}

					{step === 'additional' && (
						<AdditionalStep
							onBack={() => setStep('personal')}
							onNext={() => setStep('review')}
							prescreeningFormParts={prescreeningFormParts}
							prescreeningFormAnswers={prescreeningFormAnswers}
							setPrescreeningFormAnswers={setPrescreeningFormAnswers}
						/>
					)}

					{step === 'review' && (
						<ReviewStep
							onBack={() => setStep(hasAdditional ? 'additional' : 'personal')}
							onNext={() => setStep('confirmation')}
							personalData={personalData}
							resume={resume}
							attachments={attachments}
							prescreeningFormIdentifier={prescreeningFormIdentifier}
							prescreeningFormParts={prescreeningFormParts}
							prescreeningFormAnswers={prescreeningFormAnswers}
						/>
					)}

					{step === 'confirmation' && (
						<Confirmation onClose={reset} />
					)}
				</>
			)}
		</SlDrawer>
	);
}
