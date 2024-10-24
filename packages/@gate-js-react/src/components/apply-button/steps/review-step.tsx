import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import {
	AddonType,
	ApplicationDataType,
	createGlobalApplication,
	createJobApplication,
} from '@gate-js/core';
import type { SlChangeEvent, SlCheckbox } from '@shoelace-style/shoelace';
import {
	SlAlert,
	SlButton,
	SlIconButton,
	SlDivider,
	SlFormatDate,
	SlIcon,
	SlProgressBar,
} from '@shoelace-style/shoelace/dist/react';
import { Checkbox } from '../components/checkbox';
import { useSafeId } from '../../../utils/useSafeId';
import { messages } from '../../../localization/messages';
import { Information } from '../components/information';
import { useApplyContext } from '../../../hooks/useApplyContext';

function FileIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.2}
			stroke="currentColor"
			style={{ width: '1em', marginRight: 4 }}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="
					M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375
					3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125
					1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z
				"
			/>
		</svg>
	);
}

function formatAnswer(part: object, answer: undefined | string) {
	if (part.type === 'date' && answer) {
		return <SlFormatDate date={answer} />;
	}

	if (part.type === 'select' && answer) {
		if (part.allowMultiple) {
			return part.options.filter((option) => answer.includes(option.id.toString()))
				.map((option) => option.label)
				.join(', ');
		} else {
			return part.options.find((option) => option.id.toString() === answer.toString())?.label;
		}
	}

	if (answer) {
		return answer;
	}

	return '-';
}

export function ReviewStep({
	onNext,
	onBack,
	personalData,
	resume,
	attachments,
	prescreeningFormIdentifier,
	prescreeningFormParts,
	prescreeningFormAnswers,
	source,
	origin,
	refId,
	addons,
	activeAddons,
	setActiveAddons,
}) {
	const { formatMessage } = useIntl();
	const formId = useSafeId();

	const [submitState, setSubmitState] = useState<'not-started' | 'loading' | 'error'>('not-started');

	const { options, jobId } = useApplyContext();

	const answerableFormParts = prescreeningFormParts.filter((part) => part.type !== 'section');

	const handleSubmit = useCallback(async (event) => {
		event.preventDefault();

		if (event.isHandled) {
			return;
		}

		event.isHandled = true;

		setSubmitState('loading');

		const gdprAddon = addons.filter((addon) => activeAddons.includes(addon.id))
			.find((addon) => addon.gdpr === true);

		const applicationData: ApplicationDataType = {
			applicant: personalData,
			resume,
			refId,
			source,
			origin,
			gdpr: gdprAddon
				? {
					content: gdprAddon.content,
					validUntil: gdprAddon.validUntil,
				}
				: undefined,
			attachments: Object.entries(attachments).map(([, value]) => value),
			questionnaire: prescreeningFormIdentifier
				? {
					identifier: prescreeningFormIdentifier,
					answers: Object.entries(prescreeningFormAnswers).map(([key, value]) => {
						const { type } = prescreeningFormParts.find((part) => part.id === parseInt(key, 10));
						if (type === 'select') {
							return {
								questionId: parseInt(key, 10),
								value: Array.isArray(value) ? value.map((v) => parseInt(v, 10)) : parseInt(value, 10),
							};
						}
						return {
							questionId: parseInt(key, 10),
							value,
						};
					}),
				}
				: undefined,
		};

		const result = jobId
			? await createJobApplication(jobId, applicationData, options)
			: await createGlobalApplication(applicationData, options);

		if (result) {
			onNext();
		} else {
			setSubmitState('error');
		}
	}, [
		activeAddons,
		addons,
		attachments,
		options,
		jobId,
		onNext,
		origin,
		personalData,
		prescreeningFormAnswers,
		prescreeningFormIdentifier,
		prescreeningFormParts,
		refId,
		resume,
		source,
	]);

	return (
		<>
			<SlIconButton
				slot="header-actions"
				onClick={onBack}
				name="back"
				library="gate-js"
			/>
			{submitState === 'loading' ? (
				<>
					<SlProgressBar indeterminate />
					<div>
						{formatMessage(messages['steps.review.sendingDataMessage'])}
					</div>
				</>
			) : (
				<>
					<SlAlert open={submitState === 'error'} variant="danger">
						<SlIcon slot="icon" library="gate-js" name="warning" />
						{formatMessage(messages['steps.review.sendingDataError'])}
					</SlAlert>
					<h2>
						{formatMessage(messages['steps.review.heading'])}
					</h2>
					<ul className="review-list">
						<li>
						<strong>
								{
									[
										personalData.salutation === 'mr'
											? formatMessage(messages['steps.personal.salutationInput.optionMr'])
											: formatMessage(messages['steps.personal.salutationInput.optionMrs']),
										personalData.givenName,
										personalData.familyName,
									].join(' ')
								}
							</strong>
						</li>
						<li>{personalData.email}</li>
						<li>{personalData.phoneNumber}</li>
						{resume && (
							<li className="file">
								<FileIcon />
								{resume.name}
							</li>
						)}
						{Object.entries(attachments).map(([key, value]) => (
							<li key={key} className="file">
								<FileIcon />
								{value.name}
							</li>
						))}
					</ul>
					{answerableFormParts.length > 0 && (
						<>
							<SlDivider />
							{answerableFormParts.map((part) => (
								<div className="form-field" key={part.id}>
									<div><strong>{part.label}</strong></div>
									<div>
										{formatAnswer(part, prescreeningFormAnswers[part.id])}
									</div>
								</div>
							))}
						</>
					)}
					<form id={formId} onSubmit={handleSubmit}>
						{addons.length > 0 && (
							<>
								<SlDivider />
								{addons.map((addon: AddonType & { id: string }) => (
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
												// onChange={(e) => setActiveAddons((addons))}
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
								))}
							</>
						)}
					</form>
					<SlButton
						slot="footer"
						type="submit"
						form={formId}
						variant="primary"
					>
						{formatMessage(messages['steps.review.submitButton.label'])}
					</SlButton>
				</>
			)}
		</>
	);
}
