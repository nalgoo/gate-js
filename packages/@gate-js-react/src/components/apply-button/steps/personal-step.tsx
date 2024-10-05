import { useCallback, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import {
	SlAlert,
	SlButton,
	SlIcon,
	SlIconButton,
	SlInput,
	SlOption,
	SlSelect,
} from '@shoelace-style/shoelace/dist/react';
import { useSafeId } from '../../../utils/useSafeId';
import { messages } from '../../../localization/messages';

function FileIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1}
			stroke="currentColor"
			style={{ width: '1.5em' }}
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

function getReadableFileSizeString(fileSizeInBytes: number) {
	const byteUnits = ['B', 'kB', 'MB', 'GB'];
	let size = fileSizeInBytes;
	let i = 0;
	while (size > 1024) {
		size /= 1024;
		i += 1;
	}

	return `${Math.max(size, 0.1).toFixed(1)} ${byteUnits[i]}`;
}

let attachmentsIndex = 0;

export function PersonalStep({
	onNext,
	onBack,
	personalData,
	setPersonalData,
	resume,
	attachments,
	setAttachments,
	alreadyApplied,
}) {
	const handleSubmit = useCallback((event: SubmitEvent) => {
		event.preventDefault();

		if (event.isHandled) {
			return;
		}
		event.isHandled = true;

		onNext();
	}, [onNext]);

	const formId = useSafeId();

	const handleInputChange = (event: CustomEvent) => {
		const name = event.target?.name;
		const value = event.target?.value;

		setPersonalData({ ...personalData, [name]: value });
	};

	const handleSalutationChange = (event: CustomEvent) => {
		const value = event.target?.value;

		setPersonalData({ ...personalData, salutation: value });
	};

	const formRef = useRef<HTMLFormElement>();

	useEffect(() => {
		const form = formRef.current;
		form.addEventListener('submit', handleSubmit);
		return () => {
			form.removeEventListener('submit', handleSubmit);
		};
	}, [handleSubmit]);

	const handleAttachFile = (event) => {
		const newAttachments = [...event.target.files].reduce(
			(carry, current) => {
				attachmentsIndex += 1;
				return { ...carry, [attachmentsIndex]: current };
			},
			attachments,
		);

		setAttachments(newAttachments);
	};

	const handleRemoveFile = (key: string) => {
		const { [key]: removed, ...newAttachments } = attachments;
		setAttachments(newAttachments);
	};

	const fileInputRef = useRef<HTMLInputElement>();

	const handleFileInputClick = () => {
		fileInputRef?.current?.click();
	};

	const { formatMessage } = useIntl();

	return (
		<>
			<SlIconButton
				slot="header-actions"
				onClick={onBack}
				name="back"
				library="gate-js"
			/>
			<form id={formId} ref={formRef}>
				<SlAlert open={alreadyApplied} variant="warning">
					<SlIcon slot="icon" library="gate-js" name="warning" />
					{formatMessage(messages['alreadyAppliedWarning.message'])}
				</SlAlert>
				<h2>
					{formatMessage(messages['steps.personal.heading'])}
				</h2>
				<div className="form-field">
					<SlSelect
						label={formatMessage(messages['steps.personal.salutationInput.label'])}
						nam="salutation"
						value={personalData.salutation}
						required
						onSlChange={handleSalutationChange}
						autofocus
					>
						<SlOption value="mr">
							{formatMessage(messages['steps.personal.salutationInput.optionMr'])}
						</SlOption>
						<SlOption value="mrs">
							{formatMessage(messages['steps.personal.salutationInput.optionMrs'])}
						</SlOption>
					</SlSelect>
				</div>
				<div className="form-field">
					<SlInput
						label={formatMessage(messages['steps.personal.givenNameInput.label'])}
						name="givenName"
						value={personalData.givenName}
						required
						onSlChange={handleInputChange}
					/>
				</div>
				<div className="form-field">
					<SlInput
						label={formatMessage(messages['steps.personal.familyNameInput.label'])}
						name="familyName"
						value={personalData.familyName}
						onSlChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-field">
					<SlInput
						label={formatMessage(messages['steps.personal.emailInput.label'])}
						name="email"
						value={personalData.email}
						onSlChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-field">
					<SlInput
						label={formatMessage(messages['steps.personal.phoneNumberInput.label'])}
						name="phoneNumber"
						value={personalData.phoneNumber}
						onSlChange={handleInputChange}
						required
					/>
				</div>
				<h2>
					{formatMessage(messages['steps.personal.attachments.heading'])}
				</h2>
				<div className="form-field">
					{(!resume && Object.keys(attachments).length === 0) ? (
						<em>
							{formatMessage(messages['steps.personal.attachments.noFilesAttached.message'])}

						</em>
					) : (
						<ul className="file-list">
							{resume && (
								<li>
									<FileIcon />
									<div className="name">
										{resume.name}
										<small>{getReadableFileSizeString(resume.size)}</small>
									</div>
								</li>
							)}
							{Object.entries(attachments).map(([key, value]) => (
								<li key={key}>
									<FileIcon />
									<div className="name">
										{value.name}
										<small>{getReadableFileSizeString(value.size)}</small>
									</div>
									<SlButton variant="text" onClick={() => handleRemoveFile(key)}>
										{formatMessage(
											messages['steps.personal.attachments.removeAttachmentButton.label'],
										)}
									</SlButton>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="form-field">
					<input type="file" onChange={handleAttachFile} multiple ref={fileInputRef} />
					<SlButton
						variant="default"
						onClick={handleFileInputClick}
					>
						{formatMessage(messages['steps.personal.attachments.addAttachmentButton.label'])}
					</SlButton>
				</div>
			</form>
			<SlButton slot="footer" type="submit" form={formId} variant="primary">
				{formatMessage(messages['continueButton.label'])}
			</SlButton>
		</>
	);
}
