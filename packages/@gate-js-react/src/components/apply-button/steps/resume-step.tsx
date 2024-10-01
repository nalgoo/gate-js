import { ChangeEvent, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { resolveApplicantPersonalData } from '@gate-js/core';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlProgressBar from '@shoelace-style/shoelace/dist/react/progress-bar';
import { useJobContext } from '../../../hooks/useJobContext';
import { messages } from '../../../localization/messages';

function UploadIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1}
			stroke="currentColor"
			style={{ width: '4em', margin: '0 auto' }}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="
					M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33
					3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z
				"
			/>
		</svg>
	);
}

function wait(time) {
	return new Promise((r) => { setTimeout(r, time); });
}

export type ResumeStepProps = {
	onNext: () => void,

	setResume: () => void,
};

export function ResumeStep({
	onNext,
	setResume,
	setPersonalData,
	resumeRequired = false,
}: ResumeStepProps) {
	const { formatMessage } = useIntl();
	const [isParsing, setParsing] = useState(false);
	const { config } = useJobContext();

	const handleChange = async (event: ChangeEvent) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];

			setParsing(true);
			setResume(file);

			try {
				const [personalData] = await Promise.all([
					resolveApplicantPersonalData(file, config),
					wait(1500),
				]);
				setPersonalData(personalData);
			} catch (err) {
				console.error(err);
			}

			onNext();
		}
	};

	const fileInputRef = useRef<HTMLInputElement>();

	const handleFileInputClick = () => {
		fileInputRef?.current?.click();
	};

	return (
		<>
			<div>
				{isParsing ? (
					<>
						<SlProgressBar indeterminate />
						<div>
							{formatMessage(messages['steps.resume.waitingForParse'])}
						</div>
					</>
				) : (
					<form>
						<div>
							<h2>
								{formatMessage(messages['steps.resume.heading'])}
							</h2>
							<div style={{
								borderRadius: '3px',
								border: '2px dashed #ddd',
								padding: '2em',
								margin: '0 auto',
								textAlign: 'center',
							}}
							>
								<UploadIcon />
								{formatMessage(messages['dropzone.title'])}
								<br />
								<input type="file" onChange={handleChange} ref={fileInputRef} />
								<SlButton onClick={handleFileInputClick} variant="default">
									{formatMessage(messages['dropzone.button.label'])}
								</SlButton>
							</div>
						</div>
					</form>
				)}
			</div>
			{!resumeRequired && (
				<SlButton
					slot="footer"
					onClick={onNext}
					disabled={isParsing}
					variant="neutral"
					outline
				>
					{formatMessage(messages['steps.resume.withoutResumeButton.label'])}
				</SlButton>
			)}
		</>
	);
}
