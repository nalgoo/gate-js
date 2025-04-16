import {
	ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import { useIntl } from 'react-intl';
import { logError, resolveApplicantPersonalData } from '@gate-js/core';
import { messages } from '../../../localization/messages';
import { useApplyContext } from '../../../hooks/useApplyContext';
import { SlButton, SlProgressBar } from '../shoelace';

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

function isDragEventValid(event: DragEvent): boolean {
	return event.dataTransfer?.files.length === 1;
}

export function ResumeStep({
	onNext,
	setResume,
	setPersonalData,
	resumeRequired = false,
	parse = true,
}: ResumeStepProps) {
	const { formatMessage } = useIntl();
	const [isParsing, setParsing] = useState(false);
	const { options } = useApplyContext();

	const parseResume = useCallback(async (file: File) => {
		try {
			const [personalData] = await Promise.all([
				resolveApplicantPersonalData(file, options),
				wait(1500),
			]);
			setPersonalData(personalData);
		} catch (err) {
			logError(err);
		}

		onNext();
	}, [onNext, setPersonalData, options]);

	const handleChange = async (event: ChangeEvent) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];

			setResume(file);

			if (parse) {
				setParsing(true);
				await parseResume(file);
			} else {
				onNext();
			}
		}
	};

	const fileInputRef = useRef<HTMLInputElement>();

	const handleFileInputClick = () => {
		fileInputRef?.current?.click();
	};

	const [highlightDropzone, setHighlightDropzone] = useState<null | 'active' | 'error'>(null);
	const dropzoneRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const dropzone = dropzoneRef.current;

		if (!dropzone) {
			return undefined;
		}

		const onDragOver = (event: DragEvent) => {
			setHighlightDropzone(
				isDragEventValid(event) ? 'active' : 'error',
			);
		};

		const onDragLeave = () => {
			setHighlightDropzone(null);
		};

		const onDrop = async (event: DragEvent) => {
			setHighlightDropzone(null);

			if (isDragEventValid(event)) {
				const file = event.dataTransfer?.files[0];
				if (file) {
					setResume(file);

					if (parse) {
						setParsing(true);
						await parseResume(file);
					} else {
						onNext();
					}
				}
			}
		};

		dropzone.addEventListener('dragover', onDragOver);
		dropzone.addEventListener('dragleave', onDragLeave);
		dropzone.addEventListener('drop', onDrop);

		return () => {
			dropzone.removeEventListener('dragover', onDragOver);
			dropzone.removeEventListener('dragleave', onDragLeave);
			dropzone.removeEventListener('drop', onDrop);
		};
	}, [parseResume, setResume, parse, onNext]);

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
							<div
								className={`dropzone ${highlightDropzone && 'active'}`}
								ref={dropzoneRef}
							>
								<div>
									<UploadIcon />
								</div>
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
				<div slot="footer">
					<SlButton
						// slot="footer"
						onClick={onNext}
						disabled={isParsing}
						variant="neutral"
						outline
					>
						{formatMessage(messages['steps.resume.withoutResumeButton.label'])}
					</SlButton>
				</div>
			)}
		</>
	);
}
