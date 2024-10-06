const messages = {
	// common parts
	'drawer.heading': {
		defaultMessage: 'Apply for a job',
		description: 'main heading in drawer',
	},
	'drawer.backButton.tooltip': {
		defaultMessage: 'Back',
		description: 'tooltip for back button in drawer\'s header',
	},
	'drawer.closeButton.label': {
		defaultMessage: 'Close',
		description: 'label for close button in drawer\'s footer or in modal',
	},
	'drawer.closeButton.tooltip': {
		defaultMessage: 'Close',
		description: 'tooltip for close button in drawer\'s header',
	},
	// warning when already applied
	'drawer.loading.message': {
		defaultMessage: 'Preparing application form',
		description: 'Message shown on initial load',
	},
	// resume step
	'steps.resume.label': {
		defaultMessage: 'Resume',
		description: 'title of `Resume` step (should be short, max 10 characters long)',
	},
	'steps.resume.heading': {
		defaultMessage: 'Start with your resume',
		description: 'heading (call to action) for `Review` step',
	},
	'steps.resume.waitingForParse': {
		defaultMessage: 'This should take only few seconds',
		description: 'message shown while waiting for parsing of resume (max 10 seconds)',
	},
	'steps.resume.withoutResumeButton.label': {
		defaultMessage: 'Continue without resume',
		description: 'label of button to continue without resume',
	},
	// personal step
	'steps.personal.label': {
		defaultMessage: 'Personal',
		description: 'title of `Personal information` step (should be short, max 10 characters long)',
	},
	'steps.personal.heading': {
		defaultMessage: 'Personal details',
		description: 'heading (call to action) for `Review` step',
	},
	'steps.personal.salutationInput.label': {
		defaultMessage: 'Salutation',
		description: 'label for `Salutation` form field',
	},
	'steps.personal.salutationInput.optionMr': {
		defaultMessage: 'Mr.',
		description: 'Mr (male) option for `Salutation` form field',
	},
	'steps.personal.salutationInput.optionMrs': {
		defaultMessage: 'Mrs.',
		description: 'Mrs (female) option for `Salutation` form field',
	},
	'steps.personal.givenNameInput.label': {
		defaultMessage: 'Given name',
		description: 'label for `Given name` form field',
	},
	'steps.personal.familyNameInput.label': {
		defaultMessage: 'Family name',
		description: 'label for `Family name` form field',
	},
	'steps.personal.emailInput.label': {
		defaultMessage: 'Email',
		description: 'label for `Email` form field',
	},
	'steps.personal.phoneNumberInput.label': {
		defaultMessage: 'Phone number',
		description: 'label for `Phone number` form field',
	},
	'steps.personal.attachments.heading': {
		defaultMessage: 'Attachments',
		description: 'heading of `Attachments` section',
	},
	'steps.personal.attachments.addAttachmentButton.label': {
		defaultMessage: 'Attach another file',
		description: 'label of button for attaching more files',
	},
	'steps.personal.attachments.removeAttachmentButton.label': {
		defaultMessage: 'Remove',
		description: 'label of button for removing existing attachment',
	},
	'steps.personal.attachments.noFilesAttached.message': {
		defaultMessage: 'No files attached to application form',
		description: 'informational message when when there is no attached file',
	},
	// additional step
	'steps.additional.label': {
		defaultMessage: 'Additional',
		description: 'title of `Additional questions` step (should be short, max 10 characters long)',
	},
	'steps.additional.heading': {
		defaultMessage: 'Additional questions',
		description: 'heading of `Additional questions` step',
	},
	// review step
	'steps.review.label': {
		defaultMessage: 'Review',
		description: 'title of `Review` step (should be short, max 10 characters long)',
	},
	'steps.review.heading': {
		defaultMessage: 'Review your application',
		description: 'heading of `Review` step',
	},
	'steps.review.viewFullButton.label': {
		defaultMessage: 'View full document',
		description: 'label of button which will show full version of GDPR/policy document',
	},
	'steps.review.submitButton.label': {
		defaultMessage: 'Send application',
		description: 'label of button which will send complete application form',
	},
	'steps.review.sendingDataMessage': {
		defaultMessage: 'Sending data',
		description: 'message shown to user after submitting form',
	},
	'steps.review.sendingDataError': {
		defaultMessage: 'There was an error while sending your data to server. Please try again later.',
		description: 'error message shown to user when there was problem while sending data',
	},
	// thank you
	'steps.thankYou.heading': {
		defaultMessage: 'Thank you',
		description: 'Heading shown after successful submit of whole application form',
	},
	'steps.thankYou.message': {
		defaultMessage: '',
		description: 'thank you message, intentionally left blank',
	},
	// dropzone
	'dropzone.title': {
		defaultMessage: 'Drag and drop your resume here or',
		description: 'main message in dropzone',
	},
	'dropzone.button.label': {
		defaultMessage: 'Choose file',
		description: 'button\'s label inside dropzone, which opens File dialog',
	},
	// continue button
	'continueButton.label': {
		defaultMessage: 'Continue',
		description: 'label of `Continue` button in footer, which will take you to next step',
	},
	// warning when already applied
	'alreadyAppliedWarning.message': {
		defaultMessage: 'It looks like you have already applied for this job',
		description: 'message shown when detected, that applicant has already applied to given job',
	},
};

type Typ<T> = {
	[K in keyof T]: T[K] & { id: K }
};

const transformedMessages = Object.fromEntries(
	Object.entries(messages).map(([key, value]) => [key, { id: key, ...value }]),
) as Typ<typeof messages>;

export { transformedMessages as messages };
