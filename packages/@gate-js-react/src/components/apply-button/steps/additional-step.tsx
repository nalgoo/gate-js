import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { isValidIBAN } from 'ibantools';
import {
	SlButton,
	SlSelect,
	SlOption,
	SlInput,
	SlIconButton,
	SlProgressBar,
} from '@shoelace-style/shoelace/dist/react';
import { useSafeId } from '../../../utils/useSafeId';
import { isValidRC } from '../../../utils/isValidRC';
import { messages } from '../../../localization/messages';

function getValidationProps(validator: string | undefined, onChange: ((event: CustomEvent) => void)) {
	if (!validator) {
		return { onSlChange: onChange };
	}

	if (validator.type === 'personalId') {
		return {
			type: 'text',
			onSlInput: (e) => {
				if (!e.target.value || isValidRC(e.target.value)) {
					e.target.setCustomValidity('');
				}
			},
			onSlChange: (e) => {
				if (onChange) {
					onChange(e);
				}
				if (e.target.value && !isValidRC(e.target.value)) {
					e.target.setCustomValidity('Invalid personal number');
					return;
				}
				e.target.setCustomValidity('');
			},
		};
	}

	if (validator.type === 'iban') {
		return {
			type: 'text',
			onSlInput: (e) => {
				if (!e.target.value || isValidIBAN(e.target.value)) {
					e.target.setCustomValidity('');
				}
			},
			onSlChange: (e) => {
				if (onChange) {
					onChange(e);
				}
				if (e.target.value && !isValidIBAN(e.target.value)) {
					e.target.setCustomValidity('Invalid IBAN');
					return;
				}
				e.target.setCustomValidity('');
			},
		};
	}

	if (validator.type === 'number') {
		return {
			type: 'number',
			onSlChange: onChange,
		};
	}

	return { onSlChange: onChange };
}

export function AdditionalStep({
	onNext,
	onBack,
	prescreeningFormParts,
	prescreeningFormAnswers,
	setPrescreeningFormAnswers,
}) {
	const { formatMessage } = useIntl();
	const formId = useSafeId();

	// const hasFields = formParts.filter((part) => ['text', 'select', 'date'].includes(part.type)).length > 0;

	const handleInputChange = (event: CustomEvent) => {
		const name = event.target?.name;
		const value = event.target?.value;
		setPrescreeningFormAnswers({ ...prescreeningFormAnswers, [name]: value });
	};

	const handleSelectChange = (event: CustomEvent) => {
		const name = event.target?.name;
		const value = event.target?.value;
		setPrescreeningFormAnswers({ ...prescreeningFormAnswers, [name]: value });
	};

	const handleSubmit = useCallback((event) => {
		event.preventDefault();

		if (event.isHandled) {
			return;
		}
		event.isHandled = true;
		onNext();
	}, [onNext]);

	// useEffect(() => {
	// 	const form = formRef.current;
	// 	if (!form) {
	// 		return undefined;
	// 	}
	//
	// 	form.addEventListener('submit', handleSubmit);
	// 	return () => {
	// 		form.removeEventListener('submit', handleSubmit);
	// 	};
	// }, [handleSubmit, formParts]);

	return (
		<>
			<SlIconButton
				slot="header-actions"
				onClick={onBack}
				name="back"
				library="gate-js"
			/>
			{!prescreeningFormParts ? (
				<SlProgressBar indeterminate />
			) : (
				<form id={formId} onSubmit={handleSubmit}>
					<h2>
						{formatMessage(messages['steps.additional.heading'])}
					</h2>
					{prescreeningFormParts.map((part) => (
						<div className="form-field" key={part.id}>
							{/* match: TEXT INPUT */}
							{part.type === 'text' && (
								<SlInput
									name={part.id}
									label={part.label}
									required={part.required}
									placeholder={part.placeholder}
									value={prescreeningFormAnswers[part.id] || ''}
									{...getValidationProps(part.validator, handleInputChange)}
								/>
							)}
							{/* match: SELECT */}
							{part.type === 'select' && (
								<SlSelect
									name={part.id}
									label={part.label}
									required={part.required}
									placeholder={part.placeholder}
									multiple={part.allowMultiple}
									onSlChange={handleSelectChange}
									value={prescreeningFormAnswers[part.id] || (part.allowMultiple ? [] : '')}
								>
									{part.options.map((option) => (
										<SlOption key={option.id} value={option.id}>{option.label}</SlOption>
									))}
								</SlSelect>
							)}
							{/* match: DATE */}
							{part.type === 'date' && (
								<SlInput
									name={part.id}
									type="date"
									label={part.label}
									required={part.required}
									placeholder={part.placeholder}
									onSlChange={handleInputChange}
									value={prescreeningFormAnswers[part.id]}
								/>
							)}
							{/* match: SELECT */}
							{part.type === 'section' && (
								<div className="typography" dangerouslySetInnerHTML={{ __html: part.content }} />
							)}
						</div>
					))}
				</form>
			)}
			<SlButton slot="footer" type="submit" form={formId} variant="primary">
				{formatMessage(messages['continueButton.label'])}
			</SlButton>
		</>
	);
}
